import Vue from "vue";
import Finder from 'Services/global/Finder';
import store from "Store/GlobalSTORE";

const FindParentMixin = {
    created() {
        this.customId = Finder.getParentId(this, "customId");
        this.store = Finder.getStoreModule(this.customId);
    },
    methods: {
        getWeekDays(mondayFirst) {
            let weekDays = [];
            store.state.Constants.WEEK.forEach(item => {
                weekDays.push(item);
            });
    
            if (mondayFirst) {
                let Su = weekDays[0];
                weekDays.shift();
                weekDays.push(Su);
            }
            return weekDays;
        },
        getStoreModule(storeName) {
            return store.state[storeName];
        }
    },
}
export default FindParentMixin;