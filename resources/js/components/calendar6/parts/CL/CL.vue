<template>
    <div class="CL" :data-id="params.name" :class="classCss">
        <template v-if="type == 'week'">
            <WeekChangeSlide @changeSlide="changeSlide" :weeks="slides"></WeekChangeSlide>
        </template>
        <template v-else>
            <MonthChangeSlide @changeSlide="changeSlide" :months="slides"></MonthChangeSlide>
        </template>
        <div class="calendar-box">
            <WeekDays v-if="type == 'month'"></WeekDays>
            <div class="slider" ref="slider"></div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import * as $ from "jquery";

import StoreCL from "./helpers/StoreCL";
import Store from "../../services/Store";
import HelperCL from "./helpers/HelperCL";

import WeekChangeSlide from "./ChangeSlide/WeekChangeSlide";
import MonthChangeSlide from "./ChangeSlide/MonthChangeSlide";
import WeekDays from "./WeekDays/WeekDays";
import Slide from "./Slide/Slide";

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
            cl: undefined,
            oldType: "month"
        };
    },
    created() {
        let time = this.params.time;
        let timeStamp = time.getTime();
        let currentDay = Math.floor(timeStamp / 86400000);
        let currentMonth = time.getMonth();
        let currentYear = time.getFullYear();

        Vue.set(StoreCL.calendars, this.params.name, {
            time,
            timeStamp,
            currentDay,
            currentMonth,
            currentYear,
            slides: [],
            daysProps: this.params.daysProps,
            type: "month"
        });

        this.CL = StoreCL.calendars[this.params.name];
        this.oldType = this.CL.type;
        this.setupSliderStart();
        this.setResize();
    },
    mounted() {
        this.setSlides();
    },
    computed: {
        type() {
            if (this.oldType != this.CL.type) {
                this.oldType = this.CL.type;
                this.setupSliderStart();
                this.setSlides();
            }
            return this.CL.type;
        },
        slides() {
            return this.CL.slides;
        },
        classCss() {
            return 'CL-type-' + this.oldType;
        }
    },
    methods: {
        setResize() {
            if (this.CL.daysProps.dayType != "simple") {
                let resize = () => {
                    let w = $(window).width();
                    if (w <= 800 && this.CL.type == "month") {
                        // this.CL.dayN = HelperCL.getWeeksInMonth(this.CL.monthN)[0][0];
                        this.CL.type = "week";
                    } else if (w > 800 && this.CL.type == "week") {
                        // let dateDatN = new Date(this.CL.dayN * 86400000);
                        // this.CL.monthN = dateDatN.getFullYear() * 12 + dateDatN.getMonth();
                        this.CL.type = "month";
                    }
                    this.setHeight();
                };
                $(window).on("resize", resize);
                resize();
            }
        },

        setupSliderStart() {
            while (this.CL.slides.length > 0) this.CL.slides.pop();
            Vue.set(this.CL, "dayN", this.CL.currentDay);
            Vue.set(
                this.CL,
                "monthN",
                this.CL.currentYear * 12 + this.CL.currentMonth
            );
        },
        setSlides() {
            if (!this.$refs.slider) return false;
            this.$refs.slider.innerHTML = "";
            if (this.CL.type == "month") {
                for (let i = this.CL.monthN - 1; i <= this.CL.monthN + 1; i++) {
                    this.CL.slides.push(i);
                }
            } else {
                for (let i = this.CL.dayN - 7; i <= this.CL.dayN + 7; i += 7) {
                    this.CL.slides.push(i);
                }
            }

            for (let i = 0; i < 3; i++) {
                let SlideInstance = this.getSlide(this.CL.slides[i]);
                this.$refs.slider.appendChild(SlideInstance.$el);
            }
            this.setHeight();
        },
        changeSlide(side) {
            if (side == "next") {
                $(this.$refs.slider)
                    .children()
                    .first()
                    .remove();
                this.CL.slides.shift();

                if (this.CL.type == "month") {
                    this.CL.monthN++;
                    this.CL.slides.push(this.CL.monthN + 1);
                } else {
                    this.CL.dayN += 7;
                    this.CL.slides.push(this.CL.dayN + 7);
                }

                let SlideInstance = this.getSlide(this.CL.slides[2]);
                this.$refs.slider.appendChild(SlideInstance.$el);
            } else {
                $(this.$refs.slider)
                    .children()
                    .last()
                    .remove();
                this.CL.slides.pop();

                if (this.CL.type == "month") {
                    this.CL.monthN--;
                    this.CL.slides.unshift(this.CL.monthN - 1);
                } else {
                    this.CL.dayN -= 7;
                    this.CL.slides.unshift(this.CL.dayN - 7);
                }

                let SlideInstance = this.getSlide(this.CL.slides[0]);
                this.$refs.slider.prepend(SlideInstance.$el);
            }
            this.setHeight();
        },
        getSlide(i) {
            let data = {
                propsData: {
                    id: i,
                    calendarId: this.params.name
                }
            };
            let SlideInstance = new SlideClass(data);
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