<template>
    <div class="weekdays">
        <input type="hidden" :value="checkedDay" />
        <template v-for="day in weekDays">
            <div class="weekday" :key="day.ref" :class="[isDayActive(day), isDayDefault(day)]">
                <div class="weekday_name" @click="switchDay(day)">{{day.name}}</div>
                <div
                    class="ios-switcher"
                    @click="switchDay(day)"
                    :class="[isDayActive(day), isDayDefault(day)]"
                >
                    <div class="ios-switcher_lever"></div>
                </div>
            </div>
        </template>
    </div>
</template>

<script>
import Vue from "vue";
import CalendarSTORE from "CalendarSTORE";
import ToggledSidebarSTORE from "ToggledSidebarSTORE";

export default {
    name: "WeekDays",
    props: ["storeLink", "activeTab"],
    watch: {
        activeTab() {
            if(this.activeTab == 1) ToggledSidebarSTORE.dayApplyType = 'week';
            else ToggledSidebarSTORE.dayApplyType = 'special';
            this.weekDays = [];
        }
    },
    data() {
        return {
            WEEKNAMES: CalendarSTORE.WEEKNAMES,
            WEEK: CalendarSTORE.WEEK,
            weekDays: []
        };
    },
    computed: {
        checkedDay() {
            this.weekDays = [];
            let checkedDay = this.storeLink.parent.props.data.dayInfo
                .weekDayRef;
            for (let i = 0; i < this.WEEK.length; i++) {
                this.weekDays.push({
                    ref: this.WEEK[i],
                    name: this.WEEKNAMES[i],
                    active: checkedDay == this.WEEK[i] ? true : false
                });
            }
            Vue.set(ToggledSidebarSTORE, 'weekDays', {});
            return checkedDay;
        }
    },
    created() {
        let CalendarDATA =
            CalendarSTORE.calendars[ToggledSidebarSTORE.calendarId];
        if (CalendarDATA.daysProps.settings.mondayFirst) {
            let Su = this.weekDays[0];
            this.weekDays.shift();
            this.weekDays.push(Su);
        }
    },
    methods: {
        switchDay(day) {
            if (ToggledSidebarSTORE.editableWeekDay == day.ref) return false;
            day.active = !day.active;
            this.setStoreWeekDays(day.ref, day.active);
        },
        isDayActive(day) {
            if (day.active) return "active";
            return "";
        },
        isDayDefault(day) {
            if (ToggledSidebarSTORE.editableWeekDay == day.ref) {
                ToggledSidebarSTORE.weekDays[ToggledSidebarSTORE.editableWeekDay] = true;
                return "default";
            }
            return "";
        },
        setStoreWeekDays(ref, active) {
            ToggledSidebarSTORE.weekDays[ref] = active;
        }
    }
};
</script>