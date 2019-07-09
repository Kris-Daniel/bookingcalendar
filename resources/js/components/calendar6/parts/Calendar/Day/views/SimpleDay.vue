<template>
    <div class="day_inside day--simple">
        <div class="day--circle" @click="click">
            <div class="day_a-center">{{dayInfo.day}}</div>
        </div>
    </div>
</template>

<script>
import CalendarHelper from "Calendar/helpers/CalendarHelper";
import CalendarSTORE from "Calendar/helpers/CalendarSTORE";

import Pencil from "MySvg/pencil";
import AngleDown from "MySvg/angle-down";

export default {
    name: "SimpleDay",
    props: ["dayInfo", "calendarId"],
    components: {
        Pencil,
        AngleDown
    },
    computed: {},
    created() {
        this.CalendarDATA = CalendarSTORE.calendars[this.calendarId];
    },
    methods: {
        click() {
            let data = {
                dayInfo: this.dayInfo
            };
            this.$emit('sendData', data);
        }
    }
};
</script>