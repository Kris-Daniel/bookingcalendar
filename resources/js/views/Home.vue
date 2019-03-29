<template>
    <main>
        Home here
        
        <calendar2 v-model="datenow"></calendar2>
    </main>
</template>

<script>
    import Datetime from "../components/calendar/Datetime";
    import Calendar2 from "../components/calendar2/Calendar2";
    export default {
        name: 'home',
        components: {Calendar2, Datetime},
        data() {
            return {
                datenow: new Date().toISOString(),
            }
        }
    }
</script>