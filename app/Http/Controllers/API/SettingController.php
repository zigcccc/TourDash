<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Setting;
use App\Http\Controllers\Controller;
use App\Http\Resources\Setting as SettingResource;
use Validator;
use Illuminate\Validation\Rule;
use Debugbar;
use Illuminate\Support\Facades\Auth;
use Illuminate\Database\Eloquent\ModelNotFoundException;

class SettingController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function indexContact(Request $request)
    {
        return SettingResource::collection(Setting::where('setting_purpose', 'contact')->orderBy('setting_name')->get());
    }
    public function indexVisual(Request $request)
    {
        return SettingResource::collection(Setting::where('setting_purpose', 'visual')->orderBy('setting_name')->get());
    }
    public function indexMarketing(Request $request)
    {
        return SettingResource::collection(Setting::where('setting_purpose', 'marketing')->orderBy('setting_name')->get());
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
            'setting_name' => 'required|unique:settings|string',
            'setting_value' => 'string',
            'setting_purpose' => ['required', Rule::in(['contact', 'marketing', 'visual'])],
            'public' => 'boolean'
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => $validator->errors()], 403);
        }

        try {
            $setting = Setting::create($input);
            return response()->json(['success' => 'Nastavitev uspešno spremenjena!', 'data' => $setting]);
        } catch (Exception $e) {
            return response()->json(['error' => $e->getMessage()], 500);
        }

    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Setting $setting, $id)
    {
        try {

            $res = $setting->findOrFail($id);
            $user = $request->user('api');
            if (!$res->public && (!$user || !$user->hasAnyRole(['admin', 'superadmin']))) {
                return response()->json(['error' => 'Za ogled te nastavitve nimate zadostnih dovoljenj...'], 403);
            }
            return new SettingResource($res);

        } catch (Exception $e) {

            return response()->json(['error' => $e->getMessage()], 500);

        } catch (ModelNotFoundException $e) {

            return response()->json(['error' => 'Iskana nastavitev ne obstaja...']);

        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Setting  $setting
     * @return \Illuminate\Http\Response
     */
    public function destroy(Setting $setting, $id)
    {
        try {

            $setting->findOrFail($id)->destroy($id);
            return SettingResource::collection(Setting::where('public', true)->orderBy('setting_name')->get());

        } catch (Exception $e) {

            return response()->json(['error' => $e->getMessage()], 500);

        } catch (ModelNotFoundException $e) {

            return response()->json(['error' => 'Zahtevana nastavitev ne obstaja.'], 404);

        }
    }

    /**
     * Store settings
     * 
     * @param \Illuminate\Http\Request $request
     * @param \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $settings = $request->all();
        
        try {

            foreach($settings as $setting) {
                if (gettype($setting) !== "string") {
                    $validator = Validator::make($setting, [
                        'setting_name' => 'required|string',
                        'setting_value' => 'string',
                        'setting_purpose' => ['required', Rule::in(['contact', 'marketing', 'visual'])],
                        'public' => 'boolean'
                    ]);
            
                    if ($validator->fails()) {
                        return response()->json(['error' => $validator->errors()], 403);
                    }

                    $data = [];
                    $data['setting_name'] = $setting['setting_name'];
                    $data['setting_value'] = $setting['setting_value'];
                    $data['setting_purpose'] = $setting['setting_purpose'];
                    $data['public'] = $setting['public'];

                    Setting::updateOrCreate(['setting_name' => $setting['setting_name']], $data);
                }
            }

            $type = $settings['type'] ? $settings['type'] : "contact";
            
            return SettingResource::collection(Setting::where('setting_purpose', $type)->orderBy('setting_name')->get());

        } catch (Exception $e) {

            return response()->json(['error' => $e->getMessage()], 500);

        }
    }
}
