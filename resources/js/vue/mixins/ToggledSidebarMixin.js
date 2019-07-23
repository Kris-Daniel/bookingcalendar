import Vue from 'vue';
import store from "VueStore/GlobalSTORE";
import DateService from "VueServices/date/DateService";

const ToggledSidebarMixin = {
    created() {
        this.CalendarRef = this.getStoreModule(this.store.calendarStoreRef);
    },
    methods: {
        runValidationCycle() {
            this.store.inValidationCycle = true;
            this.store.afterValidationCallback = this.applyToDays;
        },
        closeViews() {
            store.dispatch("emptyCheckedDays", this.store.calendarStoreRef);
            store.commit(`${this.customId}/hideViews`);
        },
        closeView() {
            store.commit(`${this.customId}/hideView`, this.storeLink);
        },
        applyToDays(notOverride) {
            this.CalendarRef = this.getStoreModule(this.store.calendarStoreRef);
            let schedule = DateService.getScheduleCopy(this.store.applySchedule);
            if(this.store.applyType == "week") {
                let rewriteWeekNames = [];
                let specialDaysForRewrite = [];
                let rewriteDaysCount = 0;

                let setWeekDaysSchedule = () => {
                    for(let i = 0; i < 7; i++) {
                        if(this.store.applyWeekDays[i].active)
                            Vue.set(this.CalendarRef.schedule.weekDays, this.store.applyWeekDays[i].ref, schedule);
                    }
                    this.applyToDaysSuccess();
                }

                if(notOverride) {
                    setWeekDaysSchedule();
                    return false;
                }
                for(let i = 0; i < 7; i++) {
                    let weekRef = this.store.applyWeekDays[i].ref;
                    specialDaysForRewrite.push([]);
                    if(this.store.applyWeekDays[i].active) {
                        specialDaysForRewrite[i] = this.getSpecialDaysforRewrite(weekRef);
                        rewriteDaysCount += specialDaysForRewrite[i].length;
                        if(specialDaysForRewrite[i].length)
                            rewriteWeekNames.push(weekRef);
                    }
                }
                if(!rewriteWeekNames.length)
                    setWeekDaysSchedule();
                else {
                    store.commit(`${this.customId}/showPopup`, {
                        specialDaysForRewrite,
                        rewriteDaysCount,
                        rewriteWeekNames,
                        schedule,
                    });
                }
            } else {
                for(let day in this.store.applyDays) {
                    Vue.set(this.CalendarRef.schedule.days, day, schedule);
                }
                this.applyToDaysSuccess();
            }
            
        },
        applyToDaysSuccess() {
            this.store.afterValidationCallback = false;
            this.store.applyValid = false;
            this.closeViews();
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
        },
        removeScheduleFromSpecialDay(dayRef) {
            this.CalendarRef = this.getStoreModule(this.store.calendarStoreRef);
            let SD = this.CalendarRef.schedule.days;
            Vue.delete(SD, dayRef);
        },
        getSpecialDaysforRewrite(refWeek) {
            let SD = this.CalendarRef.schedule.days;
            let specialDaysForRewrite = [];
            for(let dayRef in SD) {
                let dayRefWeek = DateService.getWeekRefByDateRef(dayRef);
                if(refWeek == dayRefWeek)
                    specialDaysForRewrite.push(dayRef);
            }
            return specialDaysForRewrite;
        }
    },
}
export default ToggledSidebarMixin;