import Vue from 'vue';
import Cleave from "vue-cleave-component";
import Calendar from 'Calendar/Calendar';
import ToggledSidebar from 'ToggledSidebar/ToggledSidebar';
import Tabs from "Components/simple/Tabs";
import RetractableBlock from "Components/simple/RetractableBlock";

export default class{
    constructor() {
        this.setSimpleComponents()
            .setExtendedComponents();
    }
    
    setSimpleComponents() {
        Vue.component('Tabs', Tabs);
        Vue.component('Cleave', Cleave);
        Vue.component('RetractableBlock', RetractableBlock);

        return this;
    }

    setExtendedComponents() {
        Vue.component('Calendar', Calendar);
        Vue.component('ToggledSidebar', ToggledSidebar);
        
        return this;
    }
}