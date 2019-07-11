class CalendarHttpClass{
    constructor() { }

    getSettings(userId, calendarId) {
        return {
            segment: 60,
            multiselect: true,
            mondayFirst: true,
            hoursFormat: '12h',
            time: new Date(),
        }
    }

    getBookings(userId, calendarId) {
        return {
            'd2019-06-04':
                [
                    {
                        idClient: 123,
                        name: 'John Doe',
                        from: '08:30',
                        to: '09:00'
                    },
                    {
                        idClient: 124,
                        name: 'Micle Doe',
                        from: '08:30',
                        to: '09:00'
                    }
                ],
            'd2019-06-10':
                [
                    {
                        idClient: 124,
                        name: 'Helen Doe',
                        from: '08:30',
                        to: '09:00'
                    },
                    {
                        idClient: 123,
                        name: 'Cameron Doe',
                        from: '11:30',
                        to: '12:00'
                    },
                    {
                        idClient: 124,
                        name: 'Elizabeth Doe',
                        from: '12:30',
                        to: '13:00'
                    }
                ]
        }
    }

    getSchedule(userId, calendarId) {
        return {
            weekDays: {
                Su: [
                    {
                        from: '09:00',
                        to: '18:00'
                    }
                ],
                Fr: [
                    {
                        from: '09:00',
                        to: '11:00'
                    },
                    {
                        from: '12:00',
                        to: '13:00'
                    },
                    {
                        from: '14:00',
                        to: '15:00'
                    },
                    {
                        from: '16:00',
                        to: '18:00'
                    }
                ],
                Mo: [
                    {
                        from: '00:00',
                        to: '11:00'
                    },
                    {
                        from: '12:00',
                        to: '18:00'
                    }
                ],
            },
            days: {
                'd2019-07-04': [
                    {
                        from: '10:00',
                        to: '15:00'
                    }
                ],
                'd2019-07-08': [],
            }
        }
    }

    setSchedule() { }
}
const CalendarHttp = new CalendarHttpClass();
export default CalendarHttp;