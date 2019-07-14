<template>
    <div class="special-days">
        <Calendar :params="simpleCalendar"></Calendar>
    </div>
</template>

<script>
import Vue from "vue";

export default {
    name: "SpecialDays",
    props: ["storeLink", "activeTab"],
    watch: {
        activeTab() {
            for (let day in this.commonDaysInfo.checkedDays) {
                if (day != ToggledSidebarSTORE.editableDay)
                    Vue.delete(this.commonDaysInfo.checkedDays, day);
            }
        }
    },
    created() {
        this.commonDaysInfo = this.storeLink.parent.props.commonDaysInfo;
        this.simpleCalendar = {
            name: "simpleCalendar",
            time: new Date(),
            daysProps: {
                dayType: "simple",
                multiselect: true,
                dayClick(commonDaysInfo, data) {
                    console.log(commonDaysInfo, data, "commonDaysInfo and data");
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