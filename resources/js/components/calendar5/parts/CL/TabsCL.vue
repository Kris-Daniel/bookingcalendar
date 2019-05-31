<template>
    <div class="CL_tabs">
        <div class="CL_tab-grid">
            <div
                class="CL_tab CL_tab--left"
                :class="{active: tabObserver == 'standard'}"
                @click="changeTab('standard')"
            >
                <span class="CL_tab_text">Schedule</span>
            </div>
        </div>
        <div class="CL_tab-grid">
            <div
                class="CL_tab CL_tab--right"
                :class="{active: tabObserver == 'orders'}"
                @click="changeTab('orders')"
            >
                <span class="CL_tab_text">Bookings</span>
            </div>
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
