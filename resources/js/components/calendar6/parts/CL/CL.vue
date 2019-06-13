<template>
    <div class="CL">
        <div @click="changeSlide('next')">Next</div>
        <div @click="changeSlide('prev')">Prev</div>
        <div class="slider" ref="slider">
            <!-- <template v-for="(slide, index) in renderSlides">
            <Slide
                :key="index"
                :slide="slide"
                :state="state"
            ></Slide>
            </template>-->
        </div>
        <input type="hidden" :value="stateObserver">
    </div>
</template>

<script>
import Vue from "vue";
import Store from "../../services/Store";
import HelperCL from "./HelperCL";
import * as $ from "jquery";

import Slide from "./Slide";

let SlideClass = Vue.extend(Slide);

export default {
    name: "CL",
    components: {
        Slide
    },
    props: ["state", "extended"],
    data() {
        return {
            oldState: this.state,
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
    },
    mounted() {
        this.setSlides();

        console.log(this.oldState, "mounted");
    },
    computed: {
        stateObserver() {
            if (this.oldState != this.state) {
                this.oldState = this.state;
                this.slides = [];
                Vue.set(this, "renderSlides", []);
                this.slideIndex = 1;
                this.dayN = this.currentDay;
                this.monthN = this.currentYear * 12 + this.currentMonth;
                this.setSlides();
            }
            return this.state;
        }
    },
    methods: {
        setSlides() {
            if (this.state == "month") {
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

            // for (let i = 0; i < 3; i++) this.renderSlides.push(this.slides[i]);
        },
        changeSlide(side) {
            if (side == "next") {
                this.monthN++;
                this.dayN += 7;
                if (++this.slideIndex == this.slides.length - 1) {
                    if (this.state == "month")
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
                    if (this.state == "month")
                        this.slides.unshift(HelperCL.getMonth(this.monthN - 1));
                    else this.slides.unshift(HelperCL.getWeek(this.dayN - 7));
                }
                $(this.$refs.slider).children().last().remove();
                let SlideInstance = this.getSlide(this.slideIndex - 1);
                this.$refs.slider.prepend(SlideInstance.$el);
            }

            console.log(this.slides);
            console.log(this.renderSlides);
            console.log("========");
        },
        getSlide(i) {
            let SlideInstance = new SlideClass({
                propsData: {
                    slide: this.slides[i],
                    state: this.state
                }
            });
            SlideInstance.$mount();
            return SlideInstance;
        }
    }
};
</script>