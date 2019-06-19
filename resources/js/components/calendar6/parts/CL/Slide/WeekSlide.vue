<template>
    <div class="slide">
        <WeekDay
            v-for="n in slide"
            :date="n"
            :key="n"
            :extended="extended"
            :dayClick="dayClick"
            :checkedDays="checkedDays"
        ></WeekDay>
    </div>
</template>

<script>
import WeekDay from "../Day/WeekDay";
export default {
    name: "WeekSlide",
    components: {
        WeekDay
    },
    props: ["slide", "extended", "dayClick", "checkedDays"]
};
</script>