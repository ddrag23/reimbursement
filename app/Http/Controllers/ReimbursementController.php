<?php

namespace App\Http\Controllers;

use App\Http\Resources\QueryAdapterCollection;
use App\Models\Reimbursement;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReimbursementController extends Controller
{
    public function index(): Response
    {
        return inertia('Reimbursement/Index', [
            'table' => route('reimbursement.table')
        ]);
    }

    public function queryTable(Request $request)
    {
        $query = Reimbursement::with('pemohon');
        if ($request->has('search')) {
            $query->where('nama_reimbursement', 'like', "%{$request->search}%");
        }
        return new QueryAdapterCollection($query->paginate($request->take));
    }

    public function create(): Response
    {
        return inertia('Reimbursement/Create', ['title' => 'Create Reimbursement']);
    }
}
