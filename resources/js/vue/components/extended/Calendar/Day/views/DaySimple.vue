<template>
    <div class="day_inside day--simple" @click="click">
        <div class="day_num">{{dayInfo.day}}</div>
    </div>
</template>

<script>
export default {
    name: "DaySimple",
    props: ["dayInfo", "calendarId"],
    computed: {},
    created() {},
    methods: {
        click() {
            let data = {
                dayInfo: this.dayInfo
            };
            this.$emit('sendData', data);
        }
    }
};
</script>