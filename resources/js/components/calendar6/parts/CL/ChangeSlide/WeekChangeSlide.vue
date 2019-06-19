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

export default {
    name: "WeekChangeSlide",
    props: ["currentSlide"],
    data() {
        return {
            from: "",
            to: ""
        };
    },
    watch: {
        currentSlide() {
            this.setText();
        }
    },
    created() {
        this.setText();
    },
    methods: {
        changeSlide(side) {
            this.$emit("changeSlide", side);
        },
        setText() {
            if (this.currentSlide) {
                let dateFrom = new Date(this.currentSlide[0] * 86400000);
                let dateTo = new Date(
                    this.currentSlide[this.currentSlide.length - 1] * 86400000
                );
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