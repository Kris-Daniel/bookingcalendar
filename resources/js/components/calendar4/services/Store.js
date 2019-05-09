import Helper from './Helper';

export default{
    settings: Helper.RenderCalendar.settings,
    state: 'standard',
    LS_CL: {
        state: 'week',
    },
    schedule: Helper.RenderCalendar.schedule,
    bookings: Helper.RenderCalendar.bookings,
    MONTHS: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'Jule', 'August', 'September', 'October', 'November', 'December'
    ],
    WEEK: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
    mondayFirst: true
}
