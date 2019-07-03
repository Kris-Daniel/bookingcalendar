<template>
    <div class="CC" ref="CC">
        <CalendarsWrapper></CalendarsWrapper>
        <RightSlideBlock></RightSlideBlock>
    </div>
</template>

<script>
import Vue from 'vue';
import * as $ from 'jquery';
import CalendarsWrapper from './parts/CalendarsWrapper/CalendarsWrapper';
import RightSlideBlock from './parts/RightSlideBlock/RightSlideBlock';

export default {
    name: 'calendar6',
    components: {
        CalendarsWrapper,
        RightSlideBlock
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
