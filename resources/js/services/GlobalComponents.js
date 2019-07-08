import Vue from 'vue';
import Tabs from 'Components/Tabs/Tabs';
import Calendar from "Calendar/Calendar";

export default function GlobalComponents() {
    Vue.component('Calendar', Calendar);
    Vue.component('Tabs', Tabs);
}