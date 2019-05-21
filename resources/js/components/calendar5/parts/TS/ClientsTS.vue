<template>
    <div
        class="calendar-side calendar-side--right"
        :class="{active: showTS && flag}"
    >
        <div class="TS_head">
            <div class="TS_title">Clients</div>
            <div class="TS_descr">For {{day.monthName}} {{day.name}} {{day.year}}</div>
        </div>
        <div class="intervals">
            <template v-for="client in clients">
                <ClientTS :client="client"></ClientTS>
            </template>
        </div>
    </div>
</template>

<script>
import Store from '../../services/Store';
import ClientTS from './ClientTS';

export default {
    name: 'ClientsTS',
    components: {
        ClientTS
    },
    data: function () {
        return {
            clientItems: []
        }
    },
    computed: {
        flag() {
            return (Store.stackTS.state == 'orders');
        },
        showTS() {
            return Store.showTS;
        },
        day() {
            if(Store.state == 'orders')
                return Store.stackLS_CL.getFirst();
            return {};
        },
        clients() {
            let clients = [];
            let day = this.day;
            if(day.bookingsAmount) {
                day.bookings.forEach(function(item, index) {
                    item.ref = day.ref + '-' + 'i' + index;
                    clients.push(item);
                });
            }
            return clients;
        }
    }
}
</script>

<style lang="css" scoped>
</style>
