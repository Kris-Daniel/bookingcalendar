<template>
    <div class="special-days toggled-sidebar_container">
        <Calendar :options="SimpleCalendarData"></Calendar>
    </div>
</template>

<script>
import Vue from "vue";
import FindParentMixin from "VueMixins/FindParentMixin";
import store from "VueStore/GlobalSTORE";

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
                    return "";
                }
            }
        };
        this.SimpleCalendarData.settings.multiselect = true;
    }
};
</script>