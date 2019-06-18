<template>
    <div class="CL">
        <WeekChangeSlide v-if="type == 'week'"></WeekChangeSlide>
        <MonthChangeSlide v-else @myclick="changeSlide"></MonthChangeSlide>
        <div class="slider" ref="slider"></div>
        <input type="hidden" :value="typeObserver">
    </div>
</template>

<script>

import Vue from "vue";
import Store from '../../services/Store';
import WeekChangeSlide from './ChangeSlide/WeekChangeSlide';
import MonthChangeSlide from './ChangeSlide/MonthChangeSlide';
import WeekSlide from './Slide/WeekSlide';
import MonthSlide from './Slide/MonthSlide';

// let SlideClass = Vue.extend(Slide);

export default {
    name: "CL",
    components: {
        WeekChangeSlide,
        MonthChangeSlide,
        WeekSlide,
        MonthSlide
        // Slide,
    },
    props: ["extended"],
    data() {
        return {
            type: 'month',
            time: Store.settings.time,
            slides: [],
            renderSlides: [],
            slideIndex: 1
        };
    },
    created() {
        this.timeStamp = this.time.getTime();
        this.currentDay = Math.floor(this.timeStamp / 86400000);
        this.currentMonth = this.time.getMonth();
        this.currentYear = this.time.getFullYear();
        this.dayN = this.currentDay;
        this.monthN = this.currentYear * 12 + this.currentMonth;
        setInterval(() => {
            this.type = 'week';
        }, 2000)
        console.log('created');
    },
    mounted() {
        // this.setSlides();
        console.log('mounted');
    },
    computed: {
        typeObserver() {
            console.log('type was changed');
            return this.type;
        }
    },
    methods: {
        setSlides() {
            if (this.type == "month") {
                for (let i = this.monthN - 1; i <= this.monthN + 1; i++)
                    this.slides.push(HelperCL.getMonth(i));
            } else {
                for (let i = this.dayN - 7; i <= this.dayN + 7; i += 7)
                    this.slides.push(HelperCL.getWeek(i));
            }

            for (let i = 0; i < 3; i++) {
                let SlideInstance = this.getSlide(i);
                this.$refs.slider.appendChild(SlideInstance.$el);
            }
            this.setHeight();
        },
        changeSlide(side) {
            console.log(side, 'side');
            return false;
            if (side == "next") {
                this.monthN++;
                this.dayN += 7;
                if (++this.slideIndex == this.slides.length - 1) {
                    if (this.type == "month")
                        this.slides.push(HelperCL.getMonth(this.monthN + 1));
                    else this.slides.push(HelperCL.getWeek(this.dayN + 7));
                }
                
                $(this.$refs.slider).children().first().remove();
                let SlideInstance = this.getSlide(this.slideIndex + 1);
                this.$refs.slider.appendChild(SlideInstance.$el);
            } else {
                this.monthN--;
                this.dayN -= 7;
                if (--this.slideIndex == 0) {
                    this.slideIndex = 1;
                    if (this.type == "month")
                        this.slides.unshift(HelperCL.getMonth(this.monthN - 1));
                    else this.slides.unshift(HelperCL.getWeek(this.dayN - 7));
                }
                $(this.$refs.slider).children().last().remove();
                let SlideInstance = this.getSlide(this.slideIndex - 1);
                this.$refs.slider.prepend(SlideInstance.$el);
            }
            this.setHeight();
            

            // console.log(this.slides);
            // console.log(this.renderSlides);
            console.log("========");
        },
        getSlide(i) {
            let SlideInstance = new SlideClass({
                propsData: {
                    slide: this.slides[i],
                    state: this.type
                }
            });
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