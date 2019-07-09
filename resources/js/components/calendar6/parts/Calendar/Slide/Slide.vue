<template>
    <div class="slide" ref="slide" :data-month="monthN">
        <input type="hidden" ref="slide" />
        <table class="slide_table">
            <tr
                class="slide_table_tr"
                v-for="(week, weekIndex) in weeksInMonth"
                :key="'week' + weekIndex"
            >
                <Day
                    v-for="(day, dayIndex) in week"
                    :key="'day' + dayIndex"
                    :calendarId="calendarId"
                    :day="day"
                    :slideId="slideId"
                ></Day>
            </tr>
        </table>
    </div>
</template>

<script>
import Vue from 'vue';
import * as $ from 'jquery';

import Day from "Calendar/Day/Day";
import CalendarHelper from "Calendar/helpers/CalendarHelper";
import CalendarSTORE from 'CalendarSTORE';

export default {
    name: "Slide",
    components: {
        Day
    },
    props: ["slideId", "calendarId"],
    data() {
        return {
            weeksInMonth: undefined
        };
    },
    computed: {
        monthN() {
            this.setHeight();
            return this.CalendarDATA.monthN;
        }
    },
    mounted() {
        this.setHeight();
    },
    created() {
        this.CalendarDATA = CalendarSTORE.calendars[this.calendarId];
        this.weeksInMonth =
            this.CalendarDATA.type == "month"
                ? CalendarHelper.getWeeksInMonth(this.slideId, this.CalendarDATA.daysProps.settings.mondayFirst)
                : [CalendarHelper.getWeek(this.slideId, this.CalendarDATA.daysProps.settings.mondayFirst)];
        
    },
    methods: {
        setHeight() {
            if(this.$refs.slide && this.slideId == this.CalendarDATA.monthN) {
                console.log(this.$refs.slide.querySelector('.day').offsetHeight);
                this.CalendarDATA.height = this.$refs.slide.offsetHeight;
            }
        }
    }
};
</script>