<template>
    <div class="RC">
        <CL :params="mainCL"></CL>
    </div>
</template>

<script>
import Vue from 'vue';
import CL from "../CL/CL";
import CalendarClass from '../../services/GetCalendar';
let RenderCalendar = new CalendarClass();

export default {
    name: "RC",
    components: {
        CL
    },
    data() {
        return {};
    },
    created() {
        this.mainCL = {
            name: 'mainCL',
            time: new Date(),
            daysProps: {
                dayType: 'schedule',
                dayClick(ref, dayDiv) {
                    console.log(ref, dayDiv, "ref click here");
                },
                dayClasses(ref) {
                    return 'day-test';
                }
            }
        };
        Vue.set(this.mainCL.daysProps, 'checkedDays', {});
        Vue.set(this.mainCL.daysProps, 'schedule', RenderCalendar.schedule);
        Vue.set(this.mainCL.daysProps, 'settings', RenderCalendar.settings);
    }
};
</script>