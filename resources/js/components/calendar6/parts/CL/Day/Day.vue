<template>
    <td class="slide_td" :class="{'checked': checked}">
        <div class="day" :class="[dayParams.dayClasses(), anotherDay]" ref="dayDiv" @click="click">
            <component :is="days[dayParams.dayType]" class="tab" :dayInfo="dayInfo"></component>
        </div>
    </td>
</template>

<script>
import HelperCL from "../helpers/HelperCL";
import Store from "../../../services/Store";
import ScheduleDay from "./ScheduleDay";
import SimpleDay from "./SimpleDay";

export default {
    name: "Day",
    props: ["day", "dayParams", "currentMonth"],
    components: {
        ScheduleDay,
        SimpleDay
    },
    data() {
        return {
            days: {
                schedule: "ScheduleDay",
                simple: "SimpleDay"
            },
            checked: false
        };
    },
    computed: {
        // changeSlideObserver
        anotherDay() {
            this.checked = this.dayParams.checkedDays[this.ref] ? true : false;
            if (this.dayParams.dayType != "simple")
                if (
                    this.currentMonth.n !=
                    this.dayInfo.year * 12 + this.dayInfo.month
                )
                    return "day--another";
            return "";
        }
    },
    created() {
        this.dayDiv = "";
        this.time = new Date(this.day * 86400000);
        this.dayStr = this.time.toISOString().slice(0, 10);
        this.ref = "d" + this.dayStr;

        let dateArr = this.dayStr.split("-").map(item => {
            return parseInt(item);
        });
        this.dayInfo = {
            ref: this.ref,
            day: dateArr[2],
            month: dateArr[1] - 1,
            year: dateArr[0],
            weekDay: Store.WEEK[this.time.getDay()]
        };
    },
    mounted() {
        this.dayDiv = this.$refs.dayDiv;
    },
    methods: {
        click() {
            this.checked = !this.checked;
            this.dayParams.checkedDays[this.ref]
                ? delete this.dayParams.checkedDays[this.ref]
                : (this.dayParams.checkedDays[this.ref] = true);
            this.dayParams.dayClick(this.ref, this.dayDiv);
        }
    }
};
</script>