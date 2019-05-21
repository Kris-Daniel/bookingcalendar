<template>
    <div class="TS">
        <ClientsTS></ClientsTS>
        <DayIntervalsTS></DayIntervalsTS>
        <InputsTS></InputsTS>
        <input type="hidden" name="" :value="observerStackLS_CL">
    </div>
</template>

<script>

// TS views
import ClientsTS from './ClientsTS';
import DayIntervalsTS from './DayIntervalsTS';
import InputsTS from './InputsTS';
import * as $ from 'jquery';

import Store from '../../services/Store';

export default {
    name: 'TS',
    components: {
        ClientsTS,
        DayIntervalsTS,
        InputsTS,
    },
    computed: {
        observerStackLS_CL() {
            let $dcal = $('.dcal');
            let $body = $('body');
            if(Store.stackLS_CL.length == 0) {
                Store.stackTS.state = false;
                Store.showTS = false;
            }
            return Store.stackLS_CL.length;
        }
    }
}
</script>

<style>
</style>
