<template>
    <div>
        <template v-if="type == 'week'">
            <WeekChangeSlide @changeSlide="changeSlide" :weeks="slides" :calendarId="calendarId"></WeekChangeSlide>
        </template>
        <template v-else>
            <MonthChangeSlide @changeSlide="changeSlide" :months="slides"></MonthChangeSlide>
        </template>
    </div>
</template>

<script>
import WeekChangeSlide from "./views/WeekChangeSlide";
import MonthChangeSlide from "./views/MonthChangeSlide";

export default {
    name: "changeSlide",
    components: {
        WeekChangeSlide,
        MonthChangeSlide
    },
    props: ["type", "slides", "calendarId"],
    methods: {
        changeSlide(side) {
            this.$emit("changeSlide", side);
        }
    }
};
</script>