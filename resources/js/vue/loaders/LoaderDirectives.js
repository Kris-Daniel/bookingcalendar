import Vue from 'vue';
import vClickOutside from "v-click-outside";

export default class{
    constructor() {
        this.setDirectives();
    }
    
    setDirectives() {
        Vue.use(vClickOutside);

        return this;
    }
}