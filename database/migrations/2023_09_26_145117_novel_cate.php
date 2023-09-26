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
		Schema::create('novel_cate', function (Blueprint $table) {
			$table->primary(['id_novel', 'id_categories']);
			$table->bigInteger('id_novel')->unsigned();
			$table->integer('id_categories')->unsigned();
			// Foreign Keys
			$table->foreign('id_novel')->references('id_novel')->on('novel');
			$table->foreign('id_categories')->references('id_categories')->on('categories');
		});
	}

	/**
	 * Reverse the migrations.
	 */
	public function down(): void
	{
		Schema::dropIfExists('novel_cate');
	}
};