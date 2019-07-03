<template>
    <div class="RC">
        <Calendar :params="mainCalendar"></Calendar>
    </div>
</template>

<script>
import Vue from 'vue';
import Calendar from "../Calendar/Calendar";
import CalendarClassDATA from '../../services/GetCalendar';
let CalendarDATA = new CalendarClassDATA();

export default {
    name: "CalendarsWrapper",
    components: {
        Calendar
    },
    data() {
        return {};
    },
    created() {
        this.mainCalendar = {
            name: 'mainCalendar',
            time: new Date(),
            daysProps: {
                dayType: 'schedule',
                dayClick(ref, dayDiv) {
                    console.log(ref, dayDiv, "ref click here");
                },
                dayClasses(ref) {
                    return 'day-test';
                }
            }
        };
        Vue.set(this.mainCalendar.daysProps, 'checkedDays', {});
        Vue.set(this.mainCalendar.daysProps, 'schedule', CalendarDATA.schedule);
        Vue.set(this.mainCalendar.daysProps, 'settings', CalendarDATA.settings);
    }
};
</script>