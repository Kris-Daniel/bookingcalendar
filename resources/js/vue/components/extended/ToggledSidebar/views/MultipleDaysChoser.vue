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
import DateService from "Services/date/DateService";

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
        this.CalendarRef = this.getStoreModule(this.store.calendarStoreRef);
    },
    methods: {
        closeView() {
            store.commit(`${this.customId}/hideView`, this.storeLink);
        },
        tabChanged(type) {
            this.store.applyType = type == 1 ? "week" : "day";
        },
        applyToDays(type) {
            let schedule = DateService.getScheduleCopy(this.store.applySchedule);
            if(this.store.applyType == "week") {
                for(let i = 0; i < 7; i++) {
                    if(this.store.applyWeekDays[i].active) {
                        Vue.set(this.CalendarRef.schedule.weekDays, this.store.applyWeekDays[i].ref, schedule);
                    }
                }
            } else {
                for(let day in this.store.applyDays) {
                    Vue.set(this.CalendarRef.schedule.days, day, schedule);
                }
            }

            store.dispatch("emptyCheckedDays", this.store.calendarStoreRef);
            store.commit(`${this.customId}/hideViews`);
            
        }
    }
};
</script>