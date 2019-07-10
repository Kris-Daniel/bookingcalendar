<template>
    <div class="day_inside day--schedule" :class="{special: isSpecial}" @click="click">
        <input type="hidden" :value="specialDaysSetter">
        <input type="hidden" :value="weekDaysSetter">
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
        return {
            scheduleLength: 0
        };
    },
    computed: {
        specialDaysSetter() {
            this.setSchedule();
            return this.CalendarDATA.daysProps.schedule.days;
        },
        weekDaysSetter() {
            this.setSchedule();
            return this.CalendarDATA.daysProps.schedule.weekDays;
        },
        isSpecial() {
            // if(this.SD[this.dayInfo.ref]) return true;
            return CalendarSTORE.calendars[this.calendarId].daysProps.schedule.days[this.dayInfo.ref];
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
            this.scheduleLength = this.schedule.length;
        },
        click() {
            let data = {
                component: 'timeSetting',
                schedule: JSON.parse(JSON.stringify(this.schedule)),
                dayInfo: this.dayInfo
            };
            console.log(this.schedule);
            this.$emit('sendData', data);
        }
    }
};
</script>