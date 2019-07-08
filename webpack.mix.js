const mix = require('laravel-mix');
const path = require("path");

function setDir(dir) {
   return path.resolve(__dirname, "resources/js/" + dir);
}
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

mix.js('resources/js/app.js', 'public/js')
   .less('resources/less/app.less', 'public/css');

mix.webpackConfig({
   resolve: {
      alias: {
         MySvg: setDir("svg/"),
         Components: setDir("components/"),
         Calendar: setDir("components/calendar6/parts/Calendar/"),
         CalendarSTORE$: setDir("components/calendar6/parts/Calendar/helpers/CalendarSTORE.js"),
         ToggledSidebar: setDir("components/calendar6/parts/ToggledSidebar/"),
         ToggledSidebarSTORE$: setDir("components/calendar6/parts/ToggledSidebar/helpers/ToggledSidebarSTORE.js"),
         CalendarsWrapper: setDir("components/calendar6/parts/CalendarsWrapper/"),
      },
      extensions: ['.vue', '.js', '.json']
   }
});