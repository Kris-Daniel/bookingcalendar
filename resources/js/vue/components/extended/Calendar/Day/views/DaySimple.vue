<template>
    <div class="day_inside day--simple">
        <div class="day--circle" @click="click">
            <div class="day_a-center">{{dayInfo.day}}</div>
        </div>
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