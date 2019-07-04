<template>
    <div class="change-slide-wrapper">
        <div class="change-slide">
            <div class="change-slide_month">{{month}}</div>
            <div class="change-slide_year">{{year}}</div>
            <div @click="changeSlide('prev')" class="change-slide_btn change-slide_btn--prev">
                <AngleLeft></AngleLeft>
            </div>
            <div @click="changeSlide('next')" class="change-slide_btn change-slide_btn--next">
                <AngleRight></AngleRight>
            </div>
        </div>
    </div>
</template>
<script>
import CalendarSTORE from '../../helpers/CalendarSTORE';
import ChangeSlideService from "./../ChangeSlideService";

import AngleLeft from '../../../../../../svg/angle-left';
import AngleRight from '../../../../../../svg/angle-right';

export default {
    name: "MonthChangeSlide",
    props: ["months"],
    components: {
        AngleLeft,
        AngleRight
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
                this.month = CalendarSTORE.MONTHS[this.monthIndex];
            }
        }
    }
};
</script>