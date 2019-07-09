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
                <div class="day_schedule_more" v-if="isMoreThan2Intervals">
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
import CalendarHelper from "Calendar/helpers/CalendarHelper";
import CalendarSTORE from "Calendar/helpers/CalendarSTORE";

import Pencil from "MySvg/pencil";
import AngleDown from "MySvg/angle-down";

export default {
    name: "ScheduleDay",
    props: ["dayInfo", "calendarId"],
    components: {
        Pencil,
        AngleDown
    },
    data() {
        return {};
    },
    computed: {
        isSpecial() {
            return !!this.SD[this.dayInfo.ref];
        },
        isMoreThan2Intervals() {
            return this.schedule.length > 2;
        }
    },
    created() {
        this.CalendarDATA = CalendarSTORE.calendars[this.calendarId];
        this.SD = this.CalendarDATA.daysProps.schedule.days;
        this.WD = this.CalendarDATA.daysProps.schedule.weekDays;
        this.schedule = null;

        this.setSchedule();
    },
    methods: {
        setSchedule() {
            this.schedule = this.SD[this.dayInfo.ref]
                ? this.SD[this.dayInfo.ref]
                : this.WD[this.dayInfo.weekDayRef];
        },
        click() {
            let data = {
                component: 'timeSetting',
                schedule: this.schedule,
                dayInfo: this.dayInfo
            };
            this.$emit('sendData', data);
        }
    }
};
</script>