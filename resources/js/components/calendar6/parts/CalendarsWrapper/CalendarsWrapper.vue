<template>
    <div class="calendars-wrapper">
        <Calendar :params="mainCalendar"></Calendar>
    </div>
</template>

<script>
import Vue from 'vue';
import Calendar from "../Calendar/Calendar";
import CalendarClassDATA from '../../services/GetCalendar';
import ToggledSidebarSTORE from '../ToggledSidebar/helpers/ToggledSidebarSTORE';

Vue.component('Calendar', Calendar);
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
                multiselect: false,
                dayClick(commonDaysInfo, data) {
                    ToggledSidebarSTORE.renderParentView('mainCalendar', commonDaysInfo, data);
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