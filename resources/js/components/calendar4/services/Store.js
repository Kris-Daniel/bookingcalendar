import Helper from './Helper';
import Vue from 'vue';
class Stack {
    constructor(state = 0) {
        this.state = state;
        this.items = {};
        this.length = 0;
    }
    add(item, obj) {
        if(!this.inStack(item)) {
            Vue.set(obj.items, item.ref, item);
            this.length++;
        }
    }
    addOnce(item, obj) {
        if(!this.inStack(item)) {
            this.reset();
            this.add(item, obj);
        }
    }
    remove(item, obj) {
        if(this.inStack(item)) {
            Vue.delete(obj.items, item.ref);
            this.length--;
        }
    }
    addRemove(item, obj) {
        if(!this.inStack(item))
            this.add(item, obj);
        else
            this.remove(item, obj)
    }
    addRemoveOnce(item, obj) {
        if(!this.inStack(item)) {
            this.reset();
            this.add(item, obj);
        }
        else
            this.remove(item, obj)
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
    resetVue(obj) {
        this.length = 0;
        for(let i in obj.items)
            Vue.delete(obj.items, i);
    }
    getFirst() {
        for(let i in this.items)
            return this.items[i];
        return {};
    }
}
let Store = new Vue({
    name: 'Store',
    data: function() {
        return {
            settings: Helper.RenderCalendar.settings,
            state: 'standard',
            stackLS_CL: new Stack('week'),
            stackTS: new Stack('clients'),
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

export default Store;
