<template>
    <div class="schedule">
        <div v-if="!applySchedule.length" class="schedule_unavailable">
            Unavailable
        </div>
        <div class="interval" v-if="applySchedule.length">
            <div class="interval_title">From</div>
            <div class="interval_title">To</div>
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
            <span class="link size15" @click="addInterval()">+ New Interval</span>
        </div>
    </div>
</template>

<script>
import Vue from "vue";
import FindParentMixin from "VueMixins/FindParentMixin";
import store from "VueStore/GlobalSTORE";
import InputsFromTo from "VueToggledSidebar/InputsFromTo/InputsFromTo";

export default {
    name: "Schedule",
    mixins: [FindParentMixin],
    props: [],
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
        storeSchedule() {
            return this.exists(this.store, () => {
                return this.store.dayInfo.schedule;
            });
        },
        applySchedule() {
            return this.exists(this.store, () => {
                return this.store.applySchedule;
            });
        },
    },
    watch: {
        storeSchedule() {
            store.commit(
                `${this.customId}/setApplySchedule`,
                this.store.dayInfo.schedule
            );
            this.$nextTick(() => {
                if(this.applySchedule.length == 0) this.addInterval();
            });
        },
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
                valid: true
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