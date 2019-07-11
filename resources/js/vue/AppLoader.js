import Vue from "vue";
import App from "./App";
import router from "./router/router";

import LoaderComponents from './loaders/LoaderComponents';
import LoaderSvg  from './loaders/LoaderSvg';
import LoaderStore from './loaders/LoaderStore';
import LoaderMixins from './loaders/LoaderMixins';

const AppLoader = class {
    constructor() {
        this.setGlobalSvg()
            .setGlobalComponents()
            .setGlobalStore()
            .setGlobalMixins()
            .render();
    }

    setGlobalSvg() {
        this.svg = new LoaderSvg();

        return this;
    }
    
    setGlobalComponents() {
        this.components = new LoaderComponents();
        
        return this;
    }

    setGlobalStore() {
        this.store = new LoaderStore();

        return this;
    }

    setGlobalMixins() {
        this.mixins = new LoaderMixins();
        return this;
    }

    render() {
        new Vue({
            router,
            render: h => h(App)
        }).$mount("#app");
    }
}

export default AppLoader;