<template>
    <div
        @click="changeStateTS()"
        class="btn CL_btn--right"
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
            let val = (Store.stackTS.state == Store.state) ? false : Store.state;
            Vue.set(Store.stackTS, 'state', val);
        }
    }
}
</script>

<style lang="css" scoped>
</style>
