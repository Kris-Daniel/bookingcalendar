<template>
    <main>
        Home here

        <calendar5></calendar5>
    </main>
</template>

<script>
    import Datetime from "../components/calendar/Datetime";
    import calendar5 from "../components/calendar5/Calendar5";
    export default {
        name: 'home',
        components: {calendar5},
        data() {
            return {

            }
        }
    }
</script>
