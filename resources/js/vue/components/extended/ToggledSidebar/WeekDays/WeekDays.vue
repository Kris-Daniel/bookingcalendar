<template>
    <div class="weekdays toggled-sidebar_container">
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
import FindParentMixin from "VueMixins/FindParentMixin";
import ToggledSidebarMixin from "VueMixins/ToggledSidebarMixin";
import store from "VueStore/GlobalSTORE";

export default {
    name: "WeekDays",
    props: ["storeLink", "activeTab"],
    mixins: [FindParentMixin, ToggledSidebarMixin],
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
            });
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
    }
};
</script>