<template>
    <div class="dcal">
        hello
        <CL></CL>
    </div>
</template>

<script>
import CL from './parts/CL/CL';

import Store from './services/Store';

export default {
    name: 'calendar4',
    components: {
        CL,
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
