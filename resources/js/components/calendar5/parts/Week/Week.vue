<template>
    <div class="days days--week">
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
    let WD = Store.WD;
    for(let d in WD) {
        weekDays.push(Helper.fillWeekDay(d, WD));
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
