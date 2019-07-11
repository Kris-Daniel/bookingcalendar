<template>
    <div class="weekdays">
        WeekDays
    </div>
</template>

<script>
import Finder from 'Services/global/Finder';
export default {
    name: "WeekDays",
    created() {
        let customId = Finder.getParent(this, "customId");
        console.log("WeekDays", customId);
    }
}
</script>