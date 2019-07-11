import Vue from 'vue';
import Calendar from 'Calendar/Calendar';
import ToggledSidebar from 'ToggledSidebar/ToggledSidebar';

export default class{
    constructor() {
        this.setSimpleComponents()
            .setExtendedComponents();
    }
    
    setSimpleComponents() {

        return this;
    }

    setExtendedComponents() {
        Vue.component('Calendar', Calendar);
        Vue.component('ToggledSidebar', ToggledSidebar);
        return this;
    }
}