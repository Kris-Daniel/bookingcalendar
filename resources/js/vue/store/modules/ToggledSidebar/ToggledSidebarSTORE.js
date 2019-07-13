export default class ToggledSidebarSTORE {
    constructor(data) {
        this.setState(data)
            .setProperties()
            .setMutations();
    }

    setState(data) {
        this.namespaced = true;
        this.state = data;

        return this;
    }

    setProperties() {
        this.state.showOverlay = false;
        this.state.editableDay = "";
        this.state.editableWeekDay = "";
        this.state.applyDayType = "week";
    }

    setMutations() {
        this.mutations = {
            inc(state) {
                state.name = "hello 2";
            }
        }

        return this;
    }
}