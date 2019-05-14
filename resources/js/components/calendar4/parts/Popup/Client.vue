<template>
    <div class="clientPopup">
        <div
            v-if="TS.client"
            @click="close()"
            class="client_mask"
        ></div>
        <div
            class="client"
            :class="{active: TS.client}"
        >
            <div class="client_box">
                <div
                    @click="close()"
                    class="client_x"
                >
                    <X></X>
                </div>
                <div class="client_img">

                </div>
                <div class="client_name">{{TS.client.name}}</div>
                <div class="client_hr"></div>
                <div class="client_info">
                    <div class="client_icon"></div>
                    <div class="client_text"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'PopupClient',
    methods: {
        close()
        {

        }
    }
}
</script>

<style lang="css" scoped>
</style>
