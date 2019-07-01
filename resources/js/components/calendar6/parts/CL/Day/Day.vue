<template>
    <td class="slide_td" :class="{'checked': checked}">
        <input type="hidden" :value="monthN" />
        <div class="day" :class="[daysProps.dayClasses(), anotherDay]" ref="dayDiv" @click="click">
            <component :is="days[daysProps.dayType]" class="tab" :dayInfo="dayInfo"></component>
        </div>
    </td>
</template>

<script>
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
            anotherDay: "",
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
        monthN() {
            if (this.daysProps.dayType != "simple" && StoreCL.calendars[this.calendarId])
                if (
                    this.CL.monthN !=
                    this.dayInfo.year * 12 + this.dayInfo.month
                ) {
                    this.anotherDay = "day--another";
                }
            this.anotherDay = "";
            return StoreCL.calendars[this.calendarId].monthN;
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
            this.daysProps.checkedDays[this.ref]
                ? delete this.daysProps.checkedDays[this.ref]
                : (this.daysProps.checkedDays[this.ref] = true);
            this.daysProps.dayClick(this.ref, this.dayDiv);
        }
    }
};
</script>