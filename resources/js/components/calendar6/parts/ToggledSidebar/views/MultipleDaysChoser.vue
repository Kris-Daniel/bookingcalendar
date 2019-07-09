<template>
  <div class="multiple-days-choser" :data-show="show">
    <div class="multiple-days-choser_close" @click="closeView()">
      <AngleRight></AngleRight>
    </div>
    <div class="title rel mb30">Apply To Multiple</div>
    <Tabs :length="tabs.length" :key="tabKeyForReset">
      <template v-for="(tab, index) in tabs">
        <span :slot="'title-' + (index + 1)" :key="tab.title">{{tab.title}}</span>
      </template>

      <template v-for="(tab, index) in tabs" :slot="'content-' + (index + 1)" slot-scope="props">
        <component
          :is="tab.content"
          :key="tab.content"
          :store-link="storeLink"
          :activeTab="props.activeTab"
        ></component>
      </template>
    </Tabs>
  </div>
</template>

<script>
import ToggledSidebarSTORE from "ToggledSidebarSTORE";
import WeekDays from "ToggledSidebar/WeekDays/WeekDays";
import SpecialDays from "ToggledSidebar/SpecialDays/SpecialDays";

import AngleRight from "MySvg/angle-right";

export default {
  name: "MultipleDaysChoser",
  components: {
    WeekDays,
    SpecialDays,
    AngleRight
  },
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
      this.storeLink.active = false;
    }
  }
};
</script>