<template>
    <div class="change-slide center">
        <div class="mb10">{{from}} - {{to}}</div>
        <div @click="changeSlide('prev')" class="change-slide_prev dinl-top">Prev</div>
        <div class="dinl-top ph20"></div>
        <div @click="changeSlide('next')" class="change-slide_next dinl-top">Next</div>
    </div>
</template>
<script>
import Store from "../../../services/Store";
import ChangeSlideService from "./ChangeSlideService";
import HelperCL from '../helpers/HelperCL';

export default {
    name: "WeekChangeSlide",
    props: ["weeks"],
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
                let daysInWeek = HelperCL.getWeek(this.weeks[1]);
                let dateFrom = new Date(daysInWeek[0] * 86400000);
                let dateTo = new Date(daysInWeek[6] * 86400000);
                this.from = this.getDayAndShortMonth(dateFrom);
                this.to = this.getDayAndShortMonth(dateTo);
            }
        },
        getDayAndShortMonth(date) {
            let d = date.getDate();
            let m = date.getMonth();
            let shortMonth = Store.MONTHS[m].slice(0, 3);
            return d + " " + shortMonth;
        }
    }
};
</script>