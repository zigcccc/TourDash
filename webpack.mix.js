let mix = require("laravel-mix");

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for the application as well as bundling up all the JS files.
 |
 */

mix
	.react("resources/js/app.js", "public/js")
	.react("resources/js/admin.js", "public/js")
	.react("resources/js/auth.js", "public/js")
	.sass("resources/sass/app.sass", "public/css")
	.sass("resources/sass/admin.sass", "public/css/admin.css")
	.sass("resources/sass/auth.sass", "public/css");

if (mix.inProduction()) {
	mix.version();
}
