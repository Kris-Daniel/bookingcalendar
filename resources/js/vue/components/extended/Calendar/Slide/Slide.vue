<template>
    <div class="slide" ref="slide">
        <table class="slide_table">
            <tr
                class="slide_table_tr"
                v-for="(week, weekIndex) in weeksInMonth"
                :key="'week' + weekIndex"
            >
                <Day
                    v-for="(day, dayIndex) in week"
                    :key="'day' + dayIndex"
                    :day="day"
                    :slideId="slideId"
                ></Day>
            </tr>
        </table>
    </div>
</template>

<script>

import FindParentMixin from "Mixins/FindParentMixin";
import DateService from "Services/date/DateService";
import Day from 'Calendar/Day/Day';

export default {
    name: "Slide",
    components: {
        Day
    },
    mixins: [FindParentMixin],
    props: ["slideId"],
    data() {
        return {
            store: "",
            weeksInMonth: undefined
        };
    },
    computed: {
        monthN() {
            return this.exists(this.store, () => {
                return this.store.CalendarDATA.monthN;
            });
        },
        mondayFirst() {
            return this.exists(this.store, () => {
                return this.store.settings.mondayFirst;
            });
        }
    },
    watch: {
        monthN() {
            this.setHeight();
        },
        mondayFirst() {
            this.setWeeksInMonth();
        }
    },
    mounted() {
        this.setHeight();
    },
    created() {
        this.setWeeksInMonth();
    },
    methods: {
        setHeight() {
            if(this.$refs.slide && this.slideId == this.store.CalendarDATA.monthN) {
                this.store.CalendarDATA.height = this.$refs.slide.offsetHeight;
            }
        },
        setWeeksInMonth() {
            this.weeksInMonth =
                this.store.CalendarDATA.type == "month"
                    ? DateService.getWeeksInMonth(this.slideId, this.mondayFirst)
                    : [DateService.getWeek(this.slideId, this.mondayFirst)];
        }
    }
};
</script>