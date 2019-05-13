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
            <div
                v-for="day in renderDays"
                class="interval interval-sch"
                :class="{checked: day.checked}"
                @click="dayClick(day)"
            >
                <div v-if="tab == 'week'" class="dateBox">
                    {{day.name}}
                </div>
                <div v-else class="dateBox">
                    <div class="dateBox_day">{{day.name}}</div>
                    <div class="dateBox_month">{{day.monthName.slice(0, 3)}}</div>
                </div>
                <div class="timeBox">
                    <div v-for="int in day.intervals" class="timeBox_time">
                        <span>{{int.from}} - {{int.to}}</span>
                    </div>
                    <div v-if="!day.intervals.length" class="timeBox_time timeBox_time-off">
                        day off
                    </div>
                </div>
                <div class="edit">
                    <Pencil></Pencil>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import Vue from 'vue';
import Store from '../../services/Store';
import Helper from '../../services/Helper';
import Pencil from '../../../../svg/pencil';

export default {
    name: 'LS',
    components: {
        Pencil
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
        changeTab(tab)
        {
            Store.LS.state = tab;
        },
        dayClick(day)
        {
            Helper.dayClick(day, Store.state);
        }
    }

}
</script>
