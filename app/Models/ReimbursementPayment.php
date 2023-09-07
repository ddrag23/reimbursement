<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ReimbursementPayment extends Model
{
    use HasFactory;
    protected $table = 'reimbursement_payments';
    protected $guarded = ['id'];
}
