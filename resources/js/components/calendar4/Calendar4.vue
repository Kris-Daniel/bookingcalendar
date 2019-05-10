<template>
    <div class="dcal">
        <LS></LS>
        <CL></CL>
    </div>
</template>

<script>
import CL from './parts/CL/CL';
import LS from './parts/LS/LS';

import Store from './services/Store';

export default {
    name: 'calendar4',
    components: {
        CL,
        LS
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
