import Vue from "vue";
import Router from "vue-router";
import CalendarPage from 'Layouts/CalendarPage';
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
