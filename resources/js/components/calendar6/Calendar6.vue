<template>
    <div class="CC" ref="CC">
        <RC></RC>
        <TS></TS>
    </div>
</template>

<script>
import Vue from 'vue';
import * as $ from 'jquery';
import RC from './parts/RC/RC';
import TS from './parts/TS/TS';

export default {
    name: 'calendar6',
    components: {
        RC,
        TS
    },
    mounted() {
        // let box = this.$refs.CC;
    },
    computed: {
        
    },
    methods: {
        
    },
    created() {
        
    }
}
</script>

<style>
</style>
