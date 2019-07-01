<template>
    <div class="CL" :data-id="params.name">
        <template v-if="type == 'week'">
            <WeekChangeSlide @changeSlide="changeSlide" :weeks="slides"></WeekChangeSlide>
        </template>
        <template v-else>
            <MonthChangeSlide @changeSlide="changeSlide" :months="slides"></MonthChangeSlide>
        </template>
        <WeekDays v-if="type == 'month'"></WeekDays>
        <div class="slider" ref="slider"></div>
    </div>
</template>

<script>
import StoreCL from "./helpers/StoreCL";
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
            cl: undefined,
            oldType: 'month'
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
        this.cl = StoreCL.calendars[this.params.name];
        this.oldType = this.cl.type;
        this.setResize();
        this.setupSliderStart();
    },
    mounted() {
        this.setSlides();
    },
    computed: {
        type() {
            if(this.oldType != this.cl.type) {
                this.oldType = this.cl.type;
                this.setupSliderStart();
                this.setSlides();
            }
            return this.cl.type;
        },
        slides() {
            return this.cl.slides;
        }
    },
    methods: {
        setResize() {
            if (this.cl.daysProps.dayType != "simple") {
                let resize = () => {
                    let w = $(window).width();
                    if (w < 800 && this.cl.type == "month")
                        this.cl.type = "week";
                    else if (w >= 800 && this.cl.type == "week")
                        this.cl.type = "month";
                    this.setHeight();
                };
                $(window).on("resize", resize);
                resize();
            }
        },

        setupSliderStart() {
            while (this.cl.slides.length > 0) this.cl.slides.pop();
            this.cl.dayN = this.cl.currentDay;
            this.cl.monthN = this.cl.currentYear * 12 + this.cl.currentMonth;
        },
        setSlides() {
            this.$refs.slider.innerHTML = "";
            if (this.cl.type == "month") {
                for (let i = this.cl.monthN - 1; i <= this.cl.monthN + 1; i++) {
                    this.cl.slides.push(i);
                }
            } else {
                for (let i = this.cl.dayN - 7; i <= this.cl.dayN + 7; i += 7) {
                    this.cl.slides.push(i);
                }
            }

            for (let i = 0; i < 3; i++) {
                let SlideInstance = this.getSlide(this.cl.slides[i]);
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
                this.cl.slides.shift();

                if (this.cl.type == "month") {
                    this.cl.monthN++;
                    this.cl.slides.push(this.cl.monthN + 1);
                } else {
                    this.cl.dayN += 7;
                    this.cl.slides.push(this.cl.dayN + 7);
                }

                let SlideInstance = this.getSlide(this.cl.slides[2]);
                this.$refs.slider.appendChild(SlideInstance.$el);
            } else {
                $(this.$refs.slider)
                    .children()
                    .last()
                    .remove();
                this.cl.slides.pop();

                if (this.cl.type == "month") {
                    // Vue.set(this.cl, 'monthN', this.cl.monthN - 1);
                    this.cl.monthN--;
                    this.cl.slides.unshift(this.cl.monthN - 1);
                } else {
                    this.cl.dayN -= 7;
                    this.cl.slides.unshift(this.cl.dayN - 7);
                }

                let SlideInstance = this.getSlide(this.cl.slides[0]);
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