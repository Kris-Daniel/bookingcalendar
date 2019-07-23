import Vue from "vue";

export default class ToggledSidebarSTORE {
    constructor(data) {
        this.setState(data)
            .setProperties()
            .setMutations();
    }

    setState(data) {
        this.namespaced = true;
        this.state = data;
        this.state.dayInfo = false;
        this.state.applySchedule = [];
        this.state.applyWeekDays = [];
        
        return this;
    }
    
    setProperties() {
        this.state.calendarStoreRef = false;
        this.state.showOverlay = false;
        this.state.applyType = false;
        this.state.applyDays = {};
        this.state.applyValid = false;
        this.state.inValidationCycle = false;
        this.state.afterValidationCallback = false;
        this.state.popupRewrite = {
            show: false,
            schedule: false,
            specialDaysForRewrite: false,
            rewriteWeekNames: false,
            rewriteDaysCount: 0
        }

        return this;
    }

    setMutations() {
        let it = this;

        this.mutations = {
            setDayInfo(state, day) {
                Vue.set(state, "dayInfo", day);
            },
            setCalendarStoreRef(state, name) {
                state.calendarStoreRef = name;
            },
            resetPropeties(state) {
                it.setProperties();
            },
            setApplySchedule(state, schedule) {
                if (schedule) state.applySchedule = JSON.parse(JSON.stringify(schedule));
                state.applySchedule.map((item) => {
                    Vue.set(item, "valid", true);
                });
            },
            showPopup(state, params) {
                Vue.set(state.popupRewrite, 'show', true);
                Vue.set(state.popupRewrite, 'schedule', params.schedule);
                Vue.set(state.popupRewrite, 'specialDaysForRewrite', params.specialDaysForRewrite);
                Vue.set(state.popupRewrite, 'rewriteWeekNames', params.rewriteWeekNames);
                Vue.set(state.popupRewrite, 'rewriteDaysCount', params.rewriteDaysCount);
            },
            showParentView(state, component) {
                state.views[component].active = true;
                state.showOverlay = true;
            },
            hideViews(state, children) {

                let hideViews = (children) => {
                    let env = children ? children : state.views;
                    for (let view in env) {
                        env[view].active = false;
                        if (env[view].children) {
                            hideViews(env[view].children);
                        }
                    }
                };
                hideViews(children);
                it.setProperties();

            },
            hideView(state, view) {
                view.active = false;
            },
            showView(state, view) {
                view.active = true;
            },
        }

        return this;
    }
}
