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
import Helper from '../../services/Helper';

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
            return (Store.stackLS_CL.length && Store.state == 'standard');
        }
    },
    methods: {
        changeStateTS() {
            Helper.showTS();
        }
    }
}
</script>

<style lang="css" scoped>
</style>
