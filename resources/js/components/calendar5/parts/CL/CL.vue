<template>
    <div class="CL_grid">
        <div class="CL">
            <PopupClient></PopupClient>
            <TabsCL></TabsCL>
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
        <div class="box0 pt20">
            <div class="a-6">

            </div>
            <div class="a-6">
                <BtnEditTS></BtnEditTS>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import Store from '../../services/Store';
import Helper from '../../services/Helper';
import ArrowLeft from '../../../../svg/arrow-left';
import ArrowRight from '../../../../svg/arrow-right';

import PopupClient from '../Popup/Client';
import TabsCL from './TabsCL';
import BtnEditTS from './BtnEditTS';
import Month from '../Month/Month';
import Week from '../Week/Week';

export default {
    name: 'CL',
    components: {
        ArrowLeft,
        ArrowRight,
        Month,
        Week,
        PopupClient,
        TabsCL,
        BtnEditTS
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
            Vue.set(Store.SD, 'd2019-05-23', []);
            // console.log(Store.schedule.days);
        }, 2000)
    },
    methods: {
        changeMonth(side)
        {
            let adder = (side == 'next') ? 1 : -1;
            this.date.setMonth(this.date.getMonth() + adder);
            this.year = this.date.getFullYear();
            this.month = this.date.getMonth();
        },
        editDays()
        {
            if(Store.TS.state != 'editSchedule')
                Vue.set(Store.TS, 'state', 'editSchedule');
            else
                Vue.set(Store.TS, 'state', false);
        }
    }
}


</script>
