import 'es6-promise/auto';
import Vue from 'vue';
import Vuex from 'vuex';
import CalendarSTORE from './modules/Calendar/CalendarSTORE';
import ToggledSidebarSTORE from './modules/ToggledSidebar/ToggledSidebarSTORE';
import Constants from './modules/Constants/Constants';

Vue.use(Vuex);

const store = new Vuex.Store({
    state: {
        count: 0
    },
    mutations: {
        increment(state) {
            state.count++
        }
    },
    actions: {
        registerCalendarModule(context, options) {
            this.registerModule(options.name, new CalendarSTORE(options));
        },
        registerToggledSidebarModule(context, options) {
            this.registerModule(options.name, new ToggledSidebarSTORE(options));
        }
    },
    modules: {
        Constants
    }
});

export default store;