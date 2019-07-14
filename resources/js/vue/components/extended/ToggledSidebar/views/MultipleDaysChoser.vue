<template>
    <div class="multiple-days-choser" :data-show="show">
        <div class="multiple-days-choser_close" @click="closeView()">
            <AngleRight></AngleRight>
        </div>
        <div class="title rel mb30">Apply To Multiple</div>
        <div class="tabs-wrapper">
            <Tabs :length="tabs.length" :key="tabKeyForReset">
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
            <div class="btns_wrapper">
                <div class="btn-grid btn-grid--left">
                    <div class="btn" @click="applyToDays()">Apply</div>
                </div>
                <div class="btn-grid btn-grid--right">
                    <div class="btn btn--red" @click="closeView()">Cancel</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Vue from 'vue';
import FindParentMixin from "Mixins/FindParentMixin";
import store from "Store/GlobalSTORE";
import WeekDays from "ToggledSidebar/WeekDays/WeekDays";
import SpecialDays from "ToggledSidebar/SpecialDays/SpecialDays";

export default {
    name: "MultipleDaysChoser",
    components: {
        WeekDays,
        SpecialDays,
    },
    mixins: [FindParentMixin],
    props: ["storeLink"],
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
        closeView() {
            store.commit(`${this.customId}/hideView`, this.storeLink);
        },
        applyToDays() {
            // let calendarId = ToggledSidebarSTORE.calendarId;
            // let schedule = CalendarSTORE.calendars[calendarId].daysProps.schedule;
            // let insertSchedule = this.storeLink.parent.props.data.schedule;
            // if(ToggledSidebarSTORE.dayApplyType == 'special') {
            //     let checkedDays = CalendarSTORE.calendars[calendarId].daysProps.checkedDays;
            //     for(let i in checkedDays) {
            //         Vue.set(schedule.days, i, insertSchedule);
            //     }
            // } else {
            //     let weekDays = ToggledSidebarSTORE.weekDays;
            //     for(let i in weekDays) {
            //         if(weekDays[i] == true) {
            //             Vue.set(schedule.weekDays, i, insertSchedule);
            //         }
            //     }
            // }
            // ToggledSidebarSTORE.disableViews();
        }
    }
};
</script>