export let data = {
    time: new Date(),
    segment: 60,
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
    days:
        {
            'd2019-05-04': [
                {
                    from: '10:00',
                    to: '15:00'
                }
            ],
            'd2019-05-09': [],
        }
};

export let bookings = [
	{
		date: '2019-05-04',
		bookings: [
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
		]
	},
    {
		date: '2019-05-10',
		bookings: [
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
];
