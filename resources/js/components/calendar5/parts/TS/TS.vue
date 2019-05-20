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
            let dcal = document.querySelector('.dcal');
            if(Store.stackLS_CL.length == 0) {
                Store.stackTS.state = false;
            }
            if(!Store.stackTS.state && dcal) {
                dcal.className = 'dcal';
            } else if(dcal) {
                dcal.className = 'dcal overlay';
            }
            return Store.stackLS_CL.length;
        }
    }
}
</script>

<style>
</style>
