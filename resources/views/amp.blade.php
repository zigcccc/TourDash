@extends('layouts.amplayout')
@if($data)
  @section('title', implode(' ', explode('-', $data)))
@else
  @section('title', 'Novice')
@endif

@section('content')
  @if($data)
    <h1>{{ implode(' ', explode('-', $data)) }}</h1>
  @endif
@endsection
