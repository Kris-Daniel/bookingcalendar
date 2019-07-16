<template>
    <div class="calendar-wrapper" :class="[`calendar-wrapper--${calendarType}`, `calendar-wrapper--${dayType}`]">
        <ChangeSlide @changeSlide="changeSlide"></ChangeSlide>
        <div class="calendar">
            <WeekDays></WeekDays>
            <div class="slider" ref="slider" :style="{height}" :class="[`calendar--${dayType}`]">
                <Slide
                    v-for="slide in slides"
                    :slideId="slide"
                    :key="slide"
                ></Slide>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import store from "Store/GlobalSTORE";
import WeekDays from "./WeekDays/WeekDays";
import Slide from "./Slide/Slide";
import ChangeSlide from "./ChangeSlide/ChangeSlide";

export default {
    name: "Calendar",
    components: {
        WeekDays,
        Slide,
        ChangeSlide
    },
    props: ["options"],
    store,
    data() {
        return {
            slides: []
        };
    },
    computed: {
        calendarType() {
            return this.exists(this.$store.state[this.options.name], () => {
                return this.$store.state[this.options.name].CalendarDATA.type
            });
        },
        dayType() {
            return this.exists(this.$store.state[this.options.name], () => {
                return this.$store.state[this.options.name].daysProps.dayType;
            });
        },
        height() {
            return this.CalendarDATA.height + 'px';
        },
    },
    watch: {
        calendarType() {
            this.setupSliderStart()
                    .setSlides();
        },
    },
    created() {
        this.customId = this.options.name;

        this.$store.dispatch("registerCalendarModule", this.options);

        let time = this.$store.state[this.customId].settings.time,
            timeStamp = time.getTime(),
            currentDay = Math.floor(timeStamp / 86400000),
            currentMonth = time.getMonth(),
            currentYear = time.getFullYear();

        Vue.set(this.$store.state[this.customId], "CalendarDATA", {
            time,
            timeStamp,
            currentDay,
            currentMonth,
            currentYear,
            slides: this.slides,
            type: "month",
            height: 0
        });

        this.CalendarDATA = this.$store.state[this.customId].CalendarDATA;
        this.daysProps = this.$store.state[this.customId].daysProps;

        this.setupSliderStart()
            .setSlides()
            .setResize();
    },
    mounted() {
        if (!this.slides.length) this.setSlides();
    },
    methods: {
        setupSliderStart() {
            this.slides.splice(0, 3);
            Vue.set(this.CalendarDATA, "dayN", this.CalendarDATA.currentDay);
            Vue.set(this.CalendarDATA, "monthN", this.CalendarDATA.currentYear * 12 + this.CalendarDATA.currentMonth);
            
            return this;
        },
        setSlides() {
            let step = this.CalendarDATA.type == "month" ? 1 : 7;
            let timeCount = this.CalendarDATA.type == "month" ? "monthN" : "dayN";
            for (let i = this.CalendarDATA[timeCount] - step; i <= this.CalendarDATA[timeCount] + step; i += step) {
                this.slides.push(i);
            }
            return this;
        },
        setResize() {
            if (this.daysProps.dayType != "simple") {
                let resize = () => {
                    let w = window.innerWidth;
                    if (w <= 800 && this.CalendarDATA.type == "month") {
                        this.CalendarDATA.type = "week";
                    } else if (w > 800 && this.CalendarDATA.type == "week") {
                        this.CalendarDATA.type = "month";
                    }
                };
                window.addEventListener("resize", resize);
                resize();
            }
        },
        changeSlide(side) {
            let slideId;
            let step = this.CalendarDATA.type == "month" ? 1 : 7;
            let timeCount = this.CalendarDATA.type == "month" ? "monthN" : "dayN";

            if (side == "next") {
                this.slides.splice(0, 1);

                this.CalendarDATA[timeCount] += step;
                slideId = this.CalendarDATA[timeCount] + step;

                this.$nextTick(() => {
                    this.slides.splice(2, 0, slideId);
                });
            } else {
                this.slides.splice(2, 1);

                this.CalendarDATA[timeCount] -= step;
                slideId = this.CalendarDATA[timeCount] - step;
                
                this.$nextTick(() => {
                    this.slides.splice(0, 0, slideId);
                });
            }
        },
    }
};
</script>