<template>
    <div class="slide">
        <input type="hidden" ref="slide">
        <table class="slide_table">
            <tr
                class="slide_tr"
                v-for="(week, weekIndex) in weeksInMonth"
                :key="'week' + weekIndex"
            >
                <Day
                    v-for="(day, dayIndex) in week"
                    :key="'day' + dayIndex"
                    :calendarId="calendarId"
                    :day="day"
                ></Day>
            </tr>
        </table>
    </div>
</template>

<script>
import Day from "../Day/Day";
import CalendarHelper from "../helpers/CalendarHelper";
import CalendarSTORE from '../helpers/CalendarSTORE';

export default {
    name: "Slide",
    components: {
        Day
    },
    props: ["id", "calendarId"],
    data() {
        return {
            weeksInMonth: undefined
        };
    },
    created() {
        let CalendarDATA = CalendarSTORE.calendars[this.calendarId];
        this.weeksInMonth =
            CalendarDATA.type == "month"
                ? CalendarHelper.getWeeksInMonth(this.id, CalendarDATA.daysProps.settings.mondayFirst)
                : [CalendarHelper.getWeek(this.id, CalendarDATA.daysProps.settings.mondayFirst)];
        
    },
    methods: {}
};
</script>