<template>
    <div class="LS">
        <div class="LS_head">
            <div class="LS_title">Schedule</div>
            <div class="LS_tabs">
                <div class="tab" :class="{active: tab == 'week'}">
                    <span class="name" @click="changeTab('week')">Regular</span>
                </div>
                <div class="tab" :class="{active: tab == 'day'}">
                    <span class="name" @click="changeTab('day')">Special</span>
                </div>
            </div>

        </div>

        <div class="intervals">
            <template v-for="day in renderDays">
                <IntervalLS :data="day" :tab="tab"></IntervalLS>
            </template>
        </div>

    </div>
</template>

<script>
import Vue from 'vue';
import Store from '../../services/Store';
import Helper from '../../services/Helper';
import IntervalLS from './IntervalLS';

export default {
    name: 'LS',
    components: {
        IntervalLS
    },
    computed: {
        tab() {
            return Store.LS.state;
        },
        renderDays() {
            let days = [];
            if(this.tab == 'week') {
                let WD = Store.schedule.weekDays;
                for(let ref in WD) {
                    let day = Helper.fillWeekDay(ref, WD);
                    day.checked = Store.state == 'standard' ? day.checked : false;
                    days.push(day);
                }
                if(Store.mondayFirst) {
                    let Su = days[0];
                    days.shift();
                    days.push(Su);
                }
            }
            else {
                let SD = Store.schedule.days;
                for(let ref in SD) {
                    let day = Helper.fillSpecialDay(ref);
                    day.checked = Store.state == 'standard' ? day.checked : false;
                    day.toStandard = true;
                    days.push(day);
                }
                days.sort(function (a, b) {
                    if (a.date > b.date) return 1;
                    if (a.date < b.date) return -1;
                    return 0;
                });
            }
            return days;
        }
    },
    created()
    {

    },
    methods: {
        changeTab(tab) {
            Store.LS.state = tab;
        }
    }

}
</script>
