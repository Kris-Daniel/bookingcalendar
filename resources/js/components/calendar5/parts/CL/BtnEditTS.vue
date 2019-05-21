<template>
    <div
        @click="changeStateTS()"
        class="btn"
        v-if="showEdit"
    >
        {{text}}
    </div>
</template>

<script>
import Vue from 'vue';
import Store from '../../services/Store';

export default {
    name: 'BtnEditTS',
    computed: {
        text() {
            if(Store.state == 'standard')
                return 'Edit';
            else
                return 'Show'
        },
        showEdit() {
            return Store.stackLS_CL.length ? true : false;
        }
    },
    methods: {
        changeStateTS() {
            Store.showTS = true;
            Store.showLS = false;
            Store.overlay = true;
            Vue.set(Store.stackTS, 'state', Store.state);
        }
    }
}
</script>

<style lang="css" scoped>
</style>
