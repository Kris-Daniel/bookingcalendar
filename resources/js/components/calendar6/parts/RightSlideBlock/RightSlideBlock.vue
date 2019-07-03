<template>
    <div class="right-slide-wrapper" :class="{active: showFlag}">
        <div class="right-slide">Test</div>
        <div class="right-slide_overlay" @click="hide()"></div>
    </div>
</template>

<script>
import Vue from "vue";
import RightSlideSTORE from "./helpers/RightSlideSTORE";
import CalendarSTORE from "../Calendar/helpers/CalendarSTORE";

export default {
    name: "RightSlideBlock",
    data() {
        return {};
    },
    computed: {
        showFlag() {
            return RightSlideSTORE.showFlag;
        }
    },
    created() {},
    methods: {
        show() {},
        hide() {
            RightSlideSTORE.showFlag = false;
            Vue.set(
                CalendarSTORE.calendars[RightSlideSTORE.calendarId].daysProps,
                "checkedDays",
                {}
            );
            RightSlideSTORE.calendarId = null;
        }
    }
};
</script>