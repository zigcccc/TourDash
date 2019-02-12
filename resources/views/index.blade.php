@extends('layouts.weblayout')

@section('title', 'Homepage')

@section('css')
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/Swiper/4.4.1/css/swiper.min.css">
    <link rel="stylesheet" href="{{ asset('css/app.css') }}">
@endsection

@section('root-component')
    <div id="root"></div>
@endsection

@section('javascript')
    <script src="{{ asset('js/app.js') }}"></script>
@endsection