<template>
    <div class="dcal" ref="dcal" :class="[state, {overlay}]">
        <div class="dcal_mask" @click="removeOverlay()"></div>
        <PopupClient></PopupClient>
        <LS></LS>
        <CL></CL>
        <TS></TS>
    </div>
</template>

<script>
import Vue from 'vue';
import CL from './parts/CL/CL';
import LS from './parts/LS/LS';
import TS from './parts/TS/TS';
import PopupClient from './parts/Popup/Client';
import * as $ from 'jquery';
import Store from './services/Store';
import Swipable from './services/Swipe';

export default {
    name: 'calendar5',
    components: {
        CL,
        LS,
        TS,
        PopupClient
    },
    mounted() {
        let box = this.$refs.dcal;
        // Swipable(box, '.LS', $);
    },
    computed: {
        state() {
            return Store.state;
        },
        overlay() {
            if(Store.overlay)
                $('body').addClass('overflow-hidden');
            else
                $('body').removeClass('overflow-hidden');
            return Store.overlay;
        }
    },
    methods: {
        removeOverlay() {
            Vue.set(Store, 'showTS', false);
            Vue.set(Store, 'showLS', false);
            Vue.set(Store, 'overlay', false);
            Store.stackTS.resetVue(Store.stackTS);
            if(Store.state == 'orders')
                Store.stackLS_CL.resetVue(Store.stackLS_CL);
        }
    },
    created() {
        // $("body").on("swipe",function(){
        //   console.log('swiped');
        // });
    }
}
</script>

<style>
</style>
