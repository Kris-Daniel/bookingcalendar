<template>
    <div class="interval" :class="{checked: inFocus, wrong: wrong}">
        <div class="interval-grid">
            <div class="interval_input-wrapper" @click="inFocusEnabled">
                <cleave
                    v-model="from.time"
                    :options="options"
                    class="interval_input"
                    @blur="inFocusDisabled('from')"
                    @input="changeValue(from.time, 'from')"
                    ref="inputFrom"
                ></cleave>
                <div class="interval_input-ampm" v-if="from.ampm" @click="changeAMPM($event, 'from', 'inputFrom')">{{from.ampm}}</div>
            </div>
        </div>
        <div class="interval-grid interval-grid--mid center">
            <div class="interval_dash"></div>
        </div>
        <div class="interval-grid">
            <div class="interval_input-wrapper" @click="inFocusEnabled">
                <cleave
                    v-model="to.time"
                    :options="options"
                    class="interval_input"
                    @blur="inFocusDisabled('to')"
                    @input="changeValue(to.time, 'to')"
                    ref="inputTo"
                ></cleave>
                <div class="interval_input-ampm" v-if="to.ampm" @click="changeAMPM($event, 'to', 'inputTo')">{{to.ampm}}</div>
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
            // Complete time value and remove class
            while (this[type].time.length < 4) this[type].time += "0";
            this[type].time = DateService.addHourDelimiter(this[type].time);
            this.inFocus = false;
        },
        changeValue(value, type) {
            // Emit value to 24 for parent
            if(value != "") {
                value = DateService.addHourDelimiter(value);
                if (this.options.timeFormat == "12") {
                    value = DateService.convertTime12to24(value + " " + this[type].ampm);
                }
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
                    Vue.set(this.from, "ampm", "AM");
                    Vue.set(this.to, "ampm", "AM");
                }
            }
        },
        changeAMPM(event, time, input) {
            this[time].ampm = this[time].ampm == "PM" ? "AM" : "PM"
            this.changeValue(this[time].time, time);
            if(time == "from" && this[time].ampm == "PM") {
                this.to.ampm = "PM";
                this.changeValue(this.to.time, "to");
            }
            this.$refs[input].$el.focus();
        }
    }
};
</script>