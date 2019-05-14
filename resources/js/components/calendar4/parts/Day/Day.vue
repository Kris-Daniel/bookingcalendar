<template>
    <div
        class="day"
        :class="[setClassNames, {checked: data.checked}]"
        @click="click()"
    >
        <div class="day_name">
            <div class="day_name-rel">
                {{data.name}}
                <div class="day_info"></div>
            </div>
        </div>
        <div v-if="bookLength > 0" class="day_bookCount">{{bookLength}}</div>
    </div>
</template>

<script>
import Vue from 'vue';
import Helper from '../../services/Helper';
import Store from '../../services/Store';

export default {
    name: 'Day',
    props: ['data'],
    data: function() {
        return {
            bookLength: 0
        }
    },
    computed: {
        setClassNames() {
            return dayClasses[Store.state + 'ClassNames'](this.data, this);
        }
    },
    methods: {
        click()
        {
            Helper.dayClick(this.data);
        }
    }
}

let dayClasses = {
    standardClassNames(day) {
        let classes = '';
        let WD = Store.schedule.weekDays;
        if(day.current) classes += ' current';
        // special days
        if(day.isSpecial) {
            classes += ' special';
            if(Store.schedule.days[day.ref].length == 0) classes += ' off';
        }
        // default days
        else if(day.type == 'day') {
            if(WD[day.weekName].length > 0) classes += ' standard';
            else classes += ' off';
        }
        // week days
        else if(day.type == 'week') {
            classes += ' bold';
            if(WD[day.name].length > 0) classes += ' standard';
            else classes += ' off';
        }
        return classes;
    },
    ordersClassNames(day, obj) {
        let classes = '';
        if(day.type == 'week')
            classes += ' bold';
        else if(Store.bookings[day.ref]) {
            // obj.bookLength = Store.bookings[day.ref].length;
            Vue.set(obj, 'bookLength', Store.bookings[day.ref].length);
            classes += ' active';
        }
        else
            classes += ' off';
        return classes;
    },
    clientClassNames(day) {

    },
}
</script>
