export default class CalendarSTORE {
    constructor(data) {
        this.setState(data)
        .setMutations();
        console.log(this.state, data.name)
    }

    setState(data) {
        this.namespaced = true;
        this.state = data;

        return this;
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