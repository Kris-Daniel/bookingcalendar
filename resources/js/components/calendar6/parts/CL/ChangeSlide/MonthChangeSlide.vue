<template>
    <div class="change-slide center">
        <div class="mb10">{{month}}</div>
        <div class="mb10">{{year}}</div>
        <div @click="changeSlide('prev')" class="change-slide_btn change-slide_btn--prev">Prev</div>
        <div class="dinl-top ph20"></div>
        <div @click="changeSlide('next')" class="change-slide_btn change-slide_btn--next">Next</div>
    </div>
</template>
<script>
import Store from "../../../services/Store";
import ChangeSlideService from './ChangeSlideService';

export default {
    name: "MonthChangeSlide",
    props: ["months"],
    data() {
        return {
            month: "",
            year: ""
        };
    },
    watch: {
        months() {
            this.setText();
        }
    },
    created() {
        this.setText();
    },
    methods: {
        changeSlide(side) {
            ChangeSlideService.click(this, side);
        },
        setText() {
            if (this.months) {
                this.year = Math.floor(this.months[1] / 12);
                this.monthIndex = this.months[1] - this.year * 12;
                this.month = Store.MONTHS[this.monthIndex];
            }
        }
    }
};
</script>