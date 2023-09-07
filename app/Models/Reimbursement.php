<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Reimbursement extends Model
{
    use HasFactory;
    protected $guarded = ['id'];

    public function pemohon(): BelongsTo
    {
        return $this->belongsTo(User::class, 'pemohon_id', 'id');
    }

    public function payment(): HasOne
    {
        return $this->hasOne(ReimbursementPayment::class);
    }
}
