<template>
    <div class="change-slide-wrapper">
        <component :is="view" @changeSlide="changeSlide"></component>
    </div>
</template>

<script>
import FindParentMixin from "VueMixins/FindParentMixin";
import ChangeSlideWeek from "./views/ChangeSlideWeek";
import ChangeSlideMonth from "./views/ChangeSlideMonth";

export default {
    name: "changeSlide",
    components: {
        ChangeSlideWeek,
        ChangeSlideMonth
    },
    mixins: [FindParentMixin],
    data() {
        return {
            store: ""
        }
    },
    computed: {
        view() {
            return this.exists(this.store, () => {
                return this.store.CalendarDATA.type == "month" ? "ChangeSlideMonth" : "ChangeSlideWeek";
            });
        }
    },
    methods: {
        changeSlide(side) {
            this.$emit("changeSlide", side);
        }
    }
};
</script>