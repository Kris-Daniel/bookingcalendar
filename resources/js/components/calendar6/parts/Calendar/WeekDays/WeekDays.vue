<template>
    <table class="weekdays-table" :class="cssClass" :data-monday-first="mondayFirst">
        <tr class="weekdays-table_tr">
            <td v-for="(day, index) in weekDays" :key="index" class="weekdays-table_td">{{day}}</td>
        </tr>
    </table>
</template>

<script>
import CalendarSTORE from "../helpers/CalendarSTORE";

export default {
    name: "WeekDays",
    props: ['calendarId'],
    computed: {
        mondayFirst() {
            this.weekDays = this.setWeekDays();
            return this.CalendarDATA.daysProps.settings.mondayFirst;
        }
    },
    created() {
        this.CalendarDATA = CalendarSTORE.calendars[this.calendarId];
        this.cssClass = "weekdays-table--" + this.CalendarDATA.daysProps.dayType;
        this.weekDays = this.setWeekDays();
    },
    methods: {
        setWeekDays() {
            let weekDays = [];
            CalendarSTORE.WEEK.forEach(item => {
                weekDays.push(item);
            });

            if (this.CalendarDATA.daysProps.settings.mondayFirst) {
                let Su = weekDays[0];
                weekDays.shift();
                weekDays.push(Su);
            }
            return weekDays;
        }
    }
};
</script>