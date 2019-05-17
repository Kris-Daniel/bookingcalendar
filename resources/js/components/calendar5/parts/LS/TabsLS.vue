<template>
    <div class="LS_head">
        <div class="LS_title">Schedule</div>
        <div class="LS_tabs">
            <div class="tab" :class="{active: observerTab == 'week'}">
                <span class="name" @click="changeTab('week')">Regular</span>
            </div>
            <div class="tab" :class="{active: observerTab == 'day'}">
                <span class="name" @click="changeTab('day')">Special</span>
            </div>
        </div>
        <input type="hidden" name="" :value="observerTab">
    </div>
</template>

<script>
import Vue from 'vue';
import Store from '../../services/Store';

export default {
    name: 'TabsLS',
    computed: {
        observerTab() {
            return Store.stackLS_CL.state;
        }
    },
    methods: {
        changeTab(tab) {
            Vue.set(Store.stackLS_CL, 'state', tab);
            Store.stackLS_CL.resetVue(Store.stackLS_CL);
        }
    }
}
</script>

<style lang="css" scoped>
</style>
