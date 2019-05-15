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
                <div class="box0 mt10 rel">
                    <div class="delimiter"></div>
                    <div class="a-6">
                        <InputTS @timeUpdated="int.from=$event" :time="int.from"></InputTS>
                    </div>
                    <div class="a-6">
                        <InputTS @timeUpdated="int.to=$event" :time="int.to"></InputTS>
                    </div>
                </div>
            </template>
        </div>
        <div
            @click="save()"
            class="cl_btn cl_btn-right btn-save mv20"
            >
            Save
        </div>
        <input type="hidden" name="" :value="intervalsWatcher">
    </div>
</template>

<script>
import Vue from 'vue';
import Store from '../../services/Store';
import Helper from '../../services/Helper';
import InputTS from './InputTS';

export default {
    name: 'EditDayTS',
    components: {
        InputTS
    },
    data: function() {
        return {
            intervals: [
                {from: '00:00', to: '00:00'}
            ]
        }
    },
    computed: {
        flag() {
            return (Store.TS.state == 'editSchedule' && Store.state == 'standard');
        },
        day() {
            if(Store.state == 'orders')
                return Store.stackLS_CL.getFirst();
            return {};
        },
        intervalsWatcher() {
            let ints = [
                {from: '01:00', to: '01:00'}
            ];
            if(Store.stackLS_CL.length == 1) {
                ints = Store.stackLS_CL.getFirst().intervals;
            }
            this.intervals = ints;
            return (Store.stackLS_CL.length == 1);
        }
    },
    created() {

    },
    methods: {
        timeChange(elem) {
            console.log(elem, 'elem');
        },
        save() {
            Helper.save(this.intervals);
        }
    }
}
</script>

<style lang="css" scoped>
</style>
