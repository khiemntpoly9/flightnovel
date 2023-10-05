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
		Schema::create('vol', function (Blueprint $table) {
			$table->bigIncrements('id');
			$table->bigInteger('id_novel')->unsigned();
			$table->string('title');
			$table->timestamps();
			// Foreign Keys
			$table->foreign('id_novel')->references('id')->on('novel');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('vol');
	}
};