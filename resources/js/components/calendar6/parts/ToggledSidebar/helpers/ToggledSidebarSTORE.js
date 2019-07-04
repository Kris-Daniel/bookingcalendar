import Vue from 'vue';
import CalendarSTORE from '../../Calendar/helpers/CalendarSTORE';

let ToggledSidebarSTORE = new Vue({
    name: 'ToggleSidebarSTORE',
    data: function () {
        return {
            calendarId: null,
            views: {},
            showOverlay: false
        }
    },
    created() {
        this.setViews({
            timeSetting: {
                component: 'TimeSetting',
                children: {
                    setMultipleDays: {
                        component: 'SetMultipleDays',
                        active: false
                    }
                },
                active: false
            },
            bookings: {
                component: 'bookings',
                active: false,
            }
        }, this.views);
        console.log(this.views, 'views');
    },
    methods: {
        render(ref, daysProps, data, calendarId) {
            this.calendarId = calendarId;
            this.views[data.component].active = true;
            Vue.set(this.views[data.component], 'props', {
                ref,
                daysProps,
                data
            });
            // console.log(data, 'daysProps');
            // console.log(this.views, 'views');
        },
        setViews(data, enviroment) {
            for(let propName in data) {
                Vue.set(enviroment, propName, {});
                Vue.set(enviroment[propName], 'component', data[propName].component);
                Vue.set(enviroment[propName], 'active', data[propName].active);
                if(data[propName].children) {
                    Vue.set(enviroment[propName], 'children', {});
                    this.setViews(data[propName].children, enviroment[propName].children);
                }
            }
        },
        disableViews(enviroment) {
            if(this.showOverlay) {
                this.showOverlay = false;
                Vue.set(
                    CalendarSTORE.calendars[this.calendarId].daysProps,
                    "checkedDays",
                    {}
                );
                this.calendarId = null;
            }
            if(!enviroment) enviroment = this.views;
            for(let propName in enviroment) {
                enviroment[propName].active = false;
                if(enviroment[propName].children)
                    this.disableViews(enviroment[propName].children);
            }
        }
    }
});

export default ToggledSidebarSTORE;