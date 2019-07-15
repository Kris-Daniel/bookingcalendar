<template>
    <div class="special-days">
        <Calendar :options="SimpleCalendarData"></Calendar>
    </div>
</template>

<script>
import Vue from "vue";
import FindParentMixin from "Mixins/FindParentMixin";
import store from "Store/GlobalSTORE";

export default {
    name: "SpecialDays",
    props: ["storeLink", "activeTab"],
    mixins: [FindParentMixin],
    data() {
        return {
            SimpleCalendarData: ""
        }
    },
    watch: {
        activeTab() {
            Vue.set(this.store, "applyDays", {});
            Vue.set(store.state.SimpleCalendarData, "checkedDays", this.store.applyDays);
            this.store.applyDays[this.store.dayInfo.ref] = true;
        }
    },
    created() {
        let calendarStore = store.state[this.store.calendarStoreRef];
        this.SimpleCalendarData = {
            name: "SimpleCalendarData",
            settings: calendarStore.settings,
            checkedDays: this.store.applyDays,
            defaultDays: {
                [this.store.dayInfo.ref]: true
            },
            daysProps: {
                dayType: "simple",
                dayClick(data) {
                    
                },
                dayClasses(ref) {
                    return "day-simple";
                }
            }
        };
        this.SimpleCalendarData.settings.multiselect = true;
    }
};
</script>