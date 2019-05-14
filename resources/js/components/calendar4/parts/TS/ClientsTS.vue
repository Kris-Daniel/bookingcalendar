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
                ref="clientItems"
                v-for="client, index in clients"
                class="interval interval-hours"
                :class="{checked: checkedClient == getClient(index)}"
                @click="clientClick(index)"
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
    data: function () {
        return {
            checkedClient: false
        }
    },
    computed: {
        state() {
            return Store.state;
        },
        flag() {
            return Store.TS.state;
        },
        day() {
            let day = {};
            if(Store.state == 'orders')
                for(let i in Store.LS_CL.stack)
                    day = Store.LS_CL.stack[i];
            return day;
        },
        clients() {
            this.checkedClient = false;
            let clients = [];
            if(Store.bookings[this.day.ref])
                clients = Store.bookings[this.day.ref];
            return clients;
        }
    },
    methods: {
        toHoursFormat(time) {
            return time ? Helper.toHoursFormat(time) : '';
        },
        clientClick(ci) {
            this.checkedClient = this.$refs.clientItems[ci];
        },
        getClient(ci) {
            if(this.$refs.clientItems) {
                return this.$refs.clientItems[ci];
            }
            return true;
        }
    },
}
</script>

<style lang="css" scoped>
</style>
