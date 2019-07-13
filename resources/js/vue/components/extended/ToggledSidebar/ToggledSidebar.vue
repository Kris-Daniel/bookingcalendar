<template>
    <div class="toggle-sidebar-wrapper">
        <!-- <RetractableBlock :views="this.views"></RetractableBlock> -->
        <!-- <div class="overlay" :class="showOverlay" @click="hideOverlay()"></div> -->
    </div>
</template>

<script>
import Vue from "vue";
import store from "Store/GlobalSTORE";

export default {
    name: "ToggledSidebarWrapper",
    store,
    props: ["options"],
    data() {
        return {
            views: ""
        }
    },
    computed: {
        // showOverlay() {
        //     return ToggledSidebarSTORE.showOverlay ? "active" : "";
        // }
    },
    created() {
        this.customId = this.options.name;
        this.$store.dispatch("registerToggledSidebarModule", this.options);

        console.log(this.$store.state[this.options.name]);

        // this.views = ToggledSidebarSTORE.views;
    },
    methods: {
        hideOverlay() {
            // ToggledSidebarSTORE.disableViews();
        }
    }
};
</script>