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
                dayClick(ref, daysProps, data) {
                    ToggledSidebarSTORE.render(ref, daysProps, data, 'mainCalendar');
                    // ToggledSidebarSTORE.showFlag = true;
                    // console.log(ref, dayDiv, "ref click here");
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