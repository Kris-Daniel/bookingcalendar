<template>
    <div class="retractable-sidebar" :class="isActive">
        <component :is="view" :storeLink="storeLink"></component>
    </div>
</template>

<script>
import TimeSetting from "../views/TimeSetting";
import Bookings from "../views/Bookings";
import SetMultipleDays from "../views/SetMultipleDays";

import ToggledSidebarSTORE from '../helpers/ToggledSidebarSTORE';

export default {
    name: "RetractableBlock",
    components: {
        TimeSetting,
        Bookings,
        SetMultipleDays
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
                    this.view = this.views[propName].component;
                    ToggledSidebarSTORE.showOverlay = true;
                    this.storeLink = this.views[propName];
                    return 'active';
                }
            }
            return '';
        }
    }
};
</script>