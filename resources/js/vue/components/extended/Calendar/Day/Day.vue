<template>
    <td class="slide_table_td" :class="{'checked': checked}">
        <div class="day" :class="[daysProps.dayClasses(), anotherDay(), defaultDay()]" ref="dayDiv">
            <component
                :is="days[daysProps.dayType]"
                :dayInfo="dayInfo"
                @sendData="click"
            ></component>
        </div>
    </td>
</template>

<script>
import Vue from "vue";
// import ToggledSidebarSTORE from "ToggledSidebarSTORE";

import CalendarMixin from "Mixins/CalendarMixin";

import ScheduleDay from "./views/DaySchedule";
import SimpleDay from "./views/DaySimple";

export default {
    name: "Day",
    props: ["day", "slideId"],
    mixins: [CalendarMixin],
    components: {
        ScheduleDay,
        SimpleDay
    },
    data() {
        return {
            store: "",
            days: {
                schedule: "ScheduleDay",
                simple: "SimpleDay"
            }
        };
    },
    computed: {
        checked() {
            return this.exists(this.store, () => {
                return this.store.checkedDays[this.ref] ? true : false;
            });
        }
    },
    created() {
        this.daysProps = this.store.daysProps;
        this.dayDiv = "";
        this.time = new Date(this.day * 86400000);
        this.dayStr = this.time.toISOString().slice(0, 10);
        this.ref = "d" + this.dayStr;

        let dateArr = this.dayStr.split("-").map(item => {
            return parseInt(item);
        });

        let weekDay = this.time.getDay();

        this.dayInfo = {
            ref: this.ref,
            day: dateArr[2],
            month: dateArr[1] - 1,
            year: dateArr[0],
            weekDay,
            weekDayRef: this.store.constants.WEEK[weekDay],
            monthName: this.store.constants.MONTHS[dateArr[1] - 1]
        };
    },
    mounted() {
        this.dayDiv = this.$refs.dayDiv;
    },
    methods: {
        click(data) {
            // if(ToggledSidebarSTORE.editableDay == this.ref) return false;
            if (!this.checked) {
                if (!this.store.settings.multiselect)
                    Vue.set(this.store, "checkedDays", {});
                Vue.set(this.store.checkedDays, this.ref, true);
            } else Vue.delete(this.store.checkedDays, [this.ref]);

            this.daysProps.dayClick(data);
        },
        anotherDay() {
            let monthCount = this.dayInfo.year * 12 + this.dayInfo.month;
            if (this.slideId != monthCount) return "day--another-month";
            return "";
        },
        defaultDay() {
            // if(ToggledSidebarSTORE.editableDay == this.ref) return "default";
            return "";
        }
    }
};
</script>