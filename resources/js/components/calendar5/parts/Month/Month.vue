<template>
    <div class="days days--month">
        <div class="day_grid" v-for="n in offset"></div>
        <div class="day_grid" v-for="day in days">
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
    props: [
        'year',
        'month',
    ],
    data: function() {
        return {
            offset: 0
        }
    },
    created()
    {

    },
    computed: {
        days: function() {
            let days = fillDaysArr(this.year, this.month + 1);
            this.offset = days[0].weekIndex;
            if(Store.mondayFirst) {
                this.offset--;
                this.offset = this.offset < 0 ? 6 : this.offset;
            }
            return days;
        }
    },
}

function fillDaysArr(year, month)
{
    let days = [];
    let daysNum = Helper.getDaysInMonth(year, month);
    month = Helper.zeroToNum(month);
    for(let i = 1; i <= daysNum; i++) {
        let dayStr, ref, day;

        dayStr = Helper.zeroToNum(i);
        ref = `d${year}-${month}-${dayStr}`;
        day = Helper.fillSpecialDay(ref);
        days.push(day);
    }
    return days;
}
</script>

<style>
</style>
