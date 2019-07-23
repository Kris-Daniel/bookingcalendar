<template>
    <div class="day_inside day--schedule" :class="{special: isSpecial}" @click="click">
        <div class="day_date">
            <div class="day_num">
                <span class="day_weekname">{{dayInfo.weekDayRef}},</span>
                {{dayInfo.day}}
                <div class="day_special-circle"></div>
            </div>
            <div class="day_month-year">
                {{monthName}} {{dayInfo.year}}
            </div>
        </div>
        
        <div class="day_schedule">
            <div
                v-for="(interval, index) in schedule"
                :key="index"
                class="day_time"
            >{{getCurrentTimeFormat(interval.from)}} - {{getCurrentTimeFormat(interval.to)}}</div>
            <div>
                <span class="link size12" v-if="scheduleLength > 2">
                    Show more
                    <div class="day_link-angle-down">
                        <AngleDown></AngleDown>
                    </div>
                </span>
            </div>
        </div>
        <div class="day_edit-icon">
            <Pencil></Pencil>
        </div>
    </div>
</template>

<script>
import FindParentMixin from "VueMixins/FindParentMixin";
import DateService from "VueServices/date/DateService";
import store from "VueStore/GlobalSTORE";

export default {
    name: "DaySchedule",
    props: ["dayInfo"],
    mixins: [FindParentMixin],
    data() {
        return {
            store: ""
        };
    },
    computed: {
        specialDays() {
            return this.store ? this.store.schedule.days : false;
        },
        weekDays() {
            return this.store ? this.store.schedule.weekDays : false;
        },
        isSpecial() {
            return this.exists(this.specialDays, () => {
                if (this.specialDays[this.dayInfo.ref]) return true;
            });
            return false;
        },
        schedule() {
            return this.specialDays[this.dayInfo.ref]
                ? this.getRightSchedule(this.specialDays[this.dayInfo.ref])
                : this.getRightSchedule(this.weekDays[this.dayInfo.weekDayRef]);
        },
        scheduleLength() {
            return this.schedule ? this.schedule.length : 0;
        }
    },
    watch: {
        specialDays() {},
        weekDays() {},
        schedule() {
            this.dayInfo.schedule = JSON.parse(JSON.stringify(this.schedule));
        }
    },
    created() {
        this.monthName = store.state.Constants.MONTHS[this.dayInfo.month];
    },
    mounted() {},
    methods: {
        getRightSchedule(schedule) {
            return schedule ? schedule : [];
        },
        click() {
            let data = {
                component: "timeSetting",
                dayInfo: this.dayInfo
            };
            this.$emit("sendData", data);
        },
        getCurrentTimeFormat(time) {
            if(this.store.settings.hoursFormat == "12") {
                time = DateService.convertTime24to12(time);
                return time.time + time.ampm.toLowerCase();
            } else return time;
        }
    }
};
</script>