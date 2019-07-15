<template>
    <div class="tabs">
        <div class="tabs_titles">
            <div
                v-for="n in length"
                class="tabs_title"
                :class="isActive(n)"
                @click="setTab(n)"
                :key="'title' + n"
            >
                <slot :name="'title-' + n"></slot>
            </div>
        </div>

        <div class="tabs_contents">
            <div v-for="n in length" class="tabs_content" :class="isActive(n)" :key="'content' + n">
                <slot :name="'content-' + n" :activeTab="activeTab"></slot>
            </div>
        </div>
        
    </div>
</template>

<script>
export default {
    name: "Tabs",
    props: ["length"],
    data() {
        return {
            activeTab: 1
        };
    },
    created() {
        this.$emit("tabChanged", this.activeTab);
    },
    methods: {
        isActive(n) {
            if (this.activeTab == n) return "active";
            return "";
        },
        setTab(n) {
            this.activeTab = n;
            this.$emit("tabChanged", this.activeTab);
        }
    }
};
</script>