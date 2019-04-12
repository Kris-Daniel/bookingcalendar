export default class reactCalendar {
    constructor(data) {
        this.data = data;
        this.from = new Date('2019-01-01').getTime();
        this.to = new Date('2019-11-30').getTime();
        this.calendar = {
            cYear: data.time.getFullYear(),
            cMonth: data.time.getMonth(),
            cDay: data.time.getDate(),
            segment: data.segment,
            weekDays: {Su: {}, Mo: {}, Tu: {}, We: {}, Th: {}, Fr: {}, Sa: {}},
            years: {}
        };
        this.startEnv();
    }

    startEnv() {
        let it = this;
        let funcs = [this.setRegularSchedule, this.setSpecialDays];
        pipelineArr(funcs, function (func) {
            func(it);
        });
        this.insertCurrent();
    }

    insertCurrent() {
        let y = this.calendar.cYear;
        let m = this.calendar.cMonth + 1;
        let d = this.calendar.cDay;
        this.find(['y' + y, 'm' + m, 'd' + d], this.calendar).current = true;
    }

    setRegularSchedule(it) {
        let weekDays = it.calendar.weekDays;

        pipelineObj(weekDays, setWeekDays);

        function setWeekDays(obj, wd) {
            weekDays[wd] = {
                name: wd,
                checked: false,
                intervals: {},
                hasIntervals: false,
                length: 0,
                type: 'week'
            };
            it.startAllIntervals('week', weekDays[wd]);
        }
    }

    setSpecialDays(it) {
        let from = it.from;
        let to = it.to;
        let step = 86400000;

        pipelineFor(from, to + step, step, setDays);

        function setDays(ms) {
            let day = new Date(ms);

            let y = day.getFullYear();
            let m = day.getMonth() + 1;
            let d = day.getDate();

            let years = it.calendar.years;
            let nameY = 'y' + y;
            let nameYprev = 'y' + (y - 1);
            let monthDate = new Date(y + '-' + zeroToNum(m));

            if (years[nameY] == undefined) {
                years[nameY] = {
                    index: y,
                    address: [nameY],
                    date: new Date(y.toString()).getTime(),
                    prev: undefined,
                    next: undefined,
                    months: {},
                    length: 0
                }
            }

            if (!years[nameY].months['m' + m]) {
                years[nameY].months['m' + m] = {
                    index: m,
                    address: [nameY, 'm' + m],
                    date: monthDate.getTime(),
                    ref: years[nameY].address,
                    prev: undefined,
                    next: undefined,
                    days: {},
                    length: 0
                };
                years[nameY].length++;
            }
            let monthObj = years[nameY].months['m' + m];
            if (!monthObj.days['d' + d]) {
                let dateString = y + '-' + zeroToNum(m) + '-' + zeroToNum(d);
                monthObj.days['d' + d] = {
                    name: 'd' + dateString,
                    address: [nameY, 'm' + m, 'd' + d],
                    index: d,
                    weekIndex: day.getDay(),
                    date: day.getTime(),
                    dateString: dateString,
                    prev: undefined,
                    next: undefined,
                    checked: false,
                    ref: years[nameY].months['m' + m].address,
                    intervals: {},
                    length: 0,
                    hasIntervals: false,
                    type: 'day'
                };
                monthObj.length++;
            }
            let dayObj = monthObj.days['d' + d];

            if (years[nameYprev] != undefined) {
                years[nameYprev].next = years[nameY].address;
                years[nameY].prev = years[nameYprev].address;
            }
            it.setPrevNext(monthDate, 'month', monthObj);
            it.setPrevNext(day, 'day', dayObj);

            it.startAllIntervals('day', dayObj);
        };
    }

    setPrevNext(currentDate, deep, currentObj) {
        let years = this.calendar.years;
        let prevDate = new Date(currentDate.getTime());
        if (deep == 'month') {
            prevDate.setMonth(prevDate.getMonth() - 1);
        } else if (deep == 'day') {
            prevDate.setDate(prevDate.getDate() - 1);
        }

        let py = years['y' + prevDate.getFullYear()];
        if (py) {
            let pm = py.months['m' + (prevDate.getMonth() + 1)];
            if (pm) {
                if (deep == 'month') {
                    pm.next = currentObj.address;
                    currentObj.prev = pm.address;
                } else if (deep == 'day') {
                    let pd = pm.days['d' + prevDate.getDate()];
                    if (pd) {
                        pd.next = currentObj.address;
                        currentObj.prev = pd.address;
                    }
                }
            }
        }
    }

    startAllIntervals(type, day) {
        let it = this;

        function callback() {
            let arr = [];
            if (type == 'week') {
                if (it.data.weekDays[day.name]) {
                    arr = it.data.weekDays[day.name];
                }
            } else if (type == 'day') {
                if (it.data.days[day.name]) {
                    arr = it.data.days[day.name];
                    day.isSpecial = true;
                }
            }

            pipelineArr(arr, function (interval) {
                let from = it.parseFromMins(interval.from);
                let to = it.parseFromMins(interval.to);
                let segment = it.calendar.segment;
                day.hasIntervals = true;
                pipelineFor(from, to, segment, function (item) {
                    let index = 'i' + item / segment;
                    day.intervals[index].checked = true;
                });
            });
        }

        it.insertIntervals(day, callback);
    }

    insertIntervals(obj, callback) {
        let it = this;
        let step = it.calendar.segment;
        let len = 24 * 60;

        pipelineFor(0, len, step, fastInterval);

        function fastInterval(mins) {
            let minsTo = mins + step;
            let interval = {
                ref: obj.address,
                from: it.parseToMins(mins),
                to: it.parseToMins(minsTo),
                checked: false
            };
            obj['intervals']['i' + mins / step] = interval;
            obj.length++;
        }

        callback();
    }

    find(address, obj) {
        if(address != undefined) {
            if(address.length == 1)
                return obj.years[address[0]]
            if(address.length == 2)
                return obj.years[address[0]].months[address[1]]
            if(address.length == 3)
                return obj.years[address[0]].months[address[1]].days[address[2]]
        }
        return false;
    }

    parseToMins(hm) {
        let h = Math.floor(hm / 60);
        let m = hm - h * 60;
        h = h == 24 ? 0 : h;
        hm = h + ':' + m;
        return zeroToNum(h) + ':' + zeroToNum(m);
    }

    parseFromMins(hm) {
        hm = hm.split(':');
        let h = parseInt(hm[0]);
        let m = parseInt(hm[1]);
        hm = h * 60 + m;
        return hm;
    }
}

function pipelineArr(arr, func) {
    for (let item = 0; item < arr.length; item++) {
        func(arr[item]);
    }
}

function pipelineObj(obj, func) {
    for (let prop in obj) {
        func(obj, prop);
    }
}

function pipelineFor(start, end, step, func) {
    for (let item = start; item < end; item += step) {
        func(item);
    }
}

function zeroToNum(num) {
    num = num.toString();
    num = num.length < 2 ? '0' + num : num;
    return num;
}
