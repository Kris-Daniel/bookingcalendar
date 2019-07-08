<template>
    <div class="multiple-days-choser">
        <div class="multiple-days-choser_close" @click="closeView()">
            <AngleRight></AngleRight>
        </div>
        <div class="title rel mb30">Apply To Multiple</div>
        <Tabs :length="tabs.length">
            <template v-for="(tab, index) in tabs">
                <span :slot="'title-' + (index + 1)" :key="tab.title">{{tab.title}}</span>
                <component :storeLink="storeLink" :slot="'content-' + (index + 1)" :is="tab.content" :key="tab.content"></component>
            </template>
        </Tabs>
    </div>
</template>

<script>
import ToggledSidebarSTORE from "ToggledSidebarSTORE";
import WeekDays from 'ToggledSidebar/WeekDays/WeekDays';
import SpecialDays from 'ToggledSidebar/SpecialDays/SpecialDays';

import AngleRight from "MySvg/angle-right";

export default {
    name: "MultipleDaysChoser",
    components: {
        WeekDays,
        SpecialDays,
        AngleRight
    },
    props: ["storeLink"],
    created() {
        this.tabs = [
            {
                title: "Week",
                content: "WeekDays"
            },
            {
                title: "Special",
                content: "SpecialDays"
            }
        ]
    },
    methods: {
        closeView() {
            this.storeLink.active = false;
        }
    }
};
</script>