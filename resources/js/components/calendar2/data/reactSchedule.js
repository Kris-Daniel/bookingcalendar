export default class reactCalendar {
    constructor(data) {
        this.data = data;
        this.from = new Date('2009-01-01');
        this.to = new Date('2019-11-21');
        this.calendar = {
            time: data.time,
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
    }

    setRegularSchedule(it) {
        let weekDays = it.calendar.weekDays;

        pipelineObj(weekDays, setWeekDays);

        function setWeekDays(obj, wd) {
            weekDays[wd] = {
                name: wd,
                checked: false,
                intervals: {}
            };
            it.startAllIntervals('week', weekDays[wd]);
        }
    }

    setSpecialDays(it) {
        let from = it.from.getTime();
        let to = it.to.getTime();
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
                    name: y,
                    date: new Date(y),
                    prev: undefined,
                    next: undefined,
                    months: {},
                    monthsLen: 0
                }
            }

            if (!years[nameY].months['m' + m]) {
                years[nameY].months['m' + m] = {
                    name: y + '-' + zeroToNum(m),
                    index: m,
                    date: monthDate,
                    ref: years[nameY],
                    prev: undefined,
                    next: undefined,
                    days: {},
                    daysLen: 0
                };
                years[nameY].monthsLen++;
            }
            let monthObj = years[nameY].months['m' + m];
            if (!monthObj.days['d' + d]) {
                monthObj.days['d' + d] = {
                    name: 'd' + y + '-' + zeroToNum(m) + '-' + zeroToNum(d),
                    date: day,
                    prev: undefined,
                    next: undefined,
                    checked: false,
                    ref: years[nameY].months['m' + m],
                    intervals: {},
                    intervalsLen: 0
                };
                monthObj.daysLen++;
            }
            let dayObj = monthObj.days['d' + d];

            if (years[nameYprev] != undefined) {
                years[nameYprev].next = years[nameY];
                years[nameY].prev = years[nameYprev];
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
                    pm.next = currentObj;
                    currentObj.prev = pm;
                } else if (deep == 'day') {
                    let pd = pm.days['d' + prevDate.getDate()];
                    if (pd) {
                        pd.next = currentObj;
                        currentObj.prev = pd;
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
                    let arr = it.data.weekDays[day.name];
                }
            } else if (type == 'day') {
                if (it.data.days[day.name]) {
                    let arr = it.data.days[day.name];
                }
            }

            pipelineArr(arr, function (interval) {
                let from = parseFromMins(interval.from);
                let to = parseFromMins(interval.to);

                let segment = it.calendar.segment;
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
                ref: obj,
                from: parseToMins(mins),
                to: parseToMins(minsTo),
                checked: false
            };
            obj['intervals']['i' + mins / step] = interval;
            obj.intervalsLen++;
        }

        callback();
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

function parseToMins(hm) {
    let h = Math.floor(hm / 60);
    let m = hm - h * 60;
    h = h == 24 ? 0 : h;
    hm = h + ':' + m;
    return zeroToNum(h) + ':' + zeroToNum(m);
}

function parseFromMins(hm) {
    hm = hm.split(':');
    let h = parseInt(hm[0]);
    let m = parseInt(hm[1]);
    hm = h * 60 + m;
    return hm;
}

function zeroToNum(num) {
    num = num.toString();
    num = num.length < 2 ? '0' + num : num;
    return num;
}
