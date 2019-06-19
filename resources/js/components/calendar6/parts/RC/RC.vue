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
            extended: true,
            dayClick(ref, dayDiv) {
                console.log(ref, dayDiv, "ref here");
            }
        };
        // setTimeout(() => {
        //     this.typeCL = 'week';
        // }, 2000)
    }
};
</script>