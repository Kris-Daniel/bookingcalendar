<template>
    <div class="time-setting">
        <RetractableBlock :views="storeLink.children"></RetractableBlock>
        <div class="time-setting_close" @click="closeView()">
            <ArrowRight></ArrowRight>
        </div>
        <div class="title center">
            Time Settings
        </div>
        <div class="mb30"></div>
        <div class="mb10">
            <div class="interval-grid">From</div>
            <div class="interval-grid interval-grid--mid"></div>
            <div class="interval-grid">To</div>
        </div>
        <div class="intervals mb20">
            <div
                class="interval"
                v-for="(interval, index) in schedule"
                :key="'input-interval-' + index"
            >
                <div class="interval-grid">{{interval.from}}</div>
                <div class="interval-grid interval-grid--mid center">
                    <div class="dash"></div>
                </div>
                <div class="interval-grid">{{interval.to}}</div>
            </div>
        </div>
        <div class="mb20">
            <div class="text-btn">+ New Interval</div>
        </div>
        <div style="margin-bottom: 12px">
            <div class="btn">Apply to {{dayInfo.day}} {{dayInfo.monthName}}</div>
        </div>
        <div class="mb20">
            <div class="btn">Apply to all {{weekNamePlural}}</div>
        </div>
        <div class="center">
            <div class="text-btn" @click="openChildRetractableBlock()">Or apply to multiple</div>
        </div>
    </div>
</template>

<script>
import ToggledSidebarSTORE from "ToggledSidebarSTORE";
import CalendarSTORE from "CalendarSTORE";

import ArrowRight from "MySvg/arrow-right";

export default {
    name: "TimeSetting",
    props: ["storeLink"],
    components: {
        ArrowRight
    },
    computed: {
        schedule() {
            return this.storeLink.props.data.schedule;
        },
        dayInfo() {
            let dayInfo = this.storeLink.props.data.dayInfo;
            ToggledSidebarSTORE.editableDay = dayInfo.ref;
            ToggledSidebarSTORE.editableWeekDay = dayInfo.weekDayRef;
            this.weekNamePlural =
                CalendarSTORE.WEEKNAMESPLURAL[dayInfo.weekDay];
            return dayInfo;
        }
    },
    created() {
        // console.log(this.storeLink, "storeLink");
    },
    methods: {
        closeView() {
            ToggledSidebarSTORE.disableViews();
        },
        openChildRetractableBlock() {
            console.log(this.storeLink.children);
            ToggledSidebarSTORE.renderChildView(
                this.storeLink.children.MultipleDaysChoser
            );
        }
    }
};
</script>