<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Page;
use Illuminate\Http\Request;
use App\Http\Resources\Page as PageResource;
use Validator;
use Illuminate\Validation\Rule;
use Debugbar;

class PageController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return PageResource::collection(Page::all());
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {
        $input = $request->all();
        $validator = Validator::make($input, [
            'title' => 'required|unique:pages',
            'slug' => 'unique:pages',
            'user_id' => 'required|numeric',
            'content' => 'required|array',
            'type' => ['required', Rule::in(['vsebinska', 'naslovnica'])]
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 422);
        }
        Debugbar::info($input);
        try {
            $page = Page::create($input);
            return response()->json(['success' => 'Stran je bila uspešno objavljena!', 'data' => $page]);

        } catch(Exception $e) {
            Debugbar::info($e);
            return response()->json(['error' => $e->getMessage()], 400);
        } catch(Throwable $e) {
            Debugbar::info($e);
            return response()->json(['error' => $e->getMessage()], 400);
        }

        return response()->json(['success' => 'do sm je pršlo!']);

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function show(Page $page)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function edit(Page $page)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Page $page)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Page  $page
     * @return \Illuminate\Http\Response
     */
    public function destroy(Page $page)
    {
        //
    }
}
