<template>
    <div>
        <cleave v-model="card" :options="options" class="intervalInput"></cleave>
        <input type="hidden" :value="tt">
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
            card: this.time,
            options: {
                time: true,
                timeFormat: '24',
                timePattern: ['h', 'm']
            }
        }
    },
    computed: {
        tt() {
            console.log(this.card, 'time input');
            this.$emit('timeUpdated', this.card);
            return this.card;
        }
    },
    mounted() {
        console.log(this.time, 'time input 1');
    }
}
</script>

<style lang="css" scoped>
</style>
