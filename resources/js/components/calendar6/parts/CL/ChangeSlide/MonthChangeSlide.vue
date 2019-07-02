<template>
    <div class="change-slide-wrapper">
        <div class="change-slide">
            <div class="change-slide_month">{{month}}</div>
            <div class="change-slide_year">{{year}}</div>
            <div @click="changeSlide('prev')" class="change-slide_btn change-slide_btn--prev">
                <ArrowLeft></ArrowLeft>
            </div>
            <div @click="changeSlide('next')" class="change-slide_btn change-slide_btn--next">
                <ArrowRight></ArrowRight>
            </div>
        </div>
    </div>
</template>
<script>
import Store from "../../../services/Store";
import ChangeSlideService from "./ChangeSlideService";

import ArrowLeft from '../../../../../svg/arrow-left';
import ArrowRight from '../../../../../svg/arrow-right';

export default {
    name: "MonthChangeSlide",
    props: ["months"],
    components: {
        ArrowLeft,
        ArrowRight
    },
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