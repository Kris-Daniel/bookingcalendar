<template>
    <div class="dcal_days">
        <div
                class="dcal_dayGrid" v-for="day in currentMonthDays"
                :class="{'dcal_day-selected': day.selected}"
        >
            <div class="dcal_day">
                <input type="checkbox" class="dcal_dayInput"
                       :id="newYear + currentMonth + day.number">
                <label :for="newYear + currentMonth + day.number"
                       class="dcal_daySelect">
                    <span class="checked">X</span>
                </label>
                <div class="dcal_num">
                    {{ day.number }}
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    export default {
        name: 'day',
        props: {currentMonthDays}
    }
</script>