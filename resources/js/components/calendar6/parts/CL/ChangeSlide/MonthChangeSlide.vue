<template>
    <div class="change-slide center">
        <div class="mb10">{{month}}</div>
        <div class="mb10">{{year}}</div>
        <div @click="changeSlide('prev')" class="change-slide_prev dinl-top">Prev</div>
        <div class="dinl-top ph20"></div>
        <div @click="changeSlide('next')" class="change-slide_next dinl-top">Next</div>
    </div>
</template>
<script>
import Store from "../../../services/Store";

export default {
    name: "MonthChangeSlide",
    props: ["currentSlide"],
    data() {
        return {
            month: "",
            year: ""
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
                this.month = Store.MONTHS[this.currentSlide.month];
                this.year = this.currentSlide.year;
            }
        }
    }
};
</script>