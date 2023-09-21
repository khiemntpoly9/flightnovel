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
		Schema::create('rate', function (Blueprint $table) {
			$table->bigIncrements('id_rate');
			$table->bigInteger('id_user')->unsigned();
			$table->string('comment');
			$table->integer('point');
			$table->timestamps();
			// Foreign Keys
			$table->foreign('id_user')->references('id')->on('users')->onDelete('cascade');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('rate');
	}
};