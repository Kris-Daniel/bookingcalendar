<template>
    <div class="change-slide-wrapper">
        <div class="change-slide">
            <div class="change-slide_month">{{month}}</div>
            <div class="change-slide_year">{{year}}</div>
            <div @click="changeSlide('prev')" class="change-slide_btn change-slide_btn--prev">
                <AngleLeft></AngleLeft>
            </div>
            <div @click="changeSlide('next')" class="change-slide_btn change-slide_btn--next">
                <AngleRight></AngleRight>
            </div>
        </div>
    </div>
</template>
<script>
import CalendarMixin from "Mixins/CalendarMixin";
import ChangeSlideMixin from "Mixins/ChangeSlideMixin";

export default {
    name: "ChangeSlideMonth",
    mixins: [CalendarMixin, ChangeSlideMixin],
    data() {
        return {
            store: "",
            month: "",
            year: ""
        };
    },
    computed: {
        months() {
            return this.exists(this.store, () => {
                return this.store.CalendarDATA.slides;
            });
        }
    },
    watch: {
        months() {
            this.setText();
        }
    },
    created() {
        this.setText();
    },
    methods: {
        changeSlide(side) {
            this.changeSlideWithDelay(this, side);
        },
        setText() {
            if (this.months) {
                this.year = Math.floor(this.months[1] / 12);
                this.monthIndex = this.months[1] - this.year * 12;
                this.month = this.store.constants.MONTHS[this.monthIndex];
            }
        }
    }
};
</script>