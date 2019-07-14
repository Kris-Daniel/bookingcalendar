import Vue from "vue";
import Finder from 'Services/global/Finder';

const FindParentMixin = {
    created() {
        this.customId = Finder.getParentId(this, "customId");
        this.store = Finder.getStoreModule(this.customId);
    },
    methods: {
        getWeekDays() {
            let weekDays = [];
            this.store.constants.WEEK.forEach(item => {
                weekDays.push(item);
            });
    
            if (this.store.settings.mondayFirst) {
                let Su = weekDays[0];
                weekDays.shift();
                weekDays.push(Su);
            }
            return weekDays;
        }
    },
}
export default FindParentMixin;