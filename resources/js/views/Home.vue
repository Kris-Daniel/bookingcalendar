<template>
    <main>
        Home here

        <calendar3></calendar3>
    </main>
</template>

<script>
    import Datetime from "../components/calendar/Datetime";
    import Calendar3 from "../components/calendar3/Calendar3";
    export default {
        name: 'home',
        components: {Calendar3},
        data() {
            return {

            }
        }
    }
</script>
