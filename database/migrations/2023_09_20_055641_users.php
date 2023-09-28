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
		Schema::create('users', function (Blueprint $table) {
			$table->bigIncrements('id');
			$table->string('name');
			$table->string('email')->unique();
			$table->timestamp('email_verified_at')->nullable();
			$table->string('password')->nullable();
			$table->integer('id_role')->unsigned()->default(2);
			$table->string('provider')->nullable();
			$table->string('provider_id')->nullable();
			$table->string('provider_token')->nullable();
			$table->string('avatar')->nullable();
			$table->rememberToken();
			$table->timestamps();
			// Foreign Keys
			$table->foreign('id_role')->references('id_role')->on('role');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('users');
	}
};