<?php

namespace App\Http\Controllers;

use App\Constant\RoleConstant;
use App\Constant\StatusReimbersementConstant;
use App\Http\Resources\QueryAdapterCollection;
use App\Models\LogReimburesement;
use App\Models\Reimbursement;
use App\Models\ReimbursementPayment;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Inertia\Response;

class ReimbursementController extends Controller
{
    public function index(): Response
    {
        return inertia('Reimbursement/Index', [
            'table' => route('reimbursement.table'),
            'title' => "Reimbursement"
        ]);
    }

    public function queryTable(Request $request)
    {
        $query = Reimbursement::with('pemohon')
            ->when(auth()->user()->hasRole([RoleConstant::STAFF]), fn (Builder $query) => $query->where('pemohon_id', auth()->id()))
            ->when(auth()->user()->hasRole([RoleConstant::DIREKTUR]), fn (Builder $query) => $query->whereIn('status_pengajuan', [StatusReimbersementConstant::PENGAJUAN, StatusReimbersementConstant::REJECT_DIRECTOR]))
            ->when(auth()->user()->hasRole([RoleConstant::FINANCE]), fn (Builder $query) => $query->whereIn('status_pengajuan', [StatusReimbersementConstant::APPROVE_DIRECTOR, StatusReimbersementConstant::REJECT_FINANCE, StatusReimbersementConstant::APPROVE_FINANCE]));
        if ($request->has('search')) {
            $query->where('nama_reimbursement', 'like', "%{$request->search}%");
        }
        return new QueryAdapterCollection($query->orderBy('id', 'desc')->paginate($request->take));
    }

    public function create(): Response
    {
        return inertia('Reimbursement/Create', ['title' => 'Create Reimbursement']);
    }

    public function payment(int $id): Response
    {
        $query = Reimbursement::with('pemohon')->find($id);
        $title = 'Pembayaran Reimbursement';
        $asset = asset('storage');
        return inertia('Reimbursement/Payment', ['query' => $query, 'title' => $title, 'asset' => $asset]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'tanggal' => 'required',
            'nama_reimbursement' => 'required',
            'file_pendukung' => 'required|mimes:jpg,jpeg,png,pdf',
            'deskripsi' => 'required',
        ]);
        DB::beginTransaction();
        try {
            $formData = $request->all();
            $formData['pemohon_id'] = auth()->id();
            $formData['file_pendukung'] = $request->file('file_pendukung')->store('file-pendukung');
            $save = Reimbursement::create($formData);
            $this->setLogReimbursement($save->id, StatusReimbersementConstant::PENGAJUAN);
            DB::commit();
            return redirect()->route('reimbursement.index')->with('message', 'Berhasil mengajukan reimbursement');
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error("create reimbusement error:" . $th->getTraceAsString());
            return redirect()->route('reimbursement.create')->withErrors(['message' => $th->getMessage()]);
        }
    }

    public function setLogReimbursement($id, $statusPengajuan)
    {
        LogReimburesement::create(['reimbursement_id' => $id, 'status_pengajuan' => $statusPengajuan, 'user_id' => auth()->id()]);
    }

    public function storePayment(Request $request)
    {
        $request->validate([
            'file_nota_reimbursement' => 'required|mimes:jpg,jpeg,png,pdf',
            'notes' => 'required',
        ]);
        DB::beginTransaction();
        try {
            $formData = $request->all();
            $formData['file_nota_reimbursement'] = $request->file('file_nota_reimbursement')->store('nota');
            $save = ReimbursementPayment::create($formData);
            $update = Reimbursement::findOrFail($request->reimbursement_id)->update(['status_pengajuan' => StatusReimbersementConstant::PAYMENT_FINANCE]);
            $this->setLogReimbursement((int)$save->reimbursement_id, StatusReimbersementConstant::PAYMENT_FINANCE);
            DB::commit();
            return redirect()->route('reimbursement.index')->with('message', 'Berhasil melakukan pembayaran reimbursement');
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error("payment reimbusement error:" . $th->getTraceAsString());
            return redirect()->route('reimbursement.payment', ['id' => $request->reimbursement_id])->withErrors(['message' => $th->getMessage()]);
        }
    }

    public function verification(Request $request, int $id)
    {
        $request->validate(['status_pengajuan' => 'required']);
        DB::beginTransaction();
        try {
            $data = Reimbursement::findOrFail($id);
            $this->setLogReimbursement($data->id, $request->status_pengajuan);
            $data->update(['status_pengajuan' => $request->status_pengajuan]);
            DB::commit();
            return redirect()->route('reimbursement.index')->with('message', 'Berhasil verifikasi reimbursement');
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error("verif error:" . $th->getTraceAsString());
            return redirect()->route('reimbursement.index')->withErrors(['message' => $th->getMessage()]);
        }
    }

    public function show($id)
    {
        $query = Reimbursement::with('pemohon', 'payment')->find($id);
        $title = 'Detail Reimbursement';
        $asset = asset('storage');
        return inertia('Reimbursement/Show', ['query' => $query, 'title' => $title, 'asset' => $asset]);
    }

    public function destroy(int $id)
    {
        $data = Reimbursement::findOrFail($id);
        LogReimburesement::where('reimbursement_id', $id)->delete();
        $data->delete();
        return redirect()->route('reimbursement.index')->with('message', 'Reimbursement berhasil dihapus');
    }
}
