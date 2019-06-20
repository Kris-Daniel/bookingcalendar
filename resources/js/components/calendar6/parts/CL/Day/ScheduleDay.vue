<template>
    <div class="day_inside schedule-day">
        {{dayInfo.day}}
    </div>
</template>

<script>
export default {
    name: "ScheduleDay",
    props: ["dayInfo"],
    created() {
        // console.log(this.dayInfo, 'schedule Day')
    }
};
</script>