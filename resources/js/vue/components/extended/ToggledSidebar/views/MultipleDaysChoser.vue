<template>
    <div class="multiple-days-choser" :data-show="show">
        <div class="multiple-days-choser_close" @click="closeView()">
            <AngleRight></AngleRight>
        </div>
        <div class="title rel mb30">Apply To Multiple</div>
        <div class="tabs-wrapper">
            <Tabs :length="tabs.length" :key="tabKeyForReset" @tabChanged="tabChanged">
                <template v-for="(tab, index) in tabs">
                    <span :slot="'title-' + (index + 1)" :key="tab.title">{{tab.title}}</span>
                </template>

                <template
                    v-for="(tab, index) in tabs"
                    :slot="'content-' + (index + 1)"
                    slot-scope="props"
                >
                    <component
                        :is="tab.content"
                        :key="tab.content"
                        :store-link="storeLink"
                        :activeTab="props.activeTab"
                    ></component>
                </template>
            </Tabs>
            <div class="toggled-sidebar_container multiple-days-choser_btns">
                <div class="btn btn--min" @click="runValidationCycle(applyToDays)">Apply</div>
                <div class="btn btn--red btn--min" @click="closeView()">Cancel</div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import store from "Store/GlobalSTORE";
import FindParentMixin from "Mixins/FindParentMixin";
import ToggledSidebarMixin from "Mixins/ToggledSidebarMixin";
import WeekDays from "ToggledSidebar/WeekDays/WeekDays";
import SpecialDays from "ToggledSidebar/SpecialDays/SpecialDays";

export default {
    name: "MultipleDaysChoser",
    components: {
        WeekDays,
        SpecialDays,
    },
    mixins: [FindParentMixin, ToggledSidebarMixin],
    props: ["storeLink"],
    data() {
        return {
            store: ""
        }
    },
    computed: {
        show() {
            if (this.storeLink.active) this.tabKeyForReset++;
            return this.storeLink.active;
        }
    },
    created() {
        this.tabKeyForReset = 0;
        this.tabs = [
            {
                title: "Week",
                content: "WeekDays"
            },
            {
                title: "Special",
                content: "SpecialDays"
            }
        ];
    },
    methods: {
        tabChanged(type) {
            this.store.applyType = type == 1 ? "week" : "day";
        },
        
    }
};
</script>