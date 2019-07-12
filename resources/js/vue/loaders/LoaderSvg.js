import Vue from 'vue';
import AngleDown from "MySvg/AngleDown";
import AngleLeft from "MySvg/AngleLeft";
import AngleRight from "MySvg/AngleRight";
import ArrowRight from "MySvg/ArrowRight";
import Mark from "MySvg/Mark";
import Pencil from "MySvg/AngleDown";
import Plus from "MySvg/AngleDown";
import Trash from "MySvg/Trash";
import X from "MySvg/X";

export default class {
    constructor() {
        this.setSvg();
    }

    setSvg() {
        Vue.component("AngleDown", AngleDown);
        Vue.component("AngleLeft", AngleLeft);
        Vue.component("AngleRight", AngleRight);
        Vue.component("ArrowRight", ArrowRight);
        Vue.component("Mark", Mark);
        Vue.component("Pencil", Pencil);
        Vue.component("Plus", Plus);
        Vue.component("Trash", Trash);
        Vue.component("X", X);
    }
}