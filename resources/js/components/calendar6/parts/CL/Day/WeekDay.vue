<template>
    <div v-if="extended" class="day day--hover" ref="day" @click="click">
        <div class="day_inside">{{day}}</div>
    </div>
    <div v-else class="day" ref="day" @click="click">{{day}}</div>
</template>

<script>
import * as $ from 'jquery';

export default {
    name: "WeekDay",
    props: ["date", "extended", "dayClick", "checkedDays"],
    created() {
        this.dayDiv = "";
        this.time = new Date(this.date * 86400000);
        this.dayStr = this.time.toISOString().slice(0, 10);
        this.ref = "d" + this.dayStr;

        let dateArr = this.dayStr.split("-").map(item => {
            return parseInt(item);
        });
        this.day = dateArr[2];
        this.month = dateArr[1] - 1;
        this.year = dateArr[0];
        if (this.extended) {
            // bookings here
        }
    },
    mounted() {
        this.dayDiv = this.$refs.day;
        if (this.checkedDays[this.ref]) $(this.dayDiv).addClass("checked");
    },
    methods: {
        click() {
            $(this.dayDiv).toggleClass("checked");
            if (this.checkedDays[this.ref]) {
                delete this.checkedDays[this.ref];
            } else {
                this.checkedDays[this.ref] = true;
            }
            this.dayClick(this.ref, this.dayDiv);
        }
    }
};
</script>