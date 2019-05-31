export default class {
    constructor()
    {
        this.settings = {
            segment: 60,
            multiselect: true,
            hoursFormat: '12h',
            time: new Date(),
        };
        this.schedule = {
            weekDays: {
                Su: [
                    {
                        from: '09:00',
                        to: '18:00'
                    }
                ],
                Mo: [
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
                Tu: [
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
                'd2019-06-04': [
                    {
                        from: '10:00',
                        to: '15:00'
                    }
                ],
                'd2019-06-08': [],
            }
        }
        this.bookings =
        {
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

        let WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];
        let WD = this.schedule.weekDays;
        for(let i = 0; i < WEEK.length; i++)
            if(!WD[WEEK[i]]) WD[WEEK[i]] = [];

        for(let i in this.bookings)
            this.bookings.checked = false;
    }
};
