<template>
    <div class="change-slide center mb16">
        <div class="dark size18">{{from}} - {{to}}</div>
        <div @click="changeSlide('prev')" class="change-slide_btn change-slide_btn--prev">
            <AngleLeft></AngleLeft>
        </div>
        <div @click="changeSlide('next')" class="change-slide_btn change-slide_btn--next">
            <AngleRight></AngleRight>
        </div>
    </div>
</template>

<script>
import FindParentMixin from "VueMixins/FindParentMixin";
import ChangeSlideMixin from "VueMixins/ChangeSlideMixin";
import DateService from "VueServices/date/DateService";
import store from "VueStore/GlobalSTORE";

export default {
    name: "WeekChangeSlide",
    mixins: [FindParentMixin, ChangeSlideMixin],
    data() {
        return {
            store: "",
            from: "",
            to: ""
        };
    },
    computed: {
        weeks() {
            return this.exists(this.store, () => {
                return this.store.CalendarDATA.slides;
            });
        }
    },
    watch: {
        weeks() {
            this.setText();
        }
    },
    mounted() {
        this.setText();
    },
    methods: {
        changeSlide(side) {
            this.changeSlideWithDelay(this, side);
        },
        setText() {
            if (this.weeks[1]) {
                let daysInWeek = DateService.getWeek(
                    this.weeks[1],
                    this.store.settings.mondayFirst
                );
                let dateFrom = new Date(daysInWeek[0] * 86400000);
                let dateTo = new Date(daysInWeek[6] * 86400000);
                this.from = this.getDayAndShortMonth(dateFrom);
                this.to = this.getDayAndShortMonth(dateTo);
            }
        },
        getDayAndShortMonth(date) {
            let d = date.getDate();
            let m = date.getMonth();
            let shortMonth = store.state.Constants.MONTHS[m];
            return d + " " + shortMonth;
        }
    }
};
</script>