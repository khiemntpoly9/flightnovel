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
      $table->bigIncrements('id_novel');
      $table->string('name_novel');
      $table->string('thumbnail');
      $table->string('author');
      $table->string('illustrator');
      $table->bigInteger('views');
      $table->integer('status');
      $table->integer('id_vol')->unsigned();
      $table->bigInteger('id_rate')->unsigned();
      $table->bigInteger('id_user')->unsigned();
      $table->bigInteger('id_team')->unsigned();
      $table->bigInteger('id_detail')->unsigned();
      $table->timestamps();
      // Foreign Keys
      $table->foreign('id_vol')->references('id_vol')->on('vol');
      $table->foreign('id_rate')->references('id_rate')->on('rate');
      $table->foreign('id_user')->references('id')->on('users');
      $table->foreign('id_team')->references('id_team')->on('team');
      $table->foreign('id_detail')->references('id_detail')->on('detail');
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