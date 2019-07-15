export default class CalendarSTORE {
    constructor(data) {
        this.setState(data)
            .setMutations();
    }

    setState(data) {
        this.namespaced = true;
        this.state = data;

        return this;
    }

    setMutations() {
        this.mutations = {
            emptyCheckedDays(state) {
                state.checkedDays = {};
            }
        }

        return this;
    }
}