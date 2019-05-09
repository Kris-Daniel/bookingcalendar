<template>
    <div
        class="day"
        :class="setClassNames"
    >
        <div class="day_name">
            <div class="day_name-rel">
                {{data.name}}
                <div class="day_info"></div>
            </div>
        </div>
        <!-- <div v-if="state == 'orders' && day.bookLength" class="day_bookCount">{{day.bookLength}}</div> -->
    </div>
</template>

<script>
import Store from '../../services/Store';

export default {
    name: 'Day',
    props: ['data'],
    computed: {
        setClassNames() {
            return dayClasses[Store.state + 'ClassNames'](this.data);
        }
    },
    methods: {
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
    ordersClassNames(day) {

    },
    clientClassNames(day) {

    },
}
</script>
