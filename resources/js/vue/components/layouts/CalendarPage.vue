<template>
    <div class="CC">
        <div class="calendar-page">
            <Calendar :options="ScheduleCalendarData"></Calendar>
            <ToggledSidebar :options="ToggledSidebarData"></ToggledSidebar>
        </div>
    </div>
</template>

<script>
import CalendarHttp from "Services/http/CalendarHttp";

export default {
    name: "CalendarPage",
    created() {
        this.ScheduleCalendarData = {
            name: "mainCalendar",
            settings: CalendarHttp.getSettings(),
            schedule: CalendarHttp.getSchedule(),
            checkedDays: {},
            daysProps: {
                dayType: "schedule",
                dayClick(data) {
                    console.log(data, "day click");
                    // ToggledSidebarSTORE.renderParentView('mainCalendar', commonDaysInfo, data);
                },
                dayClasses(ref) {
                    return "day-test";
                }
            }
        };
        this.ScheduleCalendarData.settings.multiselect = false;

        this.ToggledSidebarData = {
            name: "mainToggledSidebar",
            views: {
                timeSetting: {
                    component: "TimeSetting",
                    children: {
                        MultipleDaysChoser: {
                            component: "MultipleDaysChoser",
                            active: false
                        }
                    },
                    active: false
                },
                bookings: {
                    component: "bookings",
                    active: false
                }
            }
        };
    }
};
</script>