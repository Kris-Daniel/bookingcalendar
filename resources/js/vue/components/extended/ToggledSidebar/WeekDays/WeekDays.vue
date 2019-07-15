<template>
    <div class="weekdays">
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
import FindParentMixin from "Mixins/FindParentMixin";
import store from "Store/GlobalSTORE";

export default {
    name: "WeekDays",
    props: ["storeLink", "activeTab"],
    mixins: [FindParentMixin],
    data() {
        return {
            store: ""
        };
    },
    computed: {
        activeStoreLink() {
            return this.exists(this.store, () => {
                this.setWeekDays();
                return this.storeLink.active;   
            })
        },
        weekDays() {
            return this.exists(this.store, () => {
                return this.store.applyWeekDays;
            })
        }
    },
    watch: {
        activeTab() {
            this.setWeekDays();
        },
        activeStoreLink() {}
    },
    created() {
        this.setWeekDays();
    },
    methods: {
        switchDay(day) {
            if (this.store.dayInfo.weekDayRef == day.ref) return false;
            day.active = !day.active;
        },
        isDayActive(day) {
            if (day.active) return "active";
            return "";
        },
        isDayDefault(day) {
            return (this.store.dayInfo.weekDayRef == day.ref) ? "default" : "";
        },
        setWeekDays() {
            this.weekDays.splice(0, this.weekDays.length);
            if(!this.store.calendarStoreRef) return false;
            let weekDays = this.getWeekDays(this.getStoreModule(this.store.calendarStoreRef).settings.mondayFirst);

            for(let i = 0; i < 7; i++) {
                this.weekDays.push({
                    ref: weekDays[i],
                    name: store.state.Constants.WEEKNAMES[weekDays[i]],
                    active: weekDays[i] == this.store.dayInfo.weekDayRef ? true : false,
                });
            }
        }
        
    }
};
</script>