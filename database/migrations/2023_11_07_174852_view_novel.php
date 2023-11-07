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
		Schema::create('view_novel', function (Blueprint $table) {
			$table->bigIncrements('id');
			$table->bigInteger('id_novel')->unsigned();
			$table->bigInteger('views')->unsigned()->default(0);
			$table->bigInteger('daily_views')->unsigned()->default(0);
			$table->bigInteger('weekly_views')->unsigned()->default(0);
			$table->bigInteger('monthly_views')->unsigned()->default(0);
			// Foreign Keys
			$table->foreign('id_novel')->references('id')->on('novel');
		});
	}
	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('view_novel');
	}
};
