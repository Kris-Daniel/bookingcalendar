<template>
    <div
        class="TS_float center"
        :class="{active: flag}"
    >
        <div class="TS_head">
            <div class="TS_title">Time Setting</div>
            <div class="TS_descr"></div>
        </div>
        <div class="box0 center">
            <div class="a-6 f1 bold">From</div>
            <div class="a-6 f1 bold">To</div>
            <template v-for="int in intervals">
                <div ref="segments" class="box0 mt10 rel">
                    <div class="delimiter"></div>
                    <div ref="froms" class="a-6">
                        <cleave v-model="int.from" :options="options" class="intervalInput"></cleave>
                    </div>
                    <div ref="tos" class="a-6">
                        <cleave v-model="int.to" :options="options" class="intervalInput"></cleave>
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
            class="btn-save"
            >
            Save
        </div>
        </div>
        <input type="hidden" name="" :value="observerStackLS_CL">
    </div>
</template>

<script>
import Vue from 'vue';
import Store from '../../services/Store';
import Helper from '../../services/Helper';
import Cleave from 'vue-cleave-component';
// import InputTS from './InputTS';

export default {
    name: 'InputsTS',
    components: {
        Cleave
    },
    data: function() {
        return {
            inSaving: false,
            inEdit: false,
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

        observerStackLS_CL() {
            let ints = this.intervals;
            if(this.flag) {
                ints = [];
                let len = Store.stackLS_CL.length;
                if(len == 1) {
                    let first = Store.stackLS_CL.getFirst().intervals;
                    first.forEach(function(item, index) {
                        ints.push({from: item.from, to: item.to})
                    });
                }
                if(!ints.length)
                    ints.push(this.emptyIntervals());
            }
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
            let savedIntervals = [];
            for(let i = 0; i < this.intervals.length; i++) {
                savedIntervals.push({});
                savedIntervals[i].from = it.addSemicolon(this.intervals[i].from);
                savedIntervals[i].to = it.addSemicolon(this.intervals[i].to);
            }

            let ptr = {
                'week': 'WD',
                'day': 'SD'
            };
            Store.stackLS_CL.map(function(item) {
                Vue.set(Store[ptr[item.type]], item.ref, savedIntervals);
            });
            Store.stackTS.state = false;
            Store.stackLS_CL.resetVue(Store.stackLS_CL);
            console.log(this.$refs.segments, 'segments');
            console.log(this.$refs.froms, 'froms');
            console.log(this.$refs.tos, 'tos');
        },
        addSemicolon(str) {
            str = str.split('');
            str.splice(2, 0, ":");
            str = str.join('');
            console.log(str);
            return str;
        },
        addInterval() {
            this.intervals.push(this.emptyIntervals());
        },
        emptyIntervals() {
            return {from: '00:00', to: '00:00'};
        }
    }
}

</script>

<style lang="css" scoped>
</style>
