<template>
    <div class="slide">
        <table class="slide_table">
            <tr
                class="slide_tr"
                v-for="(week, weekIndex) in weeksInMonth"
                :key="'week' + weekIndex"
            >
                <Day
                    v-for="(day, dayIndex) in week"
                    :key="'day' + dayIndex"
                    :dayParams="dayParams"
                    :currentMonth="currentMonth"
                    :day="day"
                ></Day>
            </tr>
        </table>
    </div>
</template>

<script>
import Day from "../Day/Day";
export default {
    name: "Slide",
    components: {
        Day
    },
    props: ["weeksInMonth", "dayParams", "currentMonth"],
    data() {
        return {};
    },
    created() {
        // console.log(this.dayParams, this.weeksInMonth);
    },
    methods: {}
};
</script>