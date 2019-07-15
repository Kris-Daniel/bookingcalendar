<template>
    <div class="time-setting">
        <RetractableBlock :views="storeLink.children"></RetractableBlock>
        <div class="time-setting_close" @click="closeView()">
            <ArrowRight></ArrowRight>
        </div>
        <div class="title center">Time Settings</div>
        <div class="mb30"></div>
        <div class="mb10">
            <div class="interval-grid">From</div>
            <div class="interval-grid interval-grid--mid"></div>
            <div class="interval-grid">To</div>
        </div>
        
        <Schedule :applySchedule="applySchedule"></Schedule>

        <div style="margin-bottom: 12px">
            <div class="btn" @click="ApplyToDay()">Apply to {{dayInfo.day}} {{dayInfo.monthName}}</div>
        </div>
        <div class="mb20">
            <div class="btn" @click="ApplyToWeekDay()">Apply to all {{weekNamePlural}}</div>
        </div>
        <div class="center">
            <div class="text-btn" @click="openChildRetractableBlock()">Or apply to multiple</div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import FindParentMixin from "Mixins/FindParentMixin";
import store from "Store/GlobalSTORE";

import Schedule from "ToggledSidebar/Schedule/Schedule";
import DateService from "Services/date/DateService";

export default {
    name: "TimeSetting",
    props: ["storeLink"],
    mixins: [FindParentMixin],
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
        storeSchedule() {
            store.commit(
                `${this.customId}/setApplySchedule`,
                this.store.dayInfo.schedule
            );
        },
    },
    created() {
        this.CalendarRef = this.getStoreModule(this.store.calendarStoreRef);
    },
    methods: {
        closeView() {
            store.dispatch("emptyCheckedDays", this.store.calendarStoreRef);
            store.commit(`${this.customId}/hideViews`);
        },
        openChildRetractableBlock() {
            store.commit(`${this.customId}/showView`, this.storeLink.children.MultipleDaysChoser);
        },
        ApplyToDay() {
            Vue.set(this.CalendarRef.schedule.days, this.dayInfo.ref, DateService.getScheduleCopy(this.applySchedule));
            this.closeView();
        },
        ApplyToWeekDay() {
            Vue.set(this.CalendarRef.schedule.weekDays, this.dayInfo.weekDayRef, DateService.getScheduleCopy(this.applySchedule));
            this.closeView();
        }
    }
};
</script>