<template>
    <div class="toggle-sidebar-wrapper">
        <RetractableBlock :views="this.views"></RetractableBlock>
        <div class="overlay" :class="showOverlay" @click="hideOverlay()"></div>
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
            views: "",
            ToggledSidebarSTORE: ""
        }
    },
    computed: {
        showOverlay() {
            return this.ToggledSidebarSTORE.showOverlay ? "active" : "";
        }
    },
    created() {
        this.customId = this.options.name;
        this.$store.dispatch("registerToggledSidebarModule", this.options);
        this.ToggledSidebarSTORE = this.$store.state[this.customId];
        this.views = this.ToggledSidebarSTORE.views;
    },
    methods: {
        hideOverlay() {
            this.$store.dispatch("emptyCheckedDays", this.ToggledSidebarSTORE.calendarStoreRef);
            this.$store.commit("mainToggledSidebar/hideViews");
        }
    }
};
</script>