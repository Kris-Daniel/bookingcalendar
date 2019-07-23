import Vue from 'vue';
import TestingMixin from "VueMixins/TestingMixin";

export default class{
    constructor() {
        this.setGlobalMixins();
    }

    setGlobalMixins() {
        Vue.mixin(TestingMixin);
    }
}