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
    Schema::create('novel', function (Blueprint $table) {
      $table->bigIncrements('id');
      $table->string('name_novel');
      $table->string('thumbnail');
      $table->string('author');
      $table->string('illustrator');
      $table->bigInteger('views')->default(0);
      $table->integer('status')->default(0);
      $table->string('slug');
      $table->integer('is_publish')->unsigned()->default(0);
      $table->bigInteger('id_rate')->unsigned()->nullable();
      $table->bigInteger('id_team')->unsigned();
      $table->bigInteger('id_detail')->unsigned();
      $table->bigInteger('id_user')->unsigned();
      $table->timestamps();
      // Foreign Keys
      $table->foreign('id_rate')->references('id')->on('rate');
      $table->foreign('id_team')->references('id')->on('team');
      $table->foreign('id_detail')->references('id')->on('detail');
      $table->foreign('id_user')->references('id')->on('users');
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    Schema::dropIfExists('novel');
  }
};