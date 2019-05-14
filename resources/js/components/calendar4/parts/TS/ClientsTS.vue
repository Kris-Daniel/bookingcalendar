<template>
    <div
        class="TS_float"
        :class="{active: flag}"
    >
        <div class="TS_head">
            <div class="TS_title">Clients</div>
            <div class="TS_descr">For {{day.monthName}} {{day.name}} {{day.year}}</div>
        </div>
        <div class="intervals">
            <template v-for="client, index in clients">
                <IntervalTS :client="client" :index="index"></IntervalTS>
            </template>
        </div>
    </div>
</template>

<script>
import Store from '../../services/Store';
import IntervalTS from './IntervalTS';

export default {
    name: 'ClientsTS',
    components: {
        IntervalTS
    },
    data: function () {
        return {
            clientItems: []
        }
    },
    computed: {
        flag() {
            return (Store.TS.state == 'clients' && Store.state == 'orders');
        },
        day() {
            if(Store.state == 'orders')
                return Store.stackLS_CL.getFirst();
            return {};
        },
        clients() {
            let clients = [];
            if(Store.bookings[this.day.ref])
                clients = Store.bookings[this.day.ref];
            return clients;
        }
    }

}
</script>

<style lang="css" scoped>
</style>
