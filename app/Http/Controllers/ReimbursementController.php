<?php

namespace App\Http\Controllers;

use App\Constant\RoleConstant;
use App\Constant\StatusReimbersementConstant;
use App\Http\Resources\QueryAdapterCollection;
use App\Models\LogReimburesement;
use App\Models\Reimbursement;
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
            ->when(auth()->user()->hasRole([RoleConstant::FINANCE]), fn (Builder $query) => $query->whereIn('status_pengajuan', [StatusReimbersementConstant::APPROVE_DIRECTOR, StatusReimbersementConstant::REJECT_FINANCE]));
        if ($request->has('search')) {
            $query->where('nama_reimbursement', 'like', "%{$request->search}%");
        }
        return new QueryAdapterCollection($query->orderBy('id', 'desc')->paginate($request->take));
    }

    public function create(): Response
    {
        return inertia('Reimbursement/Create', ['title' => 'Create Reimbursement']);
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
            $this->setLogReimbursement($save, StatusReimbersementConstant::PENGAJUAN);
            DB::commit();
            return redirect()->route('reimbursement.index')->with('message', 'Berhasil mengajukan reimbursement');
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error("create reimbusement error:" . $th->getTraceAsString());
            return redirect()->route('reimbursement.create')->withErrors(['message' => $th->getMessage()]);
        }
    }

    public function setLogReimbursement($data, $statusPengajuan)
    {
        LogReimburesement::create(['reimbursement_id' => $data->id, 'status_pengajuan' => $statusPengajuan, 'user_id' => auth()->id()]);
    }

    public function verification(Request $request, int $id)
    {
        $request->validate(['status_pengajuan' => 'required']);
        DB::beginTransaction();
        try {
            $data = Reimbursement::findOrFail($id);
            $this->setLogReimbursement($data, $request->status_pengajuan);
            $data->update(['status_pengajuan' => $request->status_pengajuan]);
            DB::commit();
            return redirect()->route('reimbursement.index')->with('message', 'Berhasil verifikasi reimbursement');
        } catch (\Throwable $th) {
            DB::rollBack();
            Log::error("verif error:" . $th->getTraceAsString());
            return redirect()->route('reimbursement.index')->withErrors(['message' => $th->getMessage()]);
        }
    }

    public function destroy(int $id)
    {
        $data = Reimbursement::findOrFail($id);
        LogReimburesement::where('reimbursement_id', $id)->delete();
        $data->delete();
        return redirect()->route('reimbursement.index')->with('message', 'Reimbursement berhasil dihapus');
    }
}
