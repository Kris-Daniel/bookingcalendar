<template>
    <td class="slide_td" :class="{'checked': checked}">
        <div class="day" :class="[daysProps.dayClasses(), anotherDay]" ref="dayDiv" @click="click">
            <component :is="days[daysProps.dayType]" :dayInfo="dayInfo" :calendarId="calendarId"></component>
        </div>
    </td>
</template>

<script>
import Vue from "vue";
import HelperCL from "../helpers/HelperCL";
import StoreCL from "../helpers/StoreCL";
import Store from "../../../services/Store";
import ScheduleDay from "./ScheduleDay";
import SimpleDay from "./SimpleDay";

let Cl = "test";

export default {
    name: "Day",
    props: ["day", "calendarId"],
    components: {
        ScheduleDay,
        SimpleDay
    },
    data() {
        return {
            oldMonthN: 0,
            days: {
                schedule: "ScheduleDay",
                simple: "SimpleDay"
            }
        };
    },
    computed: {
        checked() {
            return this.daysProps.checkedDays[this.ref] ? true : false;
        },
        anotherDay() {
            if (this.oldMonthN != StoreCL.calendars[this.calendarId].monthN) {
                this.oldMonthN = StoreCL.calendars[this.calendarId].monthN;
                let monthCount = this.dayInfo.year * 12 + this.dayInfo.month;

                // destroy from memory
                if (
                    monthCount < this.oldMonthN - 2 ||
                    monthCount > this.oldMonthN + 2
                ) {
                    this.$destroy();
                    return false;
                }
                if(this.CL.type != 'month') return "";

                if (this.daysProps.dayType != "simple") {
                    if (this.oldMonthN != monthCount) return "day--another";
                }
                return "";
            }
        }
    },
    created() {
        this.CL = StoreCL.calendars[this.calendarId];
        this.daysProps = this.CL.daysProps;
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
            if (!this.daysProps.checkedDays[this.ref]) {
                Vue.set(this.daysProps, 'checkedDays', {});
                Vue.set(this.daysProps.checkedDays, this.ref, true);
            }
            else Vue.delete(this.daysProps.checkedDays, this.ref);
            this.daysProps.dayClick(this.ref, this.dayDiv);
        }
    }
};
</script>