<template>
    <div class="calendar-wrapper" :data-id="params.name" :class="classCss">
        <ChangeSlide
            :type="type"
            :slides="slides"
            @changeSlide="changeSlide"
            :calendarId="params.name"
        ></ChangeSlide>
        <div class="calendar">
            <WeekDays v-if="type == 'month'" :calendarId="params.name"></WeekDays>
            <div class="slider" ref="slider" :style="{height}">
                <Slide
                    v-for="slide in slides"
                    :slideId="slide"
                    :calendarId="params.name"
                    :key="slide"
                ></Slide>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import * as $ from "jquery";

import CalendarSTORE from "./helpers/CalendarSTORE";
import CalendarHelper from "./helpers/CalendarHelper";

import ChangeSlide from "./ChangeSlide/ChangeSlide";
import WeekDays from "./WeekDays/WeekDays";
import Slide from "./Slide/Slide";

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
            oldType: "month",
            slides: []
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
            slides: this.slides,
            daysProps: this.params.daysProps,
            type: "month",
            height: 0
        });

        this.CalendarDATA = CalendarSTORE.calendars[this.params.name];
        this.oldType = this.CalendarDATA.type;
        this.setupSliderStart();
        this.setResize();
    },
    mounted() {
        if (!this.slides.length) this.setSlides();
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
        classCss() {
            return "calendar-state-" + this.oldType;
        },
        height() {
            return this.CalendarDATA.height + 'px';
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
                };
                $(window).on("resize", resize);
                resize();
            }
        },

        setupSliderStart() {
            this.slides.splice(0, 3);
            Vue.set(this.CalendarDATA, "dayN", this.CalendarDATA.currentDay);
            Vue.set(
                this.CalendarDATA,
                "monthN",
                this.CalendarDATA.currentYear * 12 +
                    this.CalendarDATA.currentMonth
            );
        },
        setSlides() {
            if (this.CalendarDATA.type == "month") {
                for (
                    let i = this.CalendarDATA.monthN - 1;
                    i <= this.CalendarDATA.monthN + 1;
                    i++
                ) {
                    this.slides.push(i);
                }
            } else {
                for (
                    let i = this.CalendarDATA.dayN - 7;
                    i <= this.CalendarDATA.dayN + 7;
                    i += 7
                ) {
                    this.slides.push(i);
                }
            }
            this.$nextTick(() => {
            });
        },
        changeSlide(side) {
            let slideId;
            if (side == "next") {
                this.slides.splice(0, 1);

                if (this.CalendarDATA.type == "month") {
                    this.CalendarDATA.monthN++;
                    slideId = this.CalendarDATA.monthN + 1;
                } else {
                    this.CalendarDATA.dayN += 7;
                    slideId = this.CalendarDATA.dayN + 7;
                }
                this.$nextTick(() => {
                    this.slides.splice(2, 0, slideId);
                });
            } else {
                this.slides.splice(2, 1);

                if (this.CalendarDATA.type == "month") {
                    this.CalendarDATA.monthN--;
                    slideId = this.CalendarDATA.monthN - 1;
                } else {
                    this.CalendarDATA.dayN -= 7;
                    slideId = this.CalendarDATA.dayN - 7;
                }
                this.$nextTick(() => {
                    this.slides.splice(0, 0, slideId);
                });
            }
        }
    }
};
</script>