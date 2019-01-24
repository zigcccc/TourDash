<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\ImageModel;
use Image;
use Validator;
use Debugbar;

class ImageController extends Controller
{
    private $imageDirectoryBase = '/images/uploads/posts-uploads';
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

        // Init validation
        $validator = Validator::make($request->only('image'), [
            'image' => 'image|required|mimes:jpeg,png,jpg,gif,svg'
        ]);

        // Check validation
        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 401);
        }

        $originalImage = $request->file('image');

        // Create new image object which can be edited
        $editingImage = Image::make($originalImage);

        // Set Image paths
        $thumbnailPath = public_path() . $this->imageDirectoryBase . '/thumbnail/';
        $mediumPath = public_path() . $this->imageDirectoryBase . '/medium/';
        $originalPath = public_path() . $this->imageDirectoryBase . '/original/';

        // Save images on the disk
        $filename = time() . $originalImage->getClientOriginalName();

        $editingImage->save($originalPath . $filename);

        $mediumImage = $editingImage->widen(720, function($constraint){
            $constraint->upsize();
        });
        $mediumImage->save($mediumPath . $filename);

        $thumbnailImage = $editingImage->fit(300);
        $thumbnailImage->save($thumbnailPath . $filename);

        // Save reference to the database
        $imagemodel = new ImageModel();
        $imagemodel->filename = $filename;
        $imagemodel->originalImageUrl = $originalPath . $filename;
        $imagemodel->mediumImageUrl = $mediumPath . $filename;
        $imagemodel->thumbnailImageUrl = $thumbnailPath . $filename;
        $imagemodel->save();

        // Return success response with image urls
        $imageUrls = [
            'fullsize' => $this->imageDirectoryBase . '/original/' . $filename,
            'medium' => $this->imageDirectoryBase . '/medium/' . $filename,
            'thumbnail' => $this->imageDirectoryBase . '/thumbnail/' . $filename
        ];
        return response()->json(['success' => 'Slika uspešno naložena.', 'data' => $imageUrls], 200);

    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
