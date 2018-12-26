<?php

if (!function_exists('avatar_asset')) {
  function avatar_asset($file)
  {
    return '/images/uploads/' . $file;
  }
}