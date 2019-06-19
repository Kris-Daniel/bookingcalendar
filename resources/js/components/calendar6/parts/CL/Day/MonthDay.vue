<template>
    <div v-if="extended" class="day day--hover" ref="day" @click="click">
        <div class="day_inside">{{day}}</div>
    </div>
    <div v-else class="day" ref="day" @click="click">{{day}}</div>
</template>

<script>
import * as $ from 'jquery';

import HelperCL from "../helpers/HelperCL";
import Store from '../../../services/Store';
export default {
    name: "MonthDay",
    props: ["date", "extended", "dayClick", "checkedDays"],
    created() {
        this.dayDiv = '';
        this.year = this.date.year;
        this.month = this.date.month;
        this.day = this.date.day;
        this.dayStr = HelperCL.getDayStr(this.year, this.month, this.day);

        this.time = new Date(this.dayStr);
        this.ref = "d" + this.dayStr;


        if (this.extended) {
            // bookings here
        }
    },
    mounted() {
        this.dayDiv = this.$refs.day;
        if(this.checkedDays[this.ref]) $(this.dayDiv).addClass('checked');
    },
    methods: {
        click() {
            $(this.dayDiv).toggleClass("checked");
            if(this.checkedDays[this.ref]) {
                delete this.checkedDays[this.ref];
            } else {
                this.checkedDays[this.ref] = true;
            }
            this.dayClick(this.ref, this.dayDiv);
        }
    }
};
</script>