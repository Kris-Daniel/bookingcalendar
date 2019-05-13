import Helper from './Helper';
import Vue from 'vue';

let Store = new Vue({
    name: 'Store',
    data: function() {
        return {
            settings: Helper.RenderCalendar.settings,
            state: 'standard',
            LS_CL: {
                state: 'week',
                stack: {},
            },
            LS: {
                state: 'week'
            },
            TS: {
                state: false
            },
            schedule: Helper.RenderCalendar.schedule,
            bookings: Helper.RenderCalendar.bookings,
            MONTHS: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ],
            WEEK: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            mondayFirst: true
        }
    }
});

export default Store;
