<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
	/**
	 * Run the migrations.
	 */
	public function up(): void
	{
		Schema::create('follow', function (Blueprint $table) {
			$table->bigIncrements('id');
			$table->bigInteger('id_user')->unsigned();
			$table->bigInteger('id_novel')->unsigned();
			$table->timestamps();
			// Foreign Keys
			$table->foreign('id_user')->references('id')->on('user');
			$table->foreign('id_novel')->references('id')->on('novel');
			// Unique Constraint
			$table->unique(['id_user', 'id_novel']);
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('follow');
	}
};