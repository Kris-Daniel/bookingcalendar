<template>
    <div class="schedule">
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
import DateService from "Services/date/DateService";

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
        inValidationCycle() {
            return this.exists(this.store, () => {
                return this.store.inValidationCycle;
            });
        }
    },
    watch: {
        inValidationCycle() {
            if(this.inValidationCycle) {
                this.store.applyValid = this.isIntervalsValid() ? true : false;
                this.store.inValidationCycle = false;
            }
        }
    },
    created() {
        this.options.timeFormat = store.state[this.store.calendarStoreRef].settings.hoursFormat;
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
        isIntervalsValid() {
            let valid = true;
            let len = this.applySchedule.length;
            for(let i = 0; i < (len - 1); i++) {
                let iterated = this.getIntInterval(i);
                if(iterated.from > iterated.to) {
                    this.applySchedule[i].valid = false;
                    valid = false;
                }
                
                for(let j = i + 1; j < len; j++) {
                    let verifiable = this.getIntInterval(j);
                    let A = (verifiable.from > iterated.from) ? iterated : verifiable;
                    let B = (A == verifiable) ? iterated : verifiable;
                    if(B.from - A.to < 0) {
                        this.applySchedule[i].valid = false;
                        this.applySchedule[j].valid = false;
                        valid = false;
                    }
                }

            }
            return valid;
        },
        getIntInterval(index) {
            return {
                from: DateService.getIntHours(this.applySchedule[index].from),
                to: DateService.getIntHours(this.applySchedule[index].to),
            }
        }
    }
};
</script>