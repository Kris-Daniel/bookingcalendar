<template>
    <div
        class="interval interval-sch"
        :class="{checked: InLS_CL()}"
        @click="AddRemoveFromLS_CL()"
    >
        <div v-if="state == 'week'" class="dateBox">
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
    props: ['data', 'state'],
    components: {
        Pencil
    },
    methods: {
        AddRemoveFromLS_CL() {
            Helper.dayClick(this.data);
        },
        InLS_CL() {
            let checked = Store.stackLS_CL.inStack(this.data) ? true : false;
            checked = (Store.state == 'standard') ? checked : false;
            return checked;
        }
    }
}
</script>

<style lang="css" scoped>
</style>
