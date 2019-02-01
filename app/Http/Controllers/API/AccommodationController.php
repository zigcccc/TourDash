<?php

namespace App\Http\Controllers\API;

use App\Accommodation;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Resources\Accommodation as AccommodationResource;
use Validator;
use Illuminate\Validation\Rule;
use Debugbar;

class AccommodationController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $orderBy = $request->get('order_by');
        if ($request->get('order_by')) {
            $validator = Validator::make($request->all(), [
                'order_by' => ['required', Rule::in(['price', 'title', 'created_at', 'num_of_guests', 'num_of_beds'])],
            ]);
            if ($validator->fails()) {
                return response()->json(['error' => $validator->errors(), 'errorMessage' => 'Napačen parameter "order_by". Sprejemljive možnosti so: price, title, created_at, num_of_guests, num_of_beds']);
            }
            return AccommodationResource::collection(Accommodation::orderBy($request->get('order_by'))->get());
        } else {
            return AccommodationResource::collection(Accommodation::orderBy('price')->get());
        }
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'title' => 'required|unique:accommodations',
            'featured_image' => 'required|array',
            'type' => ['required', Rule::in(['soba', 'apartma', 'bungalov'])],
            'num_of_beds' => 'required|integer',
            'num_of_guests' => 'required|integer',
            'price' => 'required|numeric|min:0',
            'features' => 'array',
            'description' => 'required|string',
            'content' => 'string',
            'trending' => 'required|boolean',
            'best_seller' => 'required|boolean',
            'visible' => 'required|boolean',
            'gallery' => 'array',
            'author_id' => 'required|integer'
        ]);

        if ($validator->fails()) {
            Debugbar::info($validator->errors());
            return response()->json(['error' => $validator->errors()], 403);
        }

        try {
            $accommodation = Accommodation::create($input);
            return response()->json(['success' => 'Namestitve uspešno dodana!', 'data' => $accommodation]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

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
