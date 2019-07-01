<template>
    <div class="RC">
        <CL :params="mainCL"></CL>
    </div>
</template>

<script>
import CL from "../CL/CL";
import * as $ from "jquery";

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
                checkedDays: {},
                dayClick(ref, dayDiv) {
                    console.log(ref, dayDiv, "ref click here");
                },
                dayClasses(ref) {
                    return 'day-test';
                }
            }
        };
        // setTimeout(() => {
        //     this.typeCL = 'week';
        // }, 2000)
    }
};
</script>