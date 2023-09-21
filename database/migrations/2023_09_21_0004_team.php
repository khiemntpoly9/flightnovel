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
		Schema::create('team', function (Blueprint $table) {
			$table->bigIncrements('id_team');
			$table->bigInteger('id_user')->unsigned();
			$table->string('team_name');
			$table->string('team_detail')->nullable();
			$table->timestamps();
			// Foreign Keys
			$table->foreign('id_user')->references('id')->on('users');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('team');
	}
};