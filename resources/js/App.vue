<template>
    <div id="app">
        <header-view></header-view>
        <home></home>
        <footer-view></footer-view>
    </div>
</template>

<script>

    import HeaderView from "./views/HeaderView";
    import Home from "./views/Home";
    import FooterView from "./views/FooterView";
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
