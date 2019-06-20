<template>
    <div class="slide">
        <!-- <div class="day" v-for="n in offset" :key="n"></div> -->
        <table>
            <tr v-for="n in slide.length" :key="'tr' + n">
                <td v-for="d in slide[n - 1]" :key="'day' + d">
                    <WeekDay
                        :date="d"
                        :extended="extended"
                        :dayClick="dayClick"
                        :checkedDays="checkedDays"
                    ></WeekDay>
                </td>
            </tr>
        </table>
    </div>
</template>

<script>
import WeekDay from "../Day/WeekDay";
import HelperCL from "../helpers/HelperCL";
import Store from "../../../services/Store";

export default {
    name: "MonthSlide",
    components: {
        WeekDay
    },
    props: ["slide", "extended", "dayClick", "checkedDays"],
    created() {
        // this.offset = 0;
        // let dayStr = HelperCL.getDayStr(this.slide.year, this.slide.month, 1);
        // let firstDayTime = new Date(dayStr);
        // this.offset = firstDayTime.getDay();
        // if (Store.settings.mondayFirst)
        //     this.offset = --this.offset < 0 ? 6 : this.offset;
    }
};
</script>