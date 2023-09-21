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
		Schema::create('detail', function (Blueprint $table) {
			$table->bigIncrements('id_detail');
			$table->text('summary');
			$table->text('note');
			$table->string('another_name');
			$table->integer('adult');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('detail');
	}
};