<template>
    <div class="special-days">
        <Calendar :params="simpleCalendar"></Calendar>
    </div>
</template>

<script>
import Vue from 'vue';
import CalendarClassDATA from '../../../services/GetCalendar';
let CalendarDATA = new CalendarClassDATA();

export default {
    name: "SpecialDays",
    created() {
        this.simpleCalendar = {
            name: 'simpleCalendar',
            time: new Date(),
            daysProps: {
                dayType: 'simple',
                multiselect: false,
                dayClick(commonDaysInfo, data) {
                    console.log(commonDaysInfo, data, 'simple')
                },
                dayClasses(ref) {
                    return 'day-ssimple';
                }
            }
        };
        Vue.set(this.simpleCalendar.daysProps, 'checkedDays', {});
        Vue.set(this.simpleCalendar.daysProps, 'schedule', CalendarDATA.schedule);
        Vue.set(this.simpleCalendar.daysProps, 'settings', CalendarDATA.settings);
    }
}
</script>