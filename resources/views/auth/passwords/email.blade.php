@extends('layouts.weblayout')

@section('title', 'Reset password')

@section('css')
    <link rel="stylesheet" href="{{ mix('css/auth.css') }}">
    <style>
        * {
            font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", 'Roboto', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
        }
    </style>
@endsection

@section('root-component')
    <div id="auth" data-route="password-reset"></div>
@endsection

@section('javascript')
    <script src="{{ mix('js/auth.js') }}"></script>
@endsection