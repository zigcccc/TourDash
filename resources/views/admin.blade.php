@extends('layouts.weblayout')

@section('title', 'Admin')

@section('css')
    <link rel="stylesheet" href="{{ asset('css/admin.css') }}">
    <style>
        * {
            font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", 'Roboto', Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif
        }
    </style>
@endsection

@section('root-component')
    <div id="admin"></div>
@endsection

@section('javascript')
    <script src="{{ asset('js/admin.js') }}"></script>
@endsection
