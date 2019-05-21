<template>
    <div class="client-box">
        <div class="client-overlay" v-if="client.ref" @click="close()"></div>
        <div
            class="client"
            :class="{active: client.ref}"
        >
            <div
                @click="close()"
                class="client_x"
                >
                <X></X>
            </div>
            <div class="client_img">

            </div>
            <div class="pv10"></div>
            <template v-if="client.name">
                <div class="client_name">{{client.name}}</div>
                <div class="pv10"></div>
                <div class="client_hr"></div>
                <div class="client_info">
                    <div class="client_icon"></div>
                    <div class="client_text"></div>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import X from '../../../../svg/x';
import Store from '../../services/Store';

export default {
    name: 'PopupClient',
    components: {
        X
    },
    computed: {
        client() {
            return Store.stackTS.getFirst();
        }
    },
    methods: {
        close() {
            Store.stackTS.resetVue(Store.stackTS);
        },
    }
}
</script>

<style lang="css" scoped>
</style>
