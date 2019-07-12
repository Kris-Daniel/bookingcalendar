import Vue from 'vue';
import TestingMixin from "Mixins/TestingMixin";

export default class{
    constructor() {
        this.setGlobalMixins();
    }

    setGlobalMixins() {
        Vue.mixin(TestingMixin);
    }
}