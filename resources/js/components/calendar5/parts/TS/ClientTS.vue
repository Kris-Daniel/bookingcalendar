<template>
    <div
        class="interval interval--client"
        :class="{checked: inStackTS}"
        @click="addToStackTS()"
    >
        <div>
            <div class="size15 bold mb10">
                {{client.name}}
            </div>
            <div class="size13 semi-bold">
                {{toHoursFormat(client.from)}} - {{toHoursFormat(client.to)}}
            </div>
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
