<template>
    <div class="toggle-sidebar-wrapper">
        <RetractableBlock :views="this.views"></RetractableBlock>
        <ValidationWatcher></ValidationWatcher>
        <div class="overlay" :class="showOverlay" @click="hideOverlay()"></div>
    </div>
</template>

<script>
import Vue from "vue";
import store from "VueStore/GlobalSTORE";
import ValidationWatcher from "./ValidationWatcher/ValidationWatcher";

export default {
    name: "ToggledSidebar",
    store,
    props: ["options"],
    components: {
        ValidationWatcher
    },
    data() {
        return {
            views: "",
            ToggledSidebarSTORE: ""
        }
    },
    computed: {
        showOverlay() {
            if(this.ToggledSidebarSTORE.showOverlay) {
                document.querySelector("body").style.overflow = "hidden";
                return "active"
            }
            document.querySelector("body").style.overflow = "auto";
            return "";
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
            this.$store.commit(`${this.customId}/hideViews`);
        }
    }
};
</script>