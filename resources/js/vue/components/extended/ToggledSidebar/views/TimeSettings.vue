<template>
    <div class="time-setting">
        <RetractableBlock :views="storeLink.children"></RetractableBlock>
        <div class="time-setting_close" @click="closeViews()">
            <ArrowRight></ArrowRight>
        </div>
        <div class="title center">Time Settings</div>
        <div class="mb30"></div>
        
        <Schedule :applySchedule="applySchedule"></Schedule>

        <div style="margin-bottom: 12px">
            <div class="btn" @click="ApplyToDay()">Apply to {{dayInfo.day}} {{dayInfo.monthName}}</div>
        </div>
        <div class="mb20">
            <div class="btn" @click="ApplyToWeekDay()">Apply to all {{weekNamePlural}}</div>
        </div>
        <div class="center mb20">
            <div class="text-btn" @click="openChildRetractableBlock()">Or apply to multiple</div>
        </div>
        <div class="center">
            <div class="text-btn" @click="SetUnavailable()">I'm unavailable</div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import store from "Store/GlobalSTORE";
import FindParentMixin from "Mixins/FindParentMixin";
import ToggledSidebarMixin from "Mixins/ToggledSidebarMixin";

import Schedule from "ToggledSidebar/Schedule/Schedule";
import DateService from "Services/date/DateService";

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