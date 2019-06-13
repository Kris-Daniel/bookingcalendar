<template>
    <div class="RC">
        <CL :state="stateCL" :extended="true"></CL>
    </div>
</template>

<script>

import CL from '../CL/CL';
export default {
    name: 'RC',
    components: {
        CL
    },
    data() {
        return {
            stateCL: 'month'
        }
    },
    created() {
        // setTimeout(() => {
        //     this.stateCL = 'week';
        // }, 2000)
    }
}
</script>