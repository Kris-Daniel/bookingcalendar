const mix = require('laravel-mix');
const path = require("path");

function setModulesDir(dir) {
   return path.resolve(__dirname, "resources/js/modules/" + dir);
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
         ModulesPath: setModulesDir(""),
         Services: setModulesDir("services/"),
         Helpers: setModulesDir("helpers/"),
         PagesJS: setModulesDir("pagesJS/"),
         VuePath: setVueDir(""),
         VueStore: setVueDir("store"),
         VueServices: setVueDir("services"),
         VueMixins: setVueDir("mixins"),
         VueSvg: setVueDir("components/svg/"),
         VueComponents: setVueDir("components/"),
         VueLayouts: setVueDir("components/layouts/"),
         VueCalendar: setVueDir("components/extended/Calendar/"),
         VueToggledSidebar: setVueDir("components/extended/ToggledSidebar/"),

      },
      extensions: ['.vue', '.js', '.json']
   }
});