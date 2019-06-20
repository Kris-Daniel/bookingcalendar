<template>
    <div class="slide">
        <table class="slide_table">
            <tr
                class="slide_tr"
                v-for="(week, weekIndex) in weeksInMonth"
                :key="'week' + weekIndex"
            >
                <td class="slide_td" v-for="(day, dayIndex) in week" :key="'day' + dayIndex">
                    <Day :dayParams="dayParams" :currentMonth="currentMonth" :day="day"></Day>
                </td>
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