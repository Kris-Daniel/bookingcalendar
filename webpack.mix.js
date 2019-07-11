const mix = require('laravel-mix');
const path = require("path");

function setDir(dir) {
   return path.resolve(__dirname, "resources/js/" + dir);
}
function setVueDir(dir) {
   return path.resolve(__dirname, "resources/js/vue/" + dir);
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
         VuePath: setVueDir(""),
         Store: setVueDir("store"),
         Services: setVueDir("services"),
         Mixins: setVueDir("mixins"),
         MySvg: setVueDir("components/svg/"),
         Components: setVueDir("components/"),
         Layouts: setVueDir("components/layouts/"),
         Calendar: setVueDir("components/extended/Calendar/"),
         ToggledSidebar: setVueDir("components/extended/ToggledSidebar/"),
         // ToggledSidebarSTORE$: setDir("components/calendar6/parts/ToggledSidebar/helpers/ToggledSidebarSTORE.js"),
         // CalendarSTORE$: setDir("components/calendar6/parts/Calendar/helpers/CalendarSTORE.js"),
      },
      extensions: ['.vue', '.js', '.json']
   }
});