<template>
    <div class="dcal">
        <LS></LS>
        <CL></CL>
        <TS></TS>
    </div>
</template>

<script>
import CL from './parts/CL/CL';
import LS from './parts/LS/LS';
import TS from './parts/TS/TS';

import Store from './services/Store';

export default {
    name: 'calendar4',
    components: {
        CL,
        LS,
        TS
    },
    data: function() {
        return {
            store: Store
        }
    },
    created: function()
    {
        console.log(this.store);
    }
}
</script>

<style>
</style>
