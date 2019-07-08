import Vue from 'vue';
import CalendarSTORE from 'CalendarSTORE';

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
                    MultipleDaysChoser: {
                        component: 'MultipleDaysChoser',
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
        renderParentView(calendarId, commonDaysInfo, data) {
            this.calendarId = calendarId;
            this.views[data.component].active = true;
            Vue.set(this.views[data.component], 'props', {
                commonDaysInfo,
                data
            });
            // console.log(data, 'daysProps');
            // console.log(this.views, 'views');
        },
        renderChildView(child, data) {
            child.active = true;
            Vue.set(child, 'props', {
                data
            });
        },
        setViews(data, enviroment, parent) {
            for (let propName in data) {
                Vue.set(enviroment, propName, {});
                Vue.set(enviroment[propName], 'component', data[propName].component);
                Vue.set(enviroment[propName], 'active', data[propName].active);
                if (parent) enviroment[propName].parent = parent;
                if (data[propName].children) {
                    Vue.set(enviroment[propName], 'children', {});
                    this.setViews(data[propName].children, enviroment[propName].children, enviroment[propName]);
                }
            }
        },
        disableViews(enviroment) {
            if (this.showOverlay) {
                this.showOverlay = false;
                Vue.set(
                    CalendarSTORE.calendars[this.calendarId].daysProps,
                    "checkedDays",
                    {}
                );
                this.calendarId = null;
            }
            if (!enviroment) enviroment = this.views;
            for (let propName in enviroment) {
                enviroment[propName].active = false;
                if (enviroment[propName].children)
                    this.disableViews(enviroment[propName].children);
            }
        }
    }
});

export default ToggledSidebarSTORE;