<template>
    <div
        class="interval interval--sch"
        :class="{checked: InLS_CL()}"
        @click="AddRemoveFromLS_CL()"
    >
        <div class="interval_date-grid">
            <div v-if="state == 'week'" class="size17 bold">
                {{data.name}}
            </div>
            <SquareDate v-else :data="data"></SquareDate>
        </div>
        <div class="interval_box">
            <div v-for="int in data.intervals" class="interval_text">
                <span>{{int.from}} - {{int.to}}</span>
            </div>
            <div v-if="!data.intervals.length" class="interval_text interval_text--off">
                day off
            </div>
        </div>
        <div class="interval_edit">
            <Pencil></Pencil>
        </div>
    </div>
</template>

<script>
import Store from '../../services/Store';
import Helper from '../../services/Helper';
import Pencil from '../../../../svg/pencil';
import SquareDate from './SquareDate';

export default {
    name: 'IntervalLS',
    props: ['data', 'state'],
    components: {
        Pencil,
        SquareDate
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
