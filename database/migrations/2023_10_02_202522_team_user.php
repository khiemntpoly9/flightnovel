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
		Schema::create('team_user', function (Blueprint $table) {
			$table->bigIncrements('id');
			$table->bigInteger('id_user')->unsigned();
			$table->bigInteger('id_team')->unsigned();
			$table->integer('team_role')->unsigned();
			$table->timestamps();
			// Foreign Keys
			$table->foreign('id_user')->references('id')->on('users');
			$table->foreign('id_team')->references('id')->on('team');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('team_user');
	}
};