<template>
    <div class="schedule">
        <div v-if="!applySchedule.length" class="schedule_unavailable">
            Unavailable
        </div>
        <div class="mb10" v-if="applySchedule.length">
            <div class="interval-grid">From</div>
            <div class="interval-grid interval-grid--mid"></div>
            <div class="interval-grid">To</div>
        </div>
        <div class="intervals mb20">
            <InputsFromTo
                v-for="(interval, index) in applySchedule"
                :key="index"
                :interval="interval"
                :index="index"
                :options="options"
                @deleteInterval="deleteInterval"
                @changeIntervalTime="changeIntervalTime"
            >
            </InputsFromTo>
        </div>
        <div class="mb20">
            <div class="text-btn" @click="addInterval()">+ New Interval</div>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import FindParentMixin from "Mixins/FindParentMixin";
import store from "Store/GlobalSTORE";
import InputsFromTo from "ToggledSidebar/InputsFromTo/InputsFromTo";

export default {
    name: "Schedule",
    mixins: [FindParentMixin],
    props: ["applySchedule"],
    components: {
        InputsFromTo
    },
    data() {
        return {
            store: "",
            checkedInterval: null,
            options: {
                time: true,
                timeFormat: "",
                timePattern: ["h", "m"]
            }
        };
    },
    computed: {
        
    },
    watch: {
        
    },
    created() {
        this.options.timeFormat = store.state[this.store.calendarStoreRef].settings.hoursFormat;
    },
    mounted(){
    },
    methods: {
        addInterval() {
            this.applySchedule.push({
                from: "",
                to: "",
            });
        },
        deleteInterval(index) {
            this.applySchedule.splice(index, 1);
        },
        setCheckedInterval(index) {
            this.checkedInterval = index;
        },
        isIntervalChecked(index) {
            if (this.checkedInterval === index) return "checked";
            return "";
        },
        changeIntervalTime(time, type, index) {
            this.applySchedule[index][type] = time;
        },
        
    }
};
</script>