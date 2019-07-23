import Vue from "vue";
import Router from "vue-router";
import CalendarPage from 'VueLayouts/CalendarPage';
Vue.use(Router);

export default new Router({
    routes: [
        {
            path: "/",
            name: 'home',
            component: CalendarPage
        },
        {
            path: "/calendar",
            name: 'calendar',
            component: CalendarPage
        }
    ]
});
