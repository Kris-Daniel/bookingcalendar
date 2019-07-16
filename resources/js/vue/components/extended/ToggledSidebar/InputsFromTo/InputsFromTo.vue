<template>
    <div class="interval" :class="{checked: inFocus, wrong: wrong}">
        <div class="interval-grid">
            <div class="interval_input-wrapper" @click="inFocusEnabled">
                <div class="interval_input-ampm" v-if="from.ampm" @click="changeAMPM($event, 'from')">{{from.ampm.slice(0, 1)}}</div>
                <cleave
                    v-model="from.time"
                    :options="options"
                    class="interval_input"
                    @blur="inFocusDisabled('from')"
                    @input="changeValue(from.time, 'from')"
                ></cleave>
            </div>
        </div>
        <div class="interval-grid interval-grid--mid center">
            <div class="interval_dash"></div>
        </div>
        <div class="interval-grid">
            <div class="interval_input-wrapper" @click="inFocusEnabled">
                <div class="interval_input-ampm" v-if="to.ampm" @click="changeAMPM($event, 'to')">{{to.ampm.slice(0, 1)}}</div>
                <cleave
                    v-model="to.time"
                    :options="options"
                    class="interval_input"
                    @blur="inFocusDisabled('to')"
                    @input="changeValue(to.time, 'to')"
                ></cleave>
            </div>
        </div>
        <div class="interval_delete" @click="deleteInterval(index)">
            <Trash></Trash>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import DateService from "Services/date/DateService";

export default {
    name: "InputsFromTo",
    props: ["interval", "index", "options"],
    data() {
        return {
            inFocus: false,
            wrong: false,
            from: "",
            to: ""
        };
    },
    watch: {
        interval() {
            this.setFromTo();
        },
        ["interval.valid"]() {
            this.wrong = this.interval.valid ? false : true;
        }
    },
    created() {
        this.setFromTo();
    },
    methods: {
        deleteInterval() {
            this.$emit("deleteInterval", this.index);
        },
        inFocusEnabled() {
            this.interval.valid = true;
            this.inFocus = true;
        },
        inFocusDisabled(type) {
            // complete time value and remove class
            while (this[type].time.length < 4) this[type].time += "0";
            this[type].time = DateService.addHourDelimiter(this[type].time);
            this.inFocus = false;
        },
        changeValue(value, type) {
            // Emit value to 24 for parent
            value = DateService.addHourDelimiter(value);
            if (this.options.timeFormat == "12") {
                value = DateService.convertTime12to24(value + " " + this[type].ampm);
            }
            this.$emit("changeIntervalTime", value, type, this.index);
        },
        setFromTo() {
            // Set time intervals
            if (this.options.timeFormat == "12" && (this.interval.from != "" || this.interval.to != "")) {
                this.from = DateService.convertTime24to12(this.interval.from);
                this.to = DateService.convertTime24to12(this.interval.to);
            } else {
                this.from = { time: this.interval.from };
                this.to = { time: this.interval.to };
                if(this.options.timeFormat == "12") {
                    this.from.ampm = "AM";
                    this.to.ampm = "AM";
                }
            }
        },
        changeAMPM(event, time) {
            event.stopPropagation();
            this[time].ampm = this[time].ampm == "PM" ? "AM" : "PM";
            this.changeValue(this[time].time, time);
        }
    }
};
</script>