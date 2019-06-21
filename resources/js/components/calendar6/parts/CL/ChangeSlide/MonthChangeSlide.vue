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

export default {
    name: "MonthChangeSlide",
    props: ["currentMonth"],
    data() {
        return {
            month: "",
            year: ""
        };
    },
    watch: {
        currentMonth() {
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
            if (this.currentMonth) {
                this.year = Math.floor(this.currentMonth / 12);
                this.monthIndex = this.currentMonth - this.year * 12;
                this.month = Store.MONTHS[this.monthIndex];
            }
        }
    }
};
</script>