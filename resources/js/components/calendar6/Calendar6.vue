<template>
    <div class="CC" ref="CC">
        <CalendarsWrapper></CalendarsWrapper>
        <ToggledSidebarWrapper></ToggledSidebarWrapper>
    </div>
</template>

<script>
import Vue from "vue";
import Vuex from "vuex";

import * as $ from "jquery";
import CalendarsWrapper from "./parts/CalendarsWrapper/CalendarsWrapper";
import ToggledSidebarWrapper from "./parts/ToggledSidebar/ToggledSidebarWrapper";

import vClickOutside from 'v-click-outside';
Vue.use(vClickOutside);

export default {
    name: "calendar6",
    components: {
        CalendarsWrapper,
        ToggledSidebarWrapper
    },
    mounted() {
        // let box = this.$refs.CC;
    },
    computed: {},
    methods: {},
    created() {}
};
</script>

<style>
</style>
