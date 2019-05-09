<template>
    <div class="days CL_days">
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
        'store'
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
            let days = fillDaysArr(this.year, this.month + 1, this.store);
            this.offset = days[0].weekIndex;
            if(this.store.mondayFirst) {
                this.offset--;
                this.offset = this.offset < 0 ? 6 : this.offset;
            }
            return days;
        }
    },
}

function fillDaysArr(year, month, store)
{
    let days = [];
    let daysNum = Helper.getDaysInMonth(year, month);
    month = Helper.zeroToNum(month);
    for(let i = 1; i <= daysNum; i++) {
        let day = Helper.zeroToNum(i);
        let dateString = `${year}-${month}-${day}`;
        let ref = 'd' + dateString;
        let date = new Date(dateString);
        let current = (date.getTime() / 86400000) == Math.floor(store.settings.time.getTime() / 86400000);
        let isSpecial = store.schedule.days[ref] ? true : false;
        let weekIndex = date.getDay();
        let weekName = store.WEEK[weekIndex];
        days.push({
            date,
            dateString,
            ref,
            name: i,
            weekIndex,
            weekName,
            type: 'day',
            current,
            isSpecial
        });
    }
    return days;
}
</script>

<style>
</style>
