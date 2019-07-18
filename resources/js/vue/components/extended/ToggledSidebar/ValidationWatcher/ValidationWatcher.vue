<template>
    <div class="validation-wathcer"></div>
</template>

<script>
import Vue from 'vue';
import FindParentMixin from "Mixins/FindParentMixin";
import ToggledSidebarMixin from "Mixins/ToggledSidebarMixin";
import DateService from "Services/date/DateService";

export default {
    name: "ValidationWatcher",
    mixins: [FindParentMixin, ToggledSidebarMixin],
    data() {
        return {
            store: ""
        }
    },
    computed: {
        inValidationCycle() {
            return this.exists(this.store, () => {
                return this.store.inValidationCycle;
            });
        },
        applyValid() {
            return this.exists(this.store, () => {
                return this.store.applyValid;
            })
        }
    },
    watch: {
        inValidationCycle() {
            if(this.inValidationCycle) {
                this.store.applyValid = this.isIntervalsValid() ? true : false;
                if(this.store.applyValid) {
                    this.store.applySchedule.sort(function(a, b) {
                        return parseInt(a.from) > parseInt(b.from) ? 1 : -1;
                    });
                }
                this.store.inValidationCycle = false;
            }
        },
        applyValid() {
            if(this.applyValid) {
                this.store.afterValidationCallback();
                this.store.afterValidationCallback = false;
                this.store.applyValid = false;

                this.closeViews();
            }
        },
        
    },
    methods: {
        isIntervalsValid() {
            let valid = true;
            let len = this.store.applySchedule.length;
            for(let i = 0; i < len; i++) {
                let iterated = this.getIntInterval(i);
                if(iterated.from >= iterated.to) {
                    Vue.set(this.store.applySchedule[i], "valid", false);
                    valid = false;
                }
                if(i + 1 < len) {
                    for(let j = i + 1; j < len; j++) {
                        let verifiable = this.getIntInterval(j);
                        let A = (verifiable.from > iterated.from) ? iterated : verifiable;
                        let B = (A == verifiable) ? iterated : verifiable;
                        if(B.from - A.to < 0) {
                            this.store.applySchedule[i].valid = false;
                            this.store.applySchedule[j].valid = false;
                            valid = false;
                        }
                    }
                }

            }
            return valid;
        },
        getIntInterval(index) {
            return {
                from: DateService.getIntHours(this.store.applySchedule[index].from),
                to: DateService.getIntHours(this.store.applySchedule[index].to),
            }
        }
    }
}
</script>