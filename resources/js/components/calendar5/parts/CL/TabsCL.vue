<template>
    <div class="tabsCL">
        <div class="tab_grid">
            <div
                class="tab tab-left"
                :class="{active: tabObserver == 'standard'}"
                @click="changeTab('standard')"
            ><span>Work hours</span></div>
        </div>
        <div class="tab_grid">
            <div
                class="tab tab-right"
                :class="{active: tabObserver == 'orders'}"
                @click="changeTab('orders')"
            ><span>Your orders</span></div>
        </div>
        <input type="hidden" name="" :value="tabObserver">
    </div>
</template>

<script>
import Vue from 'vue';
import Store from '../../services/Store';

export default {
    name: 'TabsCL',
    computed: {
        tabObserver() {
            return Store.state;
        }
    },
    methods: {
        changeTab(state) {
            if(state != this.tabObserver) {
                Vue.set(Store, 'state', state);
                Store.stackLS_CL.resetVue(Store.stackLS_CL);
            }
        }
    }
}
</script>

<style lang="css" scoped>
</style>
