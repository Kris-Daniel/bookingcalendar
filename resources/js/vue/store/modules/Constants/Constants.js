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
            WEEKNAMES: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            WEEKNAMESPLURAL: ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays']
        }
    }
}

const Constants = new ConstantsClass();
export default Constants;