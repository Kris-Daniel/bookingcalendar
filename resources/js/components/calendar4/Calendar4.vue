<template>
    <div class="hi">
        hello
    </div>
</template>

<script>

import CalendarClass from './services/GetCalendar';
// import RenderCalendar from './services/GetCalendar';
let InsCalendar = new CalendarClass();
let RenderCalendar = new CalendarClass();

export default {
    name: 'calendar4',
    data: function() {
        return {
            store: {
                settings: RenderCalendar.settings,
                state: 'standard',
                LS_CL: {
                    state: 'week',
                },
                schedule: RenderCalendar.schedule,
                bookings: RenderCalendar.bookings
            }
        }
    },
    created: function()
    {
        console.log(this.store);
    }
}
</script>

<style>
</style>
