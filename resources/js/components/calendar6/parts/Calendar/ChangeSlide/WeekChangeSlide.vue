<template>
    <div class="change-slide center">
        <div class="mb10">{{from}} - {{to}}</div>
        <div @click="changeSlide('prev')" class="change-slide_prev dinl-top">Prev</div>
        <div class="dinl-top ph20"></div>
        <div @click="changeSlide('next')" class="change-slide_next dinl-top">Next</div>
    </div>
</template>
<script>
import CalendarSTORE from "../helpers/CalendarSTORE";
import ChangeSlideService from "./ChangeSlideService";
import CalendarHelper from "../helpers/CalendarHelper";

export default {
    name: "WeekChangeSlide",
    props: ["weeks", "calendarId"],
    data() {
        return {
            from: "",
            to: ""
        };
    },
    watch: {
        weeks() {
            this.setText();
        }
    },
    mounted() {
        this.setText();
    },
    methods: {
        changeSlide(side) {
            ChangeSlideService.click(this, side);
        },
        setText() {
            if (this.weeks[1]) {
                let CalendarDATA = CalendarSTORE.calendars["calendarId"];
                let daysInWeek = CalendarHelper.getWeek(
                    this.weeks[1],
                    CalendarDATA.daysProps.settings.mondayFirst
                );
                let dateFrom = new Date(daysInWeek[0] * 86400000);
                let dateTo = new Date(daysInWeek[6] * 86400000);
                this.from = this.getDayAndShortMonth(dateFrom);
                this.to = this.getDayAndShortMonth(dateTo);
            }
        },
        getDayAndShortMonth(date) {
            let d = date.getDate();
            let m = date.getMonth();
            let shortMonth = CalendarSTORE.MONTHS[m].slice(0, 3);
            return d + " " + shortMonth;
        }
    }
};
</script>