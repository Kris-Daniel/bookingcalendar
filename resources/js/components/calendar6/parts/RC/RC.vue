<template>
    <div class="RC">
        <CL :extended="true"></CL>
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
            
        }
    },
    created() {
        // setTimeout(() => {
        //     this.typeCL = 'week';
        // }, 2000)
    }
}
</script>