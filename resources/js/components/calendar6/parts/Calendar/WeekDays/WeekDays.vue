<template>
    <table class="weekdays-table" :data-monday-first="mondayFirst">
        <tr class="weekdays_tr">
            <td v-for="(day, index) in weekDays" :key="index" class="weekdays_td">{{day}}</td>
        </tr>
    </table>
</template>

<script>
import CalendarSTORE from "../helpers/CalendarSTORE";

export default {
    name: "WeekDays",
    computed: {
        mondayFirst() {
            this.weekDays = this.setWeekDays();
            return this.CalendarDATA.daysProps.settings.mondayFirst;
        }
    },
    created() {
        this.CalendarDATA = CalendarSTORE.calendars["mainCalendar"];
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