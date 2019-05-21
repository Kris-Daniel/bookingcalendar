<template>
    <div class="LS" :class="{active: showLS}">
        <TabsLS></TabsLS>
        <div class="intervals">
            <template v-for="day in renderDays">
                <IntervalLS :data="day" :state="stateObserver"></IntervalLS>
            </template>
        </div>
        <div class="center pt100 show-in-mobile">
            <BtnEditTS></BtnEditTS>
        </div>
        <div class="pv80"></div>
        <input type="hidden" name="" :value="stateObserver">
    </div>
</template>

<script>
import Vue from 'vue';
import Store from '../../services/Store';
import Helper from '../../services/Helper';
import IntervalLS from './IntervalLS';
import TabsLS from './TabsLS';
import BtnEditTS from '../CL/BtnEditTS';

export default {
    name: 'LS',
    components: {
        IntervalLS,
        TabsLS,
        BtnEditTS
    },
    computed: {
        showLS() {
            return Store.showLS;
        },
        stateObserver() {
            return Store.stackLS_CL.state;
        },
        renderDays() {
            let days = [];
            if(this.stateObserver == 'week') {
                let WD = Store.WD;
                for(let ref in WD) {
                    let day = Helper.fillWeekDay(ref, WD);
                    day.checked = (this.stateObserver == 'standard') ? day.checked : false;
                    days.push(day);
                }
                if(Store.mondayFirst) {
                    let Su = days[0];
                    days.shift();
                    days.push(Su);
                }
            }
            else {
                let SD = Store.SD;
                let hash = {};
                for(let ref in SD) {
                    let day = Helper.fillSpecialDay(ref);
                    hash[ref] = true;
                    day.checked = (this.stateObserver == 'standard') ? day.checked : false;
                    day.toStandard = true;
                    days.push(day);
                }
                if(Store.state == 'standard') {
                    Store.stackLS_CL.map(function(item) {
                        if(!hash[item.ref])
                        days.push(item);
                    });
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

    }

}
</script>
