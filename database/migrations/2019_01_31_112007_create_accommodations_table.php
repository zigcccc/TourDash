<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAccommodationsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('accommodations', function (Blueprint $table) {
            $table->increments('id');
            $table->string('title')->unique();
            $table->string('featured_image');
            $table->string('description');
            $table->string('type');
            $table->float('price');
            $table->integer('num_of_beds');
            $table->integer('num_of_guests');
            $table->text('content');
            $table->boolean('visible')->default(true);
            $table->boolean('best_seller')->default(false);
            $table->boolean('trending')->default(false);
            $table->json('images');
            $table->json('features');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('accommodations');
    }
}
