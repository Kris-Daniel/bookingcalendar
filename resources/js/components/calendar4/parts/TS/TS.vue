<template>
    <div class="TS">
        <ClientsTS></ClientsTS>
        <DayIntervalsTS></DayIntervalsTS>
        <EditDayTS></EditDayTS>
    </div>
</template>

<script>

// TS views
import ClientsTS from './ClientsTS';
import DayIntervalsTS from './DayIntervalsTS';
import EditDayTS from './EditDayTS';

import Store from '../../services/Store';

export default {
    name: 'TS',
    components: {
        ClientsTS,
        DayIntervalsTS,
        EditDayTS,
    },
    data: function() {
        return {
            store: Store
        }
    },
    created: function()
    {

    }
}
</script>

<style>
</style>
