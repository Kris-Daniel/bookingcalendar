import Vue from 'vue';
let CalendarSTORE = new Vue({
    name: 'CalendarSTORE',
    data: function () {
        return {
            calendars: {},
            MONTHS: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ],
            WEEK: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            WEEKNAMES: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
        }
    }
});

export default CalendarSTORE;