<template>
    <div class="slide">
        <div class="day" v-for="n in offset" :key="n"></div>
        <MonthDay
            v-for="n in slide.days"
            :date="{day: n, month: slide.month, year: slide.year}"
            :key="'monthDay' + n"
            :extended="extended"
            :dayClick="dayClick"
            :checkedDays="checkedDays"
        ></MonthDay>
    </div>
</template>

<script>
import MonthDay from "../Day/MonthDay";
import HelperCL from "../helpers/HelperCL";
import Store from "../../../services/Store";

export default {
    name: "MonthSlide",
    components: {
        MonthDay
    },
    props: ["slide", "extended", "dayClick", "checkedDays"],
    created() {
        this.offset = 0;
        let dayStr = HelperCL.getDayStr(this.slide.year, this.slide.month, 1);
        let firstDayTime = new Date(dayStr);
        this.offset = firstDayTime.getDay();
        if (Store.settings.mondayFirst)
            this.offset = --this.offset < 0 ? 6 : this.offset;
    }
};
</script>