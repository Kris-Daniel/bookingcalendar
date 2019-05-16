<template>
    <div>
        <cleave v-model="value" :options="options" class="intervalInput" @input="changeValue($event)"></cleave>
        <input type="hidden" :value="timeWatcher">
        <input type="hidden" :value="temp">
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
            temp: this.time,
            options: {
                time: true,
                timeFormat: '24',
                timePattern: ['h', 'm']
            },
            refreshFlag: true
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
        changeValue($event) {
            if(this.refreshFlag) {
                this.$emit('timeUpdated', this.value);
                this.$emit('inEditSet');
                console.log($event, 'key');
            }
            this.refreshFlag = true;
        }
    }
}
</script>

<style lang="css" scoped>
</style>
