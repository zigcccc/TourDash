@extends('layouts.weblayout')

@section('title', 'Login or register')

@section('css')
    <link rel="stylesheet" href="{{ mix('css/auth.css') }}">
    <style>
        * {
            font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", 'Roboto', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
        }
    </style>
@endsection

@section('root-component')
    <div id="auth" data-route="verify"></div>
@endsection

@section('javascript')
    @if (session('resent'))
        <script>
            window.resent = true;
        </script>
    @endif
    <script src="{{ mix('js/auth.js') }}"></script>
@endsection