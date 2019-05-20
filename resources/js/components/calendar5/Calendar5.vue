<template>
    <div class="dcal" :class="state">
        <div class="dcal_mask" @click="removeOverlay()"></div>
        <PopupClient></PopupClient>
        <LS></LS>
        <CL></CL>
        <TS></TS>
    </div>
</template>

<script>
import CL from './parts/CL/CL';
import LS from './parts/LS/LS';
import TS from './parts/TS/TS';
import PopupClient from './parts/Popup/Client';

import Store from './services/Store';

export default {
    name: 'calendar5',
    components: {
        CL,
        LS,
        TS,
        PopupClient
    },
    computed: {
        state() {
            return Store.state;
        }
    },
    methods: {
        removeOverlay() {
            Store.stackTS.state = false;
            Store.stackTS.resetVue(Store.stackTS);
        }
    }
}
</script>

<style>
</style>
