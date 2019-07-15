<template>
    <div class="interval" :class="{checked: inFocus, wrong: wrong}">
        <div class="interval-grid">
            <span @click="inFocusEnabled">
                <cleave
                    v-model="from"
                    :options="options"
                    class="interval_input"
                    @blur="inFocusDisabled('from')"
                    @input="changeValue(from, 'from')"
                ></cleave>
            </span>
        </div>
        <div class="interval-grid interval-grid--mid center">
            <div class="interval_dash"></div>
        </div>
        <div class="interval-grid">
            <span @click="inFocusEnabled">
                <cleave
                    v-model="to"
                    :options="options"
                    class="interval_input"
                    @blur="inFocusDisabled('to')"
                    @input="changeValue(to, 'to')"
                ></cleave>
            </span>
        </div>
        <div class="interval_delete" @click="deleteInterval(index)">
            <Trash></Trash>
        </div>
    </div>
</template>

<script>
import DateService from "Services/date/DateService";

export default {
    name: "InputsFromTo",
    props: ["interval", "index", "options"],
    data() {
        return {
            inFocus: false,
            wrong: false,
            from: this.interval.from,
            to: this.interval.to
        };
    },
    watch: {
        interval() {
            this.from = this.interval.from,
            this.to = this.interval.to
        }
    },
    methods: {
        deleteInterval() {
            this.$emit("deleteInterval", this.index);
        },
        inFocusEnabled() {
            this.wrong = false;
            this.inFocus = true;
        },
        inFocusDisabled(type) {
            while(this[type].length < 4) this[type] += "0";
            this[type] = DateService.addHourDelimiter(this[type]);
            this.inFocus = false;
        },
        changeValue(value, type) {
            value = DateService.addHourDelimiter(value);
            this.$emit("changeIntervalTime", value, type, this.index);
        }
    }
};
</script>