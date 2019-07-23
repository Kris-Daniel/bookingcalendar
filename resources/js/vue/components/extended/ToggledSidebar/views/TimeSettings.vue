<template>
    <div class="time-setting">
        <RetractableBlock :views="storeLink.children"></RetractableBlock>
        <div class="toggled-sidebar_container">
            <div class="time-setting_close" @click="closeViews()">
                <ArrowRight></ArrowRight>
            </div>
            <div class="title center mb30">Time Settings</div>
            
            <Schedule :applySchedule="applySchedule"></Schedule>

            <div class="btn mb20" @click="ApplyToDay()">Apply to {{dayInfo.day}} {{dayInfo.monthName}}</div>
            <div class="btn mb20" @click="ApplyToWeekDay()">Apply to all {{weekNamePlural}}</div>
            <div class="center mb20">
                <span class="link size15" @click="openChildRetractableBlock()">Or apply to multiple</span>
            </div>
            <div class="center">
                <span class="link size15" @click="SetUnavailable()">I'm unavailable</span>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import store from "VueStore/GlobalSTORE";
import FindParentMixin from "VueMixins/FindParentMixin";
import ToggledSidebarMixin from "VueMixins/ToggledSidebarMixin";

import Schedule from "VueToggledSidebar/Schedule/Schedule";
import DateService from "VueServices/date/DateService";

export default {
    name: "TimeSetting",
    props: ["storeLink"],
    mixins: [FindParentMixin, ToggledSidebarMixin],
    components: {
        Schedule
    },
    data() {
        return {
            store: ""
        };
    },
    computed: {
        dayInfo() {
            return this.exists(this.store, () => {
                return this.store.dayInfo;
            });
        },
        storeSchedule() {
            return this.exists(this.store, () => {
                return this.store.dayInfo.schedule;
            });
        },
        applySchedule() {
            return this.exists(this.store, () => {
                return this.store.applySchedule;
            });
        },
        weekNamePlural() {
            return store.state.Constants.WEEKNAMESPLURAL[this.dayInfo.weekDayRef];
        }
    },
    watch: {
        dayInfo() {
            if(this.dayInfo) {
                Vue.set(this.store.applyDays, this.store.dayInfo.ref, true);
                this.setWeekDays();
            }
        },
        storeSchedule() {
            store.commit(
                `${this.customId}/setApplySchedule`,
                this.store.dayInfo.schedule
            );
        },
    },
    methods: {
        openChildRetractableBlock() {
            store.commit(`${this.customId}/showView`, this.storeLink.children.MultipleDaysChoser);
        },
        ApplyToDay() {
            this.store.applyType = "day";
            this.runValidationCycle(this.applyToDays);
        },
        ApplyToWeekDay() {
            this.store.applyType = "week";
            this.runValidationCycle(this.applyToDays);
        },
        SetUnavailable() {
            this.applySchedule.splice(0, this.applySchedule.length);
        }
    }
};
</script>