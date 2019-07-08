<template>
    <div class="toggle-sidebar-wrapper">
        <RetractableBlock :views="this.views"></RetractableBlock>
        <div class="overlay" :class="showOverlay" @click="hideOverlay()"></div>
    </div>
</template>

<script>
import Vue from "vue";
import ToggledSidebarSTORE from "ToggledSidebarSTORE";
import CalendarSTORE from "CalendarSTORE";

import RetractableBlock from "ToggledSidebar/RetractableBlock/RetractableBlock";
Vue.component("RetractableBlock", RetractableBlock);

export default {
    name: "ToggledSidebarWrapper",
    computed: {
        showOverlay() {
            return ToggledSidebarSTORE.showOverlay ? "active" : "";
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