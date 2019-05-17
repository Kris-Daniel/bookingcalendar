<template>
    <div
        class="interval interval-hours"
        :class="{checked: inStackTS}"
        @click="addToStackTS()"
    >
        <div class="interval_title">
            {{client.name}}
        </div>
        <div class="timeBox">
            {{toHoursFormat(client.from)}} - {{toHoursFormat(client.to)}}
        </div>
    </div>
</template>

<script>
import Helper from '../../services/Helper';
import Store from '../../services/Store';

export default {
    name: 'ClientTS',
    props: ['client'],
    computed: {
        inStackTS() {
            let checked = Store.stackTS.inStack(this.client);
            return checked;
        }
    },
    methods: {
        toHoursFormat(time) {
            return time ? Helper.toHoursFormat(time) : '';
        },
        addToStackTS() {
            Store.stackTS.addRemoveOnce(this.client, Store.stackTS);
            console.log(Store.stackTS);
        },
    },
}
</script>

<style lang="css" scoped>
</style>
