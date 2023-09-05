<?php

use App\Models\Reimbursement;
use App\Models\User;
use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('log_reimburesements', function (Blueprint $table) {
            $table->id();
            $table->foreignIdFor(Reimbursement::class);
            $table->string('status_pengajuan');
            $table->foreignIdFor(User::class);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('log_reimburesements');
    }
};
