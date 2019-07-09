<template>
    <div class="special-days">
        <input type="hidden" :value="changeParentTab" />
        <Calendar :params="simpleCalendar"></Calendar>
    </div>
</template>

<script>
import Vue from "vue";
import CalendarSTORE from "CalendarSTORE";
import ToggledSidebarSTORE from "ToggledSidebarSTORE";

export default {
    name: "SpecialDays",
    props: ["storeLink"],
    computed: {
        changeParentTab() {
            if (this.oldTab != this.$parent.activeTab) {
                this.oldTab = this.$parent.activeTab;
                for (let day in this.commonDaysInfo.checkedDays) {
                    if (day != ToggledSidebarSTORE.editableDay)
                        Vue.delete(this.commonDaysInfo.checkedDays, day);
                }
            }
            return this.$parent.activeTab;
        }
    },
    created() {
        this.oldTab = this.$parent.activeTab;
        this.commonDaysInfo = this.storeLink.parent.props.commonDaysInfo;
        this.simpleCalendar = {
            name: "simpleCalendar",
            time: new Date(),
            daysProps: {
                dayType: "simple",
                multiselect: true,
                dayClick(commonDaysInfo, data) {
                    console.log(commonDaysInfo, data, "simple");
                },
                dayClasses(ref) {
                    return "day-simple";
                }
            }
        };
        this.simpleCalendar.daysProps.checkedDays = this.commonDaysInfo.checkedDays;
        this.simpleCalendar.daysProps.settings = this.commonDaysInfo.settings;
    }
};
</script>