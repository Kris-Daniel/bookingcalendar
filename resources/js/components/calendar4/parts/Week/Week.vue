<template>
    <div class="days weekdays">
        <div class="day_grid" v-for="day in weekDays">
            <Day :data="day"></Day>
        </div>
    </div>
</template>

<script>

import Helper from '../../services/Helper';
import Store from '../../services/Store';
import Day from '../Day/Day';

export default {
    name: 'Month',
    components: {
        Day
    },
    data: function() {
        return {

        }
    },
    created()
    {
        
    },
    computed: {
        weekDays: function() {
            return fillWeekDaysArr()
        }
    },
}

function fillWeekDaysArr()
{
    let weekDays = [];
    for(let i = 0; i < Store.WEEK.length; i++) {
        weekDays.push({
            name: Store.WEEK[i],
            type: 'week'
        });
    }
    if(Store.mondayFirst) {
        let Su = weekDays[0];
        weekDays.shift();
        weekDays.push(Su);
    }
    return weekDays;
}
</script>

<style>
</style>
