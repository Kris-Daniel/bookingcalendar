<template>
    <div class="CL">
        <div class="tab_grid">
            <div
                class="tab tab-left"
                :class="{active: store.state == 'standard'}"
                @click="changeTab('standard')"
            ><span>Work hours</span></div>
        </div>
        <div class="tab_grid">
            <div
                class="tab tab-right"
                :class="{active: store.state == 'orders'}"
                @click="changeTab('orders')"
            ><span>Your orders</span></div>
        </div>

        <div class="CL_content">

            <div class="YM">
                <div class="arrow arrow-left" @click="changeMonth('prev')">
                    <ArrowLeft></ArrowLeft>
                </div>
                <div class="YM_text YM_text-left">{{store.MONTHS[month]}}</div>
                <div class="YM_text YM_text-right">{{year}}</div>
                <div class="arrow arrow-right" @click="changeMonth('next')">
                    <ArrowRight></ArrowRight>
                </div>
            </div>

            <div class="hr-top"></div>
            <Week></Week>
            <div class="hr-bottom"></div>
            <Month :year="year" :month="month"></Month>

        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import Store from '../../services/Store';
import Helper from '../../services/Helper';
import ArrowLeft from '../../../../svg/arrow-left';
import ArrowRight from '../../../../svg/arrow-right';

import Month from '../Month/Month';
import Week from '../Week/Week';

export default {
    name: 'CL',
    components: {
        ArrowLeft,
        ArrowRight,
        Month,
        Week
    },
    props: {

    },
    data: function()
    {
        return {
            date: new Date(Store.settings.time.getTime()),
            year: Store.settings.time.getFullYear(),
            month: Store.settings.time.getMonth(), // May
            store: Store
        }
    },
    created: function()
    {
        setTimeout(function() {
            Vue.set(Store.schedule.days, 'd2019-05-23', []);
            // console.log(Store.schedule.days);
        }, 2000)
    },
    methods: {
        changeTab(tab)
        {
            if(Store.state != tab) {
                Helper.undo();
                Store.state = tab;
                // let daysLS = this.LS_CL.state == 'week' ? RenderCalendar.weekDays : RenderCalendar.specialDays;
                // this.LS.render = daysLS;
            }
        },
        changeMonth(side)
        {
            let adder = (side == 'next') ? 1 : -1;
            this.date.setMonth(this.date.getMonth() + adder);
            this.year = this.date.getFullYear();
            this.month = this.date.getMonth();
        }
    }
}


</script>
