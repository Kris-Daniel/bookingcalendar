<template>
    <table class="weekdays-table" :data-ms="mondayFirst">
        <tr class="weekdays_tr">
            <td v-for="(day, index) in weekDays" :key="index" class="weekdays_td">{{day}}</td>
        </tr>
    </table>
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