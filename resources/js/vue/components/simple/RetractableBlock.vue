<template>
    <div class="retractable" :class="isActive">
        <component :is="view" :storeLink="storeLink"></component>
    </div>
</template>

<script>
import TimeSetting from "ToggledSidebar/views/TimeSettings";
import Bookings from "ToggledSidebar/views/Bookings";
import MultipleDaysChoser from "ToggledSidebar/views/MultipleDaysChoser";

import FindParentMixin from "Mixins/FindParentMixin";

export default {
    name: "RetractableBlock",
    components: {
        TimeSetting,
        Bookings,
        MultipleDaysChoser
    },
    mixins: [FindParentMixin],
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
                        this.storeLink = this.views[propName];
                        return 'active';
                    }
                }
            }
            return '';
        }
    }
};
</script>