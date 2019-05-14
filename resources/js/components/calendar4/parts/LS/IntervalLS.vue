<template>
    <div
        class="interval interval-sch"
        :class="{checked: data.checked}"
        @click="click(data)"
    >
        <div v-if="tab == 'week'" class="dateBox">
            {{data.name}}
        </div>
        <div v-else class="dateBox">
            <div class="dateBox_day">{{data.name}}</div>
            <div class="dateBox_month">{{data.monthName.slice(0, 3)}}</div>
        </div>
        <div class="timeBox">
            <div v-for="int in data.intervals" class="timeBox_time">
                <span>{{int.from}} - {{int.to}}</span>
            </div>
            <div v-if="!data.intervals.length" class="timeBox_time timeBox_time-off">
                day off
            </div>
        </div>
        <div class="edit">
            <Pencil></Pencil>
        </div>
    </div>
</template>

<script>
import Store from '../../services/Store';
import Helper from '../../services/Helper';
import Pencil from '../../../../svg/pencil';

export default {
    name: 'IntervalLS',
    props: ['data', 'tab'],
    components: {
        Pencil
    },
    methods: {
        click(day) {
            Helper.dayClick(day);
        }
    }
}
</script>

<style lang="css" scoped>
</style>
