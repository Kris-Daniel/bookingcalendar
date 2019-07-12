<template>
    <div class="day_inside day--schedule" :class="{special: isSpecial}" @click="click">
        <div class="day_num">
            {{dayInfo.day}}
            <div class="day_special-circle"></div>
        </div>
        <div class="day_schedule">
            <div
                v-for="(interval, index) in schedule"
                :key="index"
                class="day_schedule_time"
            >{{interval.from}} - {{interval.to}}</div>
            <div>
                <div class="day_schedule_more" v-if="scheduleLength > 2">
                    Show more
                    <div class="day_schedule_more_angle-down">
                        <AngleDown></AngleDown>
                    </div>
                </div>
            </div>
        </div>
        <div class="day_edit-icon">
            <Pencil></Pencil>
        </div>
    </div>
</template>

<script>
import CalendarMixin from "Mixins/CalendarMixin";

export default {
    name: "DaySchedule",
    props: ["dayInfo"],
    mixins: [CalendarMixin],
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
    created() {},
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
        }
    }
};
</script>