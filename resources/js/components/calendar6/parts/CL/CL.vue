<template>
    <div class="CL">
        <div @click="changeSlide('next')">Next</div>
        <div @click="changeSlide('prev')">Prev</div>
        <div class="slides"></div>
        <input type="hidden" :value="stateObserver">
    </div>
</template>

<script>
import Vue from 'vue';
import Store from "../../services/Store";
import HelperCL from "./HelperCL";
import * as $ from "jquery";

export default {
    name: "CL",
    props: ["state", "extended"],
    data() {
        return {
			oldState: this.state,
            time: Store.settings.time,
            slides: [],
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
		
		this.setSlides();
	},
	mounted() {
		console.log(this.oldState);
	},
    computed: {
        stateObserver() {
			if(this.oldState != this.state) {
				this.oldState = this.state;
				this.slides = [];
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
            } else {
                this.monthN--;
                this.dayN -= 7;
                if (--this.slideIndex == 0) {
                    this.slideIndex = 1;
                    if (this.state == "month")
                        this.slides.unshift(HelperCL.getMonth(this.monthN - 1));
                    else this.slides.unshift(HelperCL.getWeek(this.dayN - 7));
                }
            }

            console.log(this.slides);
        }
    }
};
</script>