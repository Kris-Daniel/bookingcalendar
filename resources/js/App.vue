<template>
    <div id="app">
        <!-- <header-view></header-view> -->
        <home></home>
        <!-- <footer-view></footer-view> -->
    </div>
</template>

<script>
    import GlobalComponents from './services/GlobalComponents';
    import HeaderView from "./views/HeaderView";
    import Home from "./views/Home";
    import FooterView from "./views/FooterView";

    GlobalComponents();
    export default {
        name: "App",
        components: {
            FooterView,
            Home,
            HeaderView
        }
    };
</script>

<style></style>
