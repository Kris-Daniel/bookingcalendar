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
import HelperCL from "../helpers/HelperCL";
import StoreCL from '../helpers/StoreCL';

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
        let CL = StoreCL.calendars[this.calendarId];
        this.weeksInMonth =
            CL.type == "month"
                ? HelperCL.getWeeksInMonth(this.id)
                : [HelperCL.getWeek(this.id)];
        
    },
    methods: {}
};
</script>