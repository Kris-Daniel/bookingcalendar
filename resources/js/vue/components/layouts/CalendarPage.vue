<template>
    <div class="CC">
        <div class="calendar-page">
            <Calendar :options="ScheduleCalendarData"></Calendar>
            <ToggledSidebar :options="ToggledSidebarData"></ToggledSidebar>
        </div>
    </div>
</template>

<script>
import CalendarHttp from "VueServices/http/CalendarHttp";
import store from "VueStore/GlobalSTORE";

export default {
    name: "CalendarPage",
    store,
    created() {
        this.ScheduleCalendarData = {
            name: "mainCalendar",
            settings: CalendarHttp.getSettings(),
            schedule: CalendarHttp.getSchedule(),
            checkedDays: {},
            defaultDays: {},
            daysProps: {
                dayType: "schedule",
                dayClick: (data) => {
                    let dayInfo = JSON.parse(JSON.stringify(data.dayInfo));
                    this.$store.commit("mainToggledSidebar/setDayInfo", dayInfo);
                    this.$store.commit("mainToggledSidebar/setCalendarStoreRef", "mainCalendar");
                    this.$store.commit("mainToggledSidebar/showParentView", data.component);
                    console.log(this.$store.state.mainCalendar, "calendarStore");
                    console.log(this.$store.state.mainToggledSidebar, "ToggledSidebarStore");
                },
                dayClasses(ref) {
                    return "";
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