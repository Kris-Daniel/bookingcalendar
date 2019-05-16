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
                        <InputTS @timeUpdated="int.from = $event" @inEditSet="changeInputValue()" :time="int.from"></InputTS>
                    </div>
                    <div class="a-6">
                        <InputTS @timeUpdated="int.to = $event" @inEditSet="changeInputValue()" :time="int.to"></InputTS>
                    </div>
                </div>
            </template>
        </div>
        <div
            @click="save()"
            class="TS_btn btn-save"
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
            intervals: this.emptyIntervals(),
            inSaving: false,
            inEdit: false,
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
            let ints;
            let len = Store.stackLS_CL.length;

            this.inEdit = (len == 0) ? false : this.inEdit;


            // console.log(this.inEdit, 'inedit');
            if(!this.inEdit && !this.inSaving) {
                if(len == 1) {
                    ints = JSON.parse(JSON.stringify(Store.stackLS_CL.getFirst().intervals));
                    if(ints.length == 0)
                        ints = this.emptyIntervals();
                    console.log('refresh to first');
                }
                else
                    ints = this.emptyIntervals();
                Vue.set(this, 'intervals', ints);
            }

            console.log(this.intervals, len, 'intervals updated');
            return len;
        }
    },
    created() {

    },
    methods: {
        changeInputValue() {
            this.inEdit = true;
        },
        save() {
            Helper.saveSchedule(this);
        },
        emptyIntervals() {
            return [{from: '00:00', to: '00:00'}]
        }
    }
}
</script>

<style lang="css" scoped>
</style>
