<template>
    <div
        class="interval interval-hours"
        :class="{checked: isChecked}"
        @click="click()"
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
    name: 'IntervalTS',
    props: ['client', 'index'],
    computed: {
        isChecked() {
            if(Store.stackTS.inStack({ref: 'client' + this.index}))
                return true;
            return false;
        }
    },
    methods: {
        toHoursFormat(time) {
            return time ? Helper.toHoursFormat(time) : '';
        },
        click() {
            let ref = 'client' + this.index;
            Store.stackTS.addRemoveOnce({
                ref,
                data: this.client
            }, Store.stackTS);
        },
        getRefClient(ci) {
            if(this.$refs.clientItems)
                return this.$refs.clientItems[ci];
            return false;
        }
    },
}
</script>

<style lang="css" scoped>
</style>
