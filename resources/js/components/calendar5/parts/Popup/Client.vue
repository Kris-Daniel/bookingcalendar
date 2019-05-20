<template>
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
        <template v-if="client.name">
            <div class="client_name">{{client.name}}</div>
            <div class="client_hr"></div>
            <div class="client_info">
                <div class="client_icon"></div>
                <div class="client_text"></div>
            </div>
        </template>
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
    methods: {
        close() {
            Store.stackTS.resetVue(Store.stackTS);
        }
    },
    computed: {
        client() {
            return Store.stackTS.getFirst();
        }
    }
}
</script>

<style lang="css" scoped>
</style>
