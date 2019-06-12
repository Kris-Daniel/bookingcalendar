import Vue from 'vue';
import CalendarClass from './GetCalendar';

let RenderCalendar = new CalendarClass();

let Store = new Vue({
    name: 'Store',
    data: function() {
        return {
            state: 'standard',
            // stackLS_CL: new Stack('week'),
            // stackTS: new Stack(false),
            settings: RenderCalendar.settings,
            overlay: false,
            showLS: false, // mobile
            showTS: false,
            SD: RenderCalendar.schedule.days,
            WD: RenderCalendar.schedule.weekDays,
            BK: RenderCalendar.bookings,
            MONTHS: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ],
            WEEK: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            WEEKNAMES: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        }
    }
});

export default Store;