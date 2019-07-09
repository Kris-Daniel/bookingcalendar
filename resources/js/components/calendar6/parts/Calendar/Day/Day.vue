<template>
    <td class="slide_table_td" :class="{'checked': checked}">
        <div class="day" :class="[daysProps.dayClasses(), anotherDay(), defaultDay()]" ref="dayDiv">
            <component
                :is="days[daysProps.dayType]"
                :dayInfo="dayInfo"
                :calendarId="calendarId"
                @sendData="click"
            ></component>
        </div>
    </td>
</template>

<script>
import Vue from "vue";
import CalendarHelper from "Calendar/helpers/CalendarHelper";
import CalendarSTORE from "CalendarSTORE";
import ToggledSidebarSTORE from "ToggledSidebarSTORE";

import ScheduleDay from "./views/ScheduleDay";
import SimpleDay from "./views/SimpleDay";

export default {
    name: "Day",
    props: ["day", "calendarId", "slideId"],
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
        }
    },
    created() {
        this.CalendarDATA = CalendarSTORE.calendars[this.calendarId];
        this.daysProps = this.CalendarDATA.daysProps;
        this.dayDiv = "";
        this.time = new Date(this.day * 86400000);
        this.dayStr = this.time.toISOString().slice(0, 10);
        this.ref = "d" + this.dayStr;

        let dateArr = this.dayStr.split("-").map(item => {
            return parseInt(item);
        });

        let weekDay = this.time.getDay();

        this.dayInfo = {
            ref: this.ref,
            day: dateArr[2],
            month: dateArr[1] - 1,
            year: dateArr[0],
            weekDay,
            weekDayRef: CalendarSTORE.WEEK[weekDay],
            monthName: CalendarSTORE.MONTHS[dateArr[1] - 1]
        };
    },
    mounted() {
        this.dayDiv = this.$refs.dayDiv;
    },
    methods: {
        click(data) {
            if(ToggledSidebarSTORE.editableDay == this.ref) return false;
            if (!this.daysProps.checkedDays[this.ref]) {
                if (!this.daysProps.multiselect)
                    Vue.set(this.daysProps, "checkedDays", {});
                Vue.set(this.daysProps.checkedDays, this.ref, true);
            } else Vue.delete(this.daysProps.checkedDays, this.ref);

            let commonDaysInfo = {
                checkedDays: this.daysProps.checkedDays,
                settings: this.daysProps.settings
            };
            data.ref = this.ref;
            this.daysProps.dayClick(commonDaysInfo, data);
        },
        anotherDay() {
            let monthCount = this.dayInfo.year * 12 + this.dayInfo.month;
            if (this.slideId != monthCount) return "day--another-month";
            return "";
        },
        defaultDay() {
            if(ToggledSidebarSTORE.editableDay == this.ref) return "default";
            return "";
        }
    }
};
</script>