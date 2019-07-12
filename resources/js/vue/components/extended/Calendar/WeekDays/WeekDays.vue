<template>
    <table class="weekdays-table" :class="tableCssClass">
        <tr class="weekdays-table_tr">
            <td v-for="(day, index) in weekDays" :key="index" class="weekdays-table_td">{{day}}</td>
        </tr>
    </table>
</template>

<script>
import CalendarMixin from "Mixins/CalendarMixin";

export default {
    name: "WeekDays",
    mixins: [CalendarMixin],
    computed: {
        mondayFirst() {
            return this.exists(this.store, () => {
                return this.store.settings.mondayFirst;
            });
        },
        tableCssClass() {
            return "weekdays-table--" + this.store.daysProps.dayType;
        }
    },
    watch: {
        mondayFirst() {
            this.weekDays = this.getWeekDays();
        }
    },
    created() {
        this.weekDays = this.getWeekDays();
    },
    methods: {}
};
</script>