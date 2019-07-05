<template>
    <div class="toggle-sidebar-wrapper">
        <RetractableBlock :views="this.views"></RetractableBlock>
        <div class="overlay" :class="showOverlay" @click="hideOverlay()"></div>
    </div>
</template>

<script>
import Vue from "vue";
import ToggledSidebarSTORE from "./helpers/ToggledSidebarSTORE";
import CalendarSTORE from "../Calendar/helpers/CalendarSTORE";

import RetractableBlock from './RetractableBlock/RetractableBlock';
Vue.component('RetractableBlock', RetractableBlock);

export default {
    name: "ToggledSidebarWrapper",
    components: {
        
    },
    computed: {
        showOverlay() {
            return ToggledSidebarSTORE.showOverlay ? 'active' : '';
        }
    },
    created() {
        this.views = ToggledSidebarSTORE.views;
    },
    methods: {
        hideOverlay() {
            ToggledSidebarSTORE.disableViews();
        }
    }
};
</script>