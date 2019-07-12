export default class CalendarSTORE {
    constructor(data) {
        this.setState(data)
            .setMutations()
            .setConstants();
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

    setConstants() {
        let constants = {
            MONTHS: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ],
            WEEK: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            WEEKNAMES: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            WEEKNAMESPLURAL: ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays']
        }
        this.state.constants = constants;
    }
}