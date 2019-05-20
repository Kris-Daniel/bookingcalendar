<template>
    <div
        class="day"
        :class="[setClassNames, {checked: InLS_CL(), special: inStoreSD()}]"
        @click="click()"
    >
        <div class="day_center">
            <div class="day_center_rel">
                {{data.name}}
                <div class="day_circle"></div>
            </div>
        </div>
        <div
            v-if="data.bookingsAmount > 0"
            class="day_book-count"
        >
            {{data.bookingsAmount}}
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import Helper from '../../services/Helper';
import Store from '../../services/Store';

export default {
    name: 'Day',
    props: ['data'],
    computed: {
        setClassNames() {
            return dayClasses[Store.state + 'ClassNames'](this.data, this);
        }
    },
    methods: {
        click()
        {
            Helper.dayClick(this.data);
        },
        InLS_CL() {
            let checked = Store.stackLS_CL.inStack(this.data) ? true : false;
            return checked;
        },
        inStoreSD() {
            let isSpecial = Store.SD[this.data.ref] ? true : false;
            isSpecial = Store.state == 'standard' ? isSpecial : false;
            return isSpecial;
        }
    }
}

let dayClasses = {
    standardClassNames(day) {
        let classes = '';
        if(day.current) classes += ' current';

        // days
        if(day.type == 'day') {
            if(Store.SD[day.ref]) {
                if(Store.SD[day.ref].length == 0) classes += ' off';
                else classes += ' standard';
            }
            else if(Store.WD[day.weekName].length > 0) classes += ' standard';
            else classes += ' off';
        }
        // week days
        else if(day.type == 'week') {
            classes += ' bold';
            if(Store.WD[day.name].length > 0) classes += ' standard';
            else classes += ' off';
        }
        return classes;
    },
    ordersClassNames(day, obj) {
        let classes = ' day--order';
        if(day.type == 'week')
            classes += ' bold';
        else if(!day.bookingsAmount)
            classes += ' off';
        return classes;
    },
    clientClassNames(day) {

    },
}
</script>
