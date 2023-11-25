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
		Schema::create('rating', function (Blueprint $table) {
			$table->bigIncrements('id');
			$table->bigInteger('id_novel')->unsigned();
			$table->bigInteger('id_user')->unsigned();
			$table->integer('rating')->nullable();
			$table->timestamps();
			// Foreign Keys
			$table->foreign('id_novel')->references('id')->on('novel');
			$table->foreign('id_user')->references('id')->on('user');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('rating');
	}
};
