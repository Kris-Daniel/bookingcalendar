<template>
    <div class="CL" :data-id="params.name" :class="classCss">
        <ChangeSlide :type="type" :slides="slides" @changeSlide="changeSlide" :calendarId="params.name"></ChangeSlide>
        <div class="calendar-box">
            <WeekDays v-if="type == 'month'"></WeekDays>
            <div class="slider" ref="slider"></div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import * as $ from "jquery";

import CalendarSTORE from "./helpers/CalendarSTORE";
import CalendarHelper from "./helpers/CalendarHelper";

import ChangeSlide from './ChangeSlide/ChangeSlide';
import WeekDays from "./WeekDays/WeekDays";
import Slide from "./Slide/Slide";

let SlideClass = Vue.extend(Slide);

export default {
    name: "Calendar",
    components: {
        ChangeSlide,
        WeekDays,
        Slide
    },
    props: ["params"],
    data() {
        return {
            CalendarDATA: undefined,
            oldType: "month"
        };
    },
    created() {
        let time = this.params.time;
        let timeStamp = time.getTime();
        let currentDay = Math.floor(timeStamp / 86400000);
        let currentMonth = time.getMonth();
        let currentYear = time.getFullYear();

        Vue.set(CalendarSTORE.calendars, this.params.name, {
            time,
            timeStamp,
            currentDay,
            currentMonth,
            currentYear,
            slides: [],
            daysProps: this.params.daysProps,
            type: "month"
        });

        this.CalendarDATA = CalendarSTORE.calendars[this.params.name];
        this.oldType = this.CalendarDATA.type;
        this.setupSliderStart();
        this.setResize();
    },
    mounted() {
        this.setSlides();
    },
    computed: {
        type() {
            if (this.oldType != this.CalendarDATA.type) {
                this.oldType = this.CalendarDATA.type;
                this.setupSliderStart();
                this.setSlides();
            }
            return this.CalendarDATA.type;
        },
        slides() {
            return this.CalendarDATA.slides;
        },
        classCss() {
            return 'calendar-state-' + this.oldType;
        }
    },
    methods: {
        setResize() {
            if (this.CalendarDATA.daysProps.dayType != "simple") {
                let resize = () => {
                    let w = $(window).width();
                    if (w <= 800 && this.CalendarDATA.type == "month") {
                        // this.CalendarDATA.dayN = CalendarHelper.getWeeksInMonth(this.CalendarDATA.monthN)[0][0];
                        this.CalendarDATA.type = "week";
                    } else if (w > 800 && this.CalendarDATA.type == "week") {
                        // let dateDatN = new Date(this.CalendarDATA.dayN * 86400000);
                        // this.CalendarDATA.monthN = dateDatN.getFullYear() * 12 + dateDatN.getMonth();
                        this.CalendarDATA.type = "month";
                    }
                    this.setHeight();
                };
                $(window).on("resize", resize);
                resize();
            }
        },

        setupSliderStart() {
            while (this.CalendarDATA.slides.length > 0) this.CalendarDATA.slides.pop();
            Vue.set(this.CalendarDATA, "dayN", this.CalendarDATA.currentDay);
            Vue.set(
                this.CalendarDATA,
                "monthN",
                this.CalendarDATA.currentYear * 12 + this.CalendarDATA.currentMonth
            );
        },
        setSlides() {
            if (!this.$refs.slider) return false;
            this.$refs.slider.innerHTML = "";
            if (this.CalendarDATA.type == "month") {
                for (let i = this.CalendarDATA.monthN - 1; i <= this.CalendarDATA.monthN + 1; i++) {
                    this.CalendarDATA.slides.push(i);
                }
            } else {
                for (let i = this.CalendarDATA.dayN - 7; i <= this.CalendarDATA.dayN + 7; i += 7) {
                    this.CalendarDATA.slides.push(i);
                }
            }

            for (let i = 0; i < 3; i++) {
                let SlideInstance = this.getSlide(this.CalendarDATA.slides[i]);
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
                this.CalendarDATA.slides.shift();

                if (this.CalendarDATA.type == "month") {
                    this.CalendarDATA.monthN++;
                    this.CalendarDATA.slides.push(this.CalendarDATA.monthN + 1);
                } else {
                    this.CalendarDATA.dayN += 7;
                    this.CalendarDATA.slides.push(this.CalendarDATA.dayN + 7);
                }

                let SlideInstance = this.getSlide(this.CalendarDATA.slides[2]);
                this.$refs.slider.appendChild(SlideInstance.$el);
            } else {
                $(this.$refs.slider)
                    .children()
                    .last()
                    .remove();
                this.CalendarDATA.slides.pop();

                if (this.CalendarDATA.type == "month") {
                    this.CalendarDATA.monthN--;
                    this.CalendarDATA.slides.unshift(this.CalendarDATA.monthN - 1);
                } else {
                    this.CalendarDATA.dayN -= 7;
                    this.CalendarDATA.slides.unshift(this.CalendarDATA.dayN - 7);
                }

                let SlideInstance = this.getSlide(this.CalendarDATA.slides[0]);
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