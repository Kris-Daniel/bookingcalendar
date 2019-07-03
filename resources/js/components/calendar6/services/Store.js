import Vue from 'vue';
let Store = new Vue({
    name: 'Store',
    data: function() {
        return {
            state: 'standard',
            settings: RenderCalendar.settings,
            overlay: false,
            showLS: false, // mobile
            showTS: false,
        }
    }
});

export default Store;