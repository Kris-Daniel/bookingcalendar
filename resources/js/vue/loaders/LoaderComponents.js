import Vue from 'vue';
import Cleave from "vue-cleave-component";
import Calendar from 'VueCalendar/Calendar';
import ToggledSidebar from 'VueToggledSidebar/ToggledSidebar';
import Tabs from "VueComponents/simple/Tabs";
import RetractableBlock from "VueComponents/simple/RetractableBlock";

export default class {
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