<template>
    <div class="retractable-sidebar" :class="isActive">
        <component :is="view" :storeLink="storeLink"></component>
    </div>
</template>

<script>
import TimeSetting from "ToggledSidebar/views/TimeSetting";
import Bookings from "ToggledSidebar/views/Bookings";
import MultipleDaysChoser from "ToggledSidebar/views/MultipleDaysChoser";

import ToggledSidebarSTORE from 'ToggledSidebarSTORE';

export default {
    name: "RetractableBlock",
    components: {
        TimeSetting,
        Bookings,
        MultipleDaysChoser
    },
    props: ["views"],
    data() {
        return {
            view: "",
            storeLink: false
        };
    },
    computed: {
        isActive() {
            for(let propName in this.views) {
                if(this.views[propName].active) {
                    if(this.views[propName]) {
                        this.view = this.views[propName].component;
                        ToggledSidebarSTORE.showOverlay = true;
                        this.storeLink = this.views[propName];
                        return 'active';

                    }
                }
            }
            return '';
        }
    },
    created() {
        
    }
};
</script>