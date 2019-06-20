<template>
    <div class="CL">
        <template v-if="type == 'week'">
            <WeekChangeSlide @changeSlide="changeSlide" :currentSlide="currentSlide[0]"></WeekChangeSlide>
        </template>
        <template v-else>
            <MonthChangeSlide @changeSlide="changeSlide" :currentMonth="currentSlideMonth.n"></MonthChangeSlide>
        </template>
        <WeekDays v-if="type == 'month'"></WeekDays>
        <div class="slider" ref="slider"></div>
    </div>
</template>

<script>
import Vue from "vue";
import Store from "../../services/Store";
import HelperCL from "./helpers/HelperCL";
import * as $ from "jquery";

import WeekChangeSlide from "./ChangeSlide/WeekChangeSlide";
import MonthChangeSlide from "./ChangeSlide/MonthChangeSlide";
import Slide from "./Slide/Slide";

import WeekDays from "./WeekDays/WeekDays";

let SlideClass = Vue.extend(Slide);

export default {
    name: "CL",
    components: {
        WeekChangeSlide,
        MonthChangeSlide,
        WeekDays,
        Slide
    },
    props: ["params"],
    data() {
        return {
            type: "month",
            time: this.params.time,
            currentSlide: "",
            currentSlideMonth: {
                n: 0
            },
            checkedDays: this.params.checkedDays,
        };
    },
    created() {
        this.timeStamp = this.time.getTime();
        this.currentDay = Math.floor(this.timeStamp / 86400000);
        this.currentMonth = this.time.getMonth();
        this.currentYear = this.time.getFullYear();
        if (this.params.dayType != "simple") {
            $(window).on("resize", this.resize);
            this.resize();
        }
        this.setupSliderStart();
    },
    mounted() {
        this.setSlides();
    },
    watch: {
        type() {
            this.setupSliderStart();
            this.setSlides();
        }
    },
    methods: {
        resize() {
            this.setHeight();
            let w = $(window).width();
            if (w < 800 && this.type == "month") this.type = "week";
            else if (w >= 800 && this.type == "week") this.type = "month";
        },
        setupSliderStart() {
            this.slides = [];
            this.slideIndex = 1;
            this.dayN = this.currentDay;
            this.monthN = this.currentYear * 12 + this.currentMonth;
        },
        setSlides() {
            this.$refs.slider.innerHTML = "";
            if (this.type == "month") {
                for (let i = this.monthN - 1; i <= this.monthN + 1; i++) {
                    let weeksInMonth = HelperCL.getWeeksInMonth(i);
                    this.slides.push(weeksInMonth);
                }
            } else {
                for (let i = this.dayN - 7; i <= this.dayN + 7; i += 7)
                    this.slides.push([HelperCL.getWeek(i)]);
            }

            for (let i = 0; i < 3; i++) {
                let SlideInstance = this.getSlide(i);
                this.$refs.slider.appendChild(SlideInstance.$el);
            }
            this.currentSlide = this.slides[this.slideIndex];
            this.setHeight();
        },
        changeSlide(side) {
            if (side == "next") {
                this.type == "month" ? this.monthN++ : (this.dayN += 7);
                if (++this.slideIndex == this.slides.length - 1) {
                    if (this.type == "month") {
                        let weeksInMonth = HelperCL.getWeeksInMonth(
                            this.monthN + 1
                        );
                        this.slides.push(weeksInMonth);
                    } else {
                        this.slides.push([HelperCL.getWeek(this.dayN + 7)]);
                    }
                }

                $(this.$refs.slider)
                    .children()
                    .first()
                    .remove();
                let SlideInstance = this.getSlide(this.slideIndex + 1);
                this.$refs.slider.appendChild(SlideInstance.$el);
            } else {
                this.type == "month" ? this.monthN-- : (this.dayN -= 7);
                if (--this.slideIndex == 0) {
                    this.slideIndex = 1;
                    if (this.type == "month") {
                        let weeksInMonth = HelperCL.getWeeksInMonth(
                            this.monthN - 1
                        );
                        this.slides.unshift(weeksInMonth);
                    } else {
                        this.slides.unshift([HelperCL.getWeek(this.dayN - 7)]);
                    }
                }

                $(this.$refs.slider)
                    .children()
                    .last()
                    .remove();
                let SlideInstance = this.getSlide(this.slideIndex - 1);
                this.$refs.slider.prepend(SlideInstance.$el);
            }
            this.currentSlide = this.slides[this.slideIndex];
            this.setHeight();
        },
        getSlide(i) {
            this.currentSlideMonth.n = this.monthN;
            let SlideInstance;
            let data = {
                propsData: {
                    currentMonth: this.currentSlideMonth,
                    weeksInMonth: this.slides[i],
                    dayParams: {
                        dayType: this.params.dayType,
                        dayClick: this.params.dayClick,
                        checkedDays: this.checkedDays,
                        dayClasses: this.params.dayClasses
                    }
                }
            };
            SlideInstance = new SlideClass(data);
            SlideInstance.$mount();
            return SlideInstance;
        },
        setHeight() {
            let renderSlide = $(this.$refs.slider).children()[1];
            $(this.$refs.slider).height($(renderSlide).height() + 1);
        }
    }
};
</script>