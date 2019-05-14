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
                state: false,
                client: false,
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
class Stack {
    constructor() {
        this.state = 'week';
        this.items = {};
        this.length = 0;
    }
    add(item) {
        if(!this.inStack(item)) {
            this.items[item.ref] = item;
            this.length++;
        }
    }
    remove(item) {
        if(this.inStack(item)) {
            delete this.items[item.ref];
            this.length--;
        }
    }
    inStack(item) {
        if(this.items[item.ref])
            return true
        else return false;
    }
    reset() {
        this.length = 0;
        for(let i in this.items)
            delete this.items[i];
    }
}
export default Store;
