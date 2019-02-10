<?php

namespace App\Http\Controllers\API;

use Illuminate\Database\Eloquent\ModelNotFoundException;
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
            return AccommodationResource::collection(Accommodation::orderBy('title')->get());
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
    public function show(Accommodation $accommodation, $id)
    {
        try {
            $res = $accommodation->findOrFail($id);
            return new AccommodationResource($res);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Zahtevana namestitev ne obstaja...']);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Accommodation  $accommodation
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Accommodation $accommodation, $id)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'title' => 'string',
            'featured_image' => 'array',
            'type' => Rule::in(['soba', 'apartma', 'bungalov']),
            'num_of_beds' => 'integer',
            'num_of_guests' => 'integer',
            'price' => 'numeric|min:0',
            'features' => 'array',
            'description' => 'string',
            'content' => 'string',
            'trending' => 'boolean',
            'best_seller' => 'boolean',
            'visible' => 'boolean',
            'gallery' => 'array',
            'author_id' => 'integer'
        ]);
        
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 403);
        }

        try {
            $accommodation->findOrFail($id)->update($input);
            return response()->json(['success' => 'Namestitev je bila uspešno posodobljena!'], 200);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Zahtevana namestitev ne obstaja...']);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Accommodation  $accommodation
     * @return \Illuminate\Http\Response
     */
    public function destroy(Accommodation $accommodation, $id)
    {
        try {
            $accommodation->findOrFail($id)->destroy($id);
            return AccommodationResource::collection(Accommodation::orderBy('title')->get());
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        } catch (ModelNotFoundException $e) {
            return response()->json(['error' => 'Zahtevana nastanitev ne obstaja.'], 404);
        }
    }

    /**
     * Search for specific resource based on a request query.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function search(Request $request)
    {
        $input = $request->only('q');
        $q = $input['q'];
        
        $result = Accommodation::where('title', 'LIKE', '%' . $q . '%')->orderBy('title');
        return AccommodationResource::collection($result->get());
    }

    /**
     * Get subset of pages information needed to display on
     * the dashboard preview
     * @return \Illuminate\Http\Response
     */
    public function getAccommodationsPreview()
    {
        try {
            $accommodations = Accommodation::join('users', 'users.id', '=', 'accommodations.author_id')
                                            ->where('accommodations.visible', true)
                                            ->select('accommodations.id', 'accommodations.title', 'accommodations.featured_image->thumbnail as featured_image', 'users.name as author_name', 'users.avatar as author_avatar')
                                            ->orderBy('title')
                                            ->limit(3)
                                            ->get();

            $accommodationsCount = Accommodation::count();

            return response()->json([
                'success' => 'Podatki o namestitvah uspešno pridobljeni!',
                'accommodations' => $accommodations,
                'all_accommodations_count' => $accommodationsCount
            ], 200);
            
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    /**
     * Get most liked accommodations
     * @return \Illuminate\Http\Response
     */
    public function mostFavorited()
    {
        try {

            $accommodations = Accommodation::orderBy('num_of_saves', 'DESC')->limit(7)->select('title', 'id', 'featured_image->thumbnail as image', 'num_of_saves')->get();

            return response()->json(['data' => $accommodations], 200);

        } catch (Exception $e) {

            return response()->json(['error' => $e->getMessage()], 500);

        } catch (ModelNotFoundException $e) {

            return response()->json(['error' => 'Zahtevana nastanitev ne obstaja.'], 404);

        }
    }
}
