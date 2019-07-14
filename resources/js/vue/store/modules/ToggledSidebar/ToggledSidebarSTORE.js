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
        this.state.applySchedule = false;

        return this;
    }

    setProperties() {
        this.state.calendarStoreRef = false;
        this.state.showOverlay = false;
        this.state.dayInfo = false;

        return this;
    }

    setMutations() {
        let it = this;

        this.mutations = {
            setDayInfo(state, day) {
                state.dayInfo = day;
            },
            setCalendarStoreRef(state, name) {
                state.calendarStoreRef = name;
            },
            resetPropeties(state) {
                it.setProperties();
            },
            setApplySchedule(state, schedule) {
                if (schedule)
                    Vue.set(state, "applySchedule", JSON.parse(JSON.stringify(schedule)));
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
