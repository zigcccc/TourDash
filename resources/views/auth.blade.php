@extends('layouts.weblayout')

@section('title', 'Login or register')

@section('css')
    <link rel="stylesheet" href="{{ asset('css/auth.css') }}">
    <style>
        * {
            font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", 'Roboto', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
        }
    </style>
@endsection

@section('root-component')
    <div id="auth"></div>
@endsection

@section('javascript')
    <script src="{{ asset('js/auth.js') }}"></script>
@endsection
