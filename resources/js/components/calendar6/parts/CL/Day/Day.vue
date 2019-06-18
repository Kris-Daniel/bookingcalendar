<template>
    <div class="day" :style="{'margin-left': offset + '%'}">
        <div class="day-ins">{{dayM}}</div>
    </div>
</template>

<script>
import HelperCL from "./HelperCL";
import Store from "../../services/Store";
export default {
    name: "Day",
    props: ["day"],
    data() {
        return {
            dayStr: "",
            time: null,
            offset: 0,
            dayM: null
        };
    },
    created() {
        // console.log(this.day);
        this.setup();
    },
    methods: {
        setup() {
            if (this.day.type == "month") {
                this.dayM = this.day.dayM;
                this.dayStr = this.day.YM.year + "-";
                this.dayStr += HelperCL.zeroToNum(this.day.YM.month + 1) + "-";
                this.dayStr += HelperCL.zeroToNum(this.day.dayM);
                this.time = new Date(this.dayStr);
                if (this.day.dayM == 1) {
                    this.offset = this.time.getDay();
                    if (Store.settings.mondayFirst)
                        this.offset = --this.offset < 0 ? 6 : this.offset;
                    this.offset *= 100 / 7;
                    // console.log(this.offset);
                }
            } else {
                this.time = new Date(this.day.dayN * 86400000);
                this.dayStr = this.time.toISOString().slice(0, 10);
                this.dayM = this.time.getDate();
            }
        }
    }
};
</script>