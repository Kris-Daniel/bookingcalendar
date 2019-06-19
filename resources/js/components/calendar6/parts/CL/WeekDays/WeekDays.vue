<template>
    <div class="weekdays">
        <div v-for="(day, index) in weekDays" :key="index" class="weekday">{{day}}</div>
        <input type="hidden" :value="mondayFirst">
    </div>
</template>

<script>
import Store from "../../../services/Store";
export default {
    name: "WeekDays",
    computed: {
        mondayFirst() {
            this.weekDays = this.setWeekDays();
            return Store.settings.mondayFirst;
        }
    },
    created() {
        this.weekDays = this.setWeekDays();
    },
    methods: {
        setWeekDays() {
            let weekDays = [];
            Store.WEEK.forEach(item => {
                weekDays.push(item);
            });
            if (Store.settings.mondayFirst) {
                let Su = weekDays[0];
                weekDays.shift();
                weekDays.push(Su);
            }
            return weekDays;
        }
    }
};
</script>