<template>
    <div class="day_inside day-schedule" :class="{special: isSpecial}">
        <div class="day_num">
            {{dayInfo.day}}
            <div class="day_special"></div>
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
        <div class="day_edit">
            <Pencil></Pencil>
        </div>
    </div>
</template>

<script>
import HelperCL from "../helpers/HelperCL";
import StoreCL from "../helpers/StoreCL";

import Pencil from "../../../../../svg/pencil";
import AngleDown from "../../../../../svg/angle-down";

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
        this.CL = StoreCL.calendars[this.calendarId];
        this.SD = this.CL.daysProps.schedule.days;
        this.WD = this.CL.daysProps.schedule.weekDays;
        this.schedule = null;

        this.setSchedule();
        // console.log(this.dayInfo, this.SD, this.WK, "schedule Day");
    },
    methods: {
        setSchedule() {
            this.schedule = this.SD[this.dayInfo.ref]
                ? this.SD[this.dayInfo.ref]
                : this.WD[this.dayInfo.weekDay];
        }
    }
};
</script>