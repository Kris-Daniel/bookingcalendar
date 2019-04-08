<template>
    <main>
        Home here
        
        <calendar2></calendar2>
    </main>
</template>

<script>
    import Datetime from "../components/calendar/Datetime";
    import Calendar2 from "../components/calendar2/Calendar2";
    export default {
        name: 'home',
        components: {Calendar2},
        data() {
            return {

            }
        }
    }
</script>