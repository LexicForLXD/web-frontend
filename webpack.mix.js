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
  .js("src/app.js", "public/js")
  .copy(
    "node_modules/vuetify/dist/vuetify.min.css",
    "public/css/vuetify.min.css"
  )
  .extract(["vue"])
  .options({
    publicPath: "public"
  })
  .disableNotifications();

if (mix.inProduction()) {
  mix.version();
}
