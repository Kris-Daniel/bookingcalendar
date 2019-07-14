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
        <div class="intervals mb20" v-click-outside="uncheckIntervals">
            <div
                class="interval"
                v-for="(interval, index) in applySchedule"
                :key="index"
                @click="setCheckedInterval(index)"
                :class="isIntervalChecked(index)"
            >
                <div class="interval-grid">
                    <cleave v-model="interval.from" :options="options" class="interval_input"></cleave>
                </div>
                <div class="interval-grid interval-grid--mid center">
                    <div class="interval_dash"></div>
                </div>
                <div class="interval-grid">
                    <cleave v-model="interval.to" :options="options" class="interval_input"></cleave>
                </div>
                <div class="interval_delete" @click="deleteInterval(index)">
                    <Trash></Trash>
                </div>
            </div>
        </div>
        <div class="mb20">
            <div class="text-btn" @click="addInterval()">+ New Interval</div>
        </div>
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

export default {
    name: "TimeSetting",
    props: ["storeLink"],
    mixins: [FindParentMixin],
    data() {
        return {
            store: "",
            checkedInterval: null,
            options: {
                time: true,
                timeFormat: "24",
                timePattern: ["h", "m"]
            }
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
                return store.state.Constants.WEEKNAMESPLURAL[this.dayInfo.weekDay];
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
        // console.log(this.schedule);
    },
    methods: {
        closeView() {
            store.dispatch("emptyCheckedDays", this.store.calendarStoreRef);
            store.commit(`${this.customId}/hideViews`);
        },
        openChildRetractableBlock() {
            store.commit(`${this.customId}/showView`, this.storeLink.children.MultipleDaysChoser);
        },
        addInterval() {
            this.applySchedule.push({
                from: "",
                to: "",
                formatFrom: "A",
                formatTo: "A"
            });
        },
        deleteInterval(index) {
            this.applySchedule.splice(index, 1);
            this.uncheckIntervals();
        },
        ApplyToDay() {
            // let dayRef = this.storeLink.props.data.ref;
            // let calendarId = ToggledSidebarSTORE.calendarId;
            // let SpecialDays =
            //     CalendarSTORE.calendars[calendarId].daysProps.schedule.days;
            // Vue.set(
            //     SpecialDays,
            //     dayRef,
            //     JSON.parse(JSON.stringify(this.schedule))
            // );
            // ToggledSidebarSTORE.disableViews();
        },
        ApplyToWeekDay() {
            // let dayRef = this.storeLink.props.data.dayInfo.weekDayRef;
            // let calendarId = ToggledSidebarSTORE.calendarId;
            // let WeekDays =
            //     CalendarSTORE.calendars[calendarId].daysProps.schedule.weekDays;
            // Vue.set(
            //     WeekDays,
            //     dayRef,
            //     JSON.parse(JSON.stringify(this.schedule))
            // );
            // ToggledSidebarSTORE.disableViews();
        },
        setCheckedInterval(index) {
            this.checkedInterval = index;
        },
        isIntervalChecked(index) {
            if (this.checkedInterval === index) return "checked";
            return "";
        },
        uncheckIntervals() {
            this.checkedInterval = null;
        }
    }
};
</script>