<template>
    <div class="Calendar">
        <WeekDays></WeekDays>
    </div>
</template>

<script>
import store from "Store/GlobalSTORE";
import WeekDays from "./WeekDays/WeekDays";

export default {
    name: "Calendar",
    components: {
        WeekDays
    },
    props: ["options"],
    store,
    computed: {
        calendarName() {
            return this.$store.state[this.options.name]
                ? this.$store.state[this.options.name].name
                : null;
        }
    },
    watch: {
        calendarName() {
            console.log(this.$store.state, "name changed");
        }
    },
    created() {
        this.customId = this.options.name;
        this.$store.dispatch("registerCalendarModule", this.options);

        setTimeout(() => {
            this.$store.commit("mainCalendar/inc");
        }, 500);
    }
};
</script>