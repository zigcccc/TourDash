<?php

namespace App\Http\Controllers\API;

use App\Review;
use App\Activity;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Http\Resources\Review as ReviewResource;
use Illuminate\Support\Facades\Auth;
use Validator;
use Debugbar;

class ReviewController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return ReviewResource::collection(Review::orderBy('created_at', 'DESC')->paginate(10));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            "user_id" => "integer|required|exists:users,id",
            "accommodation_id" => "integer|required|exists:accommodations,id",
            "rating" => "integer|required",
            "review" => "string"
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()]);
        }

        try {
            $review = Review::create($input);

            if ($review) {
                $content = [
                    "rating" => $review->rating,
                    "review" => $review->review
                ];
                $activity = new Activity;
                $activity->type = "review";
                $activity->referral = $review->id;
                $activity->refers_to = $review->accommodation->title;
                $activity->user_id = $review->user_id;
                $activity->content = $content;
                $activity->save();
            }

            return response()->json(['success' => 'Mnenje uspešno oddano!']);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Review $review)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Review  $review
     * @return \Illuminate\Http\Response
     */
    public function destroy(Review $r, $id)
    {
        try {
            $review = Review::find($id);
            $activity = Activity::where("referral", $id)->first();
            $review->destroy($review->id);
            $activity->destroy($activity->id);
            return response()->json(['success' => 'Mnenje uspešno izbrisano']);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function approve(Review $review, $id)
    {
        try {
            $review = Review::find($id);
            $review["approved"] = true;
            $review->save();
            return response()->json(['success' => 'Mnenje uspešno odobreno!']);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function show($accommodationId)
    {
        try {
            $reviews = Review::where('accommodation_id', $accommodationId)
                            ->where('approved', true)
                            ->orderBy('rating')
                            ->limit(5)
                            ->get();

            return ReviewResource::collection($reviews);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }

    public function approvedReviews(Request $request)
    {
        try {
            $reviews = Review::orderBy("rating")
                               ->where('approved', true)
                               ->limit($request->get('amount'))
                               ->get();
            return ReviewResource::collection($reviews);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()]);
        }
    }
}
