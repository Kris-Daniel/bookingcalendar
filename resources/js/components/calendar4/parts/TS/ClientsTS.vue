<template>
    <div
        class="TS_float"
        :class="{active: (flag == 'clients' && state == 'orders')}"
    >
        <div class="TS_head">
            <div class="TS_title">Clients</div>
            <div class="TS_descr">For {{day.monthName}} {{day.name}} {{day.year}}</div>
        </div>
        <div class="intervals">
            <div
                v-for="client in clients"
                class="interval interval-hours"
            >
                <div class="interval_title">
                    {{client.name}}
                </div>
                <div class="timeBox">
                    {{toHoursFormat(client.from)}} - {{toHoursFormat(client.to)}}
                </div>

            </div>
        </div>
    </div>
</template>

<script>
import Helper from '../../services/Helper';
import Store from '../../services/Store';

export default {
    name: 'ClientsTS',
    computed: {
        state() {
            return Store.state;
        },
        flag() {
            return Store.TS.state;
        },
        MONTHS() {
            return Store.MONTHS
        },
        day() {
            let day = {};
            if(Store.state == 'orders')
                for(let i in Store.LS_CL.stack)
                    day = Store.LS_CL.stack[i];
            return day;
        },
        clients() {
            let intervals = [];
            if(Store.bookings[this.day.ref])
                intervals = Store.bookings[this.day.ref];;
            return intervals;
        }
    },
    methods: {
        toHoursFormat(time) {
            return time ? Helper.toHoursFormat(time) : '';
        }
    }
}
</script>

<style lang="css" scoped>
</style>
