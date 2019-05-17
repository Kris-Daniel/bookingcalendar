<template>
    <div>
        <cleave v-model="value" :options="options" class="intervalInput" @input="changeValue($event)"></cleave>
    </div>
</template>

<script>
import Cleave from 'vue-cleave-component';
// Vue.use(Cleave);

export default {
    name: 'InputTS',
    props: ['time'],
    components: {
        Cleave,
    },
    data: function() {
        return {
            value: this.time,
            options: {
                time: true,
                timeFormat: '24',
                timePattern: ['h', 'm']
            },
        }
    },
    computed: {
        timeWatcher() {
            this.value = this.time;
            // this.refreshFlag = false;
            console.log(this.time, 'time updated');
            return this.time;
        }
    },
    mounted() {
        this.refreshFlag = false;
    },
    methods: {

    }
}
</script>

<style lang="css" scoped>
</style>
