import Vue from 'vue';

class HashCalendars {

    constructor() {
        this.length = 0;
        this.calendars = {};
    }

    addCalendar(name, params) {
        if (!this.calendars[name]) {
            this.length++;
            this.calendars[name] = params;
        }
    }

    get(name) {
        return this.calendars[name] ? this.calendars[name] : false;
    }

    delete(name) {
        if (this.calendars[name]) {
            delete this.calendars[name]
            this.length--;
            return true;
        }
        return false;
    }

}
let StoreCL = new Vue({
    name: 'StoreCL',
    data: function () {
        return {
            calendars: {}
        }
    }
});

export default StoreCL;