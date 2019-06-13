<template>
    <div class="slide">
        <template v-if="state == 'week'">
            <Day v-for="n in 7" :day="{type: 'week', dayN: slide[n -1]}" :key="n"></Day>
        </template>
        <template v-else>
            <Day v-for="n in slide.days" :day="{type: 'month', dayM: n, YM}" :key="n"></Day>
        </template>
    </div>
</template>

<script>
import Day from "./Day";
export default {
    name: "Slide",
    components: {
        Day
    },
    props: ["slide", "state"],
    data() {
        return {
            YM: {
                month: this.slide.month,
                year: this.slide.year
            }
        };
    },
    created() {},
    methods: {}
};
</script>