<?php

namespace App\Http\Controllers\API;

use App\Accommodation;
use Illuminate\Http\Request;
use App\Http\Resources\Accommodation as AccommodationResource;

class AccommodationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Accommodation  $accommodation
     * @return \Illuminate\Http\Response
     */
    public function show(Accommodation $accommodation)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Accommodation  $accommodation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Accommodation $accommodation)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Accommodation  $accommodation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Accommodation $accommodation)
    {
        //
    }
}
