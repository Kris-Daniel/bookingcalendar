import Vue from "vue";
import App from "./App";
import router from "./router/router";

import LoaderComponents from './loaders/LoaderComponents';
import LoaderSvg  from './loaders/LoaderSvg';
import LoaderStore from './loaders/LoaderStore';
import LoaderMixins from './loaders/LoaderMixins';
import DirectiveMixins from './loaders/LoaderDirectives';

const AppLoader = class {
    constructor() {
        this.setGlobalSvg()
            .setGlobalComponents()
            .setGlobalStore()
            .setGlobalMixins()
            .setGlobalDirectives()
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

    setGlobalDirectives() {
        this.directives = new DirectiveMixins();

        return this;
    }

    render() {
        let app = document.getElementById("app");
        if(app) {
            new Vue({
                router,
                render: h => h(App)
            }).$mount("#app");
        }
    }
}

export default AppLoader;