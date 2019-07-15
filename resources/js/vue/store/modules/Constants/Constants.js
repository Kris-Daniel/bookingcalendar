class ConstantsClass {
    constructor() {
        this.namespaced = true;
        this.setConstants();
    }
    setConstants() {
        this.state = {
            MONTHS: [
                'January', 'February', 'March', 'April', 'May', 'June',
                'July', 'August', 'September', 'October', 'November', 'December'
            ],
            WEEK: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
            WEEKNAMES: {Su: 'Sunday', Mo: 'Monday', Tu: 'Tuesday', We: 'Wednesday', Th: 'Thursday', Fr: 'Friday', Sa: 'Saturday'},
            WEEKNAMESPLURAL: {Su: 'Sundays', Mo: 'Mondays', Tu: 'Tuesdays', We: 'Wednesdays', Th: 'Thursdays', Fr: 'Fridays', Sa: 'Saturdays'}
        }
    }
}

const Constants = new ConstantsClass();
export default Constants;