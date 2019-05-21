<template>
    <div
        class="calendar-side calendar-side--right center"
        :class="{active: showTS && flag}"
    >
        <div class="TS_head">
            <div class="TS_title">Time Setting</div>
            <div class="TS_descr"></div>
        </div>
        <div class="box0 center">
            <div class="a-5 text-left f1 bold">From</div>
            <div class="a-5 text-left f1 bold">To</div>
            <template v-for="int, index in intervals">
                <div ref="inputs" class="box0 mt10 rel">
                    <div class="delimiter"></div>
                    <div ref="froms" class="a-5">
                        <cleave v-model="int.from" :options="options" class="input"></cleave>
                    </div>
                    <div ref="tos" class="a-5">
                        <cleave v-model="int.to" :options="options" class="input"></cleave>
                    </div>
                    <div class="a-2">
                        <div class="inputs_x">
                            <div class="inputs_x_svg" @click="removeInterval(index)">
                                <X></X>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        <div class="TS_inside f1 text-left">
            <div
                @click="addInterval()"
                class="cyan underline-hover size14 mv20 pointer-hover"
            >
                + New Interval
            </div>
            <div
                @click="save()"
                class="btn"
            >
                Save
            </div>
            <template v-if="SDinLS_CL && OneInLS_CL">
                <div class="pv10"></div>
                <div
                    @click="ApplyToWeekday()"
                    class="btn"
                >
                    Apply to {{OneInLS_CL}}
                </div>
            </template>
            <template v-if="SDinLS_CL">
                <div class="pv10"></div>
                <div
                    @click="removeFromSpecial()"
                    class="btn btn--red"
                >
                    Remove from Special
                </div>
            </template>
        </div>
        <input type="hidden" name="" :value="observerStackLS_CL">
    </div>
</template>

<script>
import Vue from 'vue';
import Store from '../../services/Store';
import Helper from '../../services/Helper';
import Cleave from 'vue-cleave-component';
import X from '../../../../svg/x';

export default {
    name: 'InputsTS',
    components: {
        Cleave,
        X
    },
    data: function() {
        return {
            inSaving: false,
            inEdit: false,
            SDinLS_CL: false,
            OneInLS_CL: false,
            valid: true,
            intervals: [],
            options: {
                time: true,
                timeFormat: '24',
                timePattern: ['h', 'm']
            }
        }
    },
    computed: {
        flag() {
            return (Store.stackTS.state == 'standard');
        },
        showTS() {
            return Store.showTS;
        },
        observerStackLS_CL() {
            let ints = this.intervals;
            this.OneInLS_CL = false;

            ints = [];
            let len = Store.stackLS_CL.length;
            if(len == 1) {
                let first = Store.stackLS_CL.getFirst();
                this.OneInLS_CL = Store.WEEKNAMES[first.weekIndex];
                first.intervals.forEach(function(item, index) {
                    ints.push({from: item.from, to: item.to})
                });
            }
            if(!ints.length)
                ints.push(this.emptyIntervals());

            this.SDinLS_CL = Store.stackLS_CL.state == 'day' ? true : false;
            this.intervals = ints;
            return ints.length;
        }
    },
    created() {

    },
    methods: {
        changeInputValue() {
            this.inEdit = true;
        },
        save() {
            let it = this;
            let savedIntervals = this.makeSavedIntervals();
            let ptr = {
                'week': 'WD',
                'day': 'SD'
            };
            Store.stackLS_CL.map(function(item) {
                Vue.set(Store[ptr[item.type]], item.ref, savedIntervals);
            });

            // Store.stackTS.state = false;
            Store.stackLS_CL.resetVue(Store.stackLS_CL);
            this.success();
            console.log(this.$refs.segments, 'segments');
            console.log(this.$refs.froms, 'froms');
            console.log(this.$refs.tos, 'tos');
        },
        removeFromSpecial() {
            let it = this;
            Store.stackLS_CL.map(function(item) {
                Vue.delete(Store.SD, item.ref);
            });
            Store.stackLS_CL.resetVue(Store.stackLS_CL);
            this.success();
        },
        ApplyToWeekday() {
            let first = Store.stackLS_CL.getFirst();
            let savedIntervals = this.makeSavedIntervals();
            Vue.set(Store.WD, first.weekName, savedIntervals);
            Store.stackLS_CL.resetVue(Store.stackLS_CL);
            this.success();
        },
        makeSavedIntervals() {
            let it = this;
            let savedIntervals = [];
            for(let i = 0; i < this.intervals.length; i++) {
                savedIntervals.push({});
                savedIntervals[i].from = it.addSemicolon(this.intervals[i].from);
                savedIntervals[i].to = it.addSemicolon(this.intervals[i].to);
            }
            return savedIntervals;
        },
        removeInterval(index) {
            this.intervals.splice(index, 1);
            console.log(index, this.intervals);
        },
        addSemicolon(str) {
            str = str.split('');
            str.splice(2, 0, ":");
            str = str.join('');
            return str;
        },
        addInterval() {
            this.intervals.push(this.emptyIntervals());
        },
        emptyIntervals() {
            return {from: '00:00', to: '00:00'};
        },
        success() {
            Store.overlay = false;
            Store.showTS = false;
        }
    }
}

</script>

<style lang="css" scoped>
</style>
