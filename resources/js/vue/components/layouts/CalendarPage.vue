<template>
    <div class="calendar-page">
        <Calendar :options="ScheduleCalendarData"></Calendar>
    </div>
</template>

<script>
import CalendarHttp from 'Services/http/CalendarHttp';

export default {
    name: "CalendarPage",
    created() {
        this.ScheduleCalendarData = {
            name: "mainCalendar",
            settings: CalendarHttp.getSettings(),
            schedule: CalendarHttp.getSchedule(),
            checkedDays: {},
            daysProps: {
                dayType: 'schedule',
                multiselect: false,
                dayClick(commonDaysInfo, data) {
                    // ToggledSidebarSTORE.renderParentView('mainCalendar', commonDaysInfo, data);
                },
                dayClasses(ref) {
                    return 'day-test';
                }
            }
        };
    }
}
</script>