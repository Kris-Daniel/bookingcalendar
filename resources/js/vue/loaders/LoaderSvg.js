import Vue from 'vue';
import AngleDown from "VueSvg/AngleDown";
import AngleLeft from "VueSvg/AngleLeft";
import AngleRight from "VueSvg/AngleRight";
import ArrowRight from "VueSvg/ArrowRight";
import Mark from "VueSvg/Mark";
import Pencil from "VueSvg/Pencil";
import Plus from "VueSvg/Plus";
import Trash from "VueSvg/Trash";
import X from "VueSvg/X";

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