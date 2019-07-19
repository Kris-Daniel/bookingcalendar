import Vue from 'vue';
import store from "Store/GlobalSTORE";
import DateService from "Services/date/DateService";

const ToggledSidebarMixin = {
    created() {
        this.CalendarRef = this.getStoreModule(this.store.calendarStoreRef);
    },
    methods: {
        runValidationCycle(callback) {
            this.store.inValidationCycle = true;
            this.store.afterValidationCallback = callback;
        },
        closeViews() {
            store.dispatch("emptyCheckedDays", this.store.calendarStoreRef);
            store.commit(`${this.customId}/hideViews`);
        },
        closeView() {
            store.commit(`${this.customId}/hideView`, this.storeLink);
        },
        applyToDays() {
            this.CalendarRef = this.getStoreModule(this.store.calendarStoreRef);
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
        },
        setWeekDays() {
            if(!this.store.calendarStoreRef) return false;
            this.store.applyWeekDays.splice(0, 7);
            let weekDays = this.getWeekDays(this.getStoreModule(this.store.calendarStoreRef).settings.mondayFirst);

            for(let i = 0; i < 7; i++) {
                this.store.applyWeekDays.push({
                    ref: weekDays[i],
                    name: store.state.Constants.WEEKNAMES[weekDays[i]],
                    active: weekDays[i] == this.store.dayInfo.weekDayRef ? true : false,
                });
            }
        }
    },
}
export default ToggledSidebarMixin;