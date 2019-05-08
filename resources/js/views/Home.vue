<template>
    <main>
        Home here

        <calendar4></calendar4>
    </main>
</template>

<script>
    import Datetime from "../components/calendar/Datetime";
    import calendar4 from "../components/calendar4/Calendar4";
    export default {
        name: 'home',
        components: {calendar4},
        data() {
            return {

            }
        }
    }
</script>
