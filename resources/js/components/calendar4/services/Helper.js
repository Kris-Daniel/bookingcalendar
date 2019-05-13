import Vue from 'vue';
import CalendarClass from './GetCalendar';
import Store from './Store';

class ForHelp {
    constructor()
    {
        this.InsCalendar = new CalendarClass();
        this.RenderCalendar = new CalendarClass();
    }
    getDaysInMonth(year, month)
    {
        let daysNum = new Date(year, month, 0).getDate();
        return daysNum;
    }
    zeroToNum(num)
    {
        num = num.toString();
        num = num.length < 2 ? '0' + num : num;
        return num;
    }
    shortMonths(months)
    {
        let arr = [];
        months.forEach(function(item) {
            item = item.slice(0, 3);
            arr.push(item);
        });
        return arr;
    }
    dayClick(day, state)
    {
        switch (state) {
            case 'standard':
                standardDayClick(day);
                break;
            case 'orders':
                ordersDayClick(day);
                break;
        }
    }
    fillWeekDay(ref, WD)
    {
        let checked = Store.LS_CL.stack[ref] ? true : false;
        return {
            ref: ref,
            name: ref,
            toStandard: true,
            intervals: WD[ref],
            type: 'week',
            checked,
        };
    }
    fillSpecialDay(ref)
    {
        let dateString, date, dateMS, times, monthName,
        year, month, name, weekIndex, weekName,
        type, isSpecial, current, intervals, checked;

        dateString = ref.substring(1);
        date = new Date(dateString);
        dateMS = date.getTime();
        times = dateString.split('-').map(function(item) {
            return parseInt(item);
        });
        year  = times[0];
        month = times[1];
        name  = times[2];
        weekIndex = date.getDay();
        weekName  = Store.WEEK[weekIndex];
        monthName = Store.MONTHS[month - 1];

        if(Store.schedule.days[ref]) {
            intervals = Store.schedule.days[ref];
            isSpecial = true;
        }
        else {
            intervals = Store.schedule.weekDays[weekName];
            isSpecial = false;
        }
        current = (dateMS / 86400000) == Math.floor(Store.settings.time.getTime() / 86400000);
        checked = Store.LS_CL.stack[ref] ? true : false;
        type = 'day';

        return {
            ref,
            dateString,
            date: dateMS,
            year,
            month,
            name,
            monthName,
            weekName,
            weekIndex,
            isSpecial,
            checked,
            current,
            intervals,
            type: 'day',
        };
    }
    toHoursFormat(time)
    {
        let format = '';
        if(Store.settings.hoursFormat == '12h') {
            time = time.split(':');
            let h = parseInt(time[0]);
            if(h == 0) {
                h = 12;
                format = ' AM'
            }
            else if(h < 12) {
                format = ' AM'
            }
            else if(h == 12) {
                format = ' PM'
            }
            else if(h > 12) {
                h -= 12;
                format = ' PM'
            }
            time[0] = h;
        }
        return (time.join(':') + format);
    }
    undo()
    {
        this.RenderCalendar = new CalendarClass();
        Vue.set(Store, 'schedule', this.RenderCalendar.schedule);
        Vue.set(Store, 'bookings', this.RenderCalendar.bookings);
        Vue.set(Store.LS_CL, 'stack', {});
        Vue.set(Store.TS, 'state', false);
    }
}
let Helper = new ForHelp();
export default Helper;

function standardDayClick(day) {
    // check for undo
    if(Store.LS_CL.state != day.type) {
        Helper.undo();
        Vue.set(Store.LS_CL, 'state', day.type);
        // Store.LS_CL.state = day.type;
    }

    // add | remove from stack
    let stack = Store.LS_CL.stack;
    if(!stack[day.ref]) {
        if(Store.LS.state != day.type)
            Store.LS.state = day.type;
        Vue.set(stack, day.ref, day);
    }
    else
        Vue.delete(stack, day.ref);

    // add | remove special days
    if(day.type == 'day' && !Helper.InsCalendar.schedule.days[day.ref]) {
        if(!day.checked) {
            let intervals = Store.schedule.weekDays[day.weekName];
            Vue.set(Store.schedule.days, day.ref, intervals);
        }
        else if(day.checked)
            Vue.delete(Store.schedule.days, day.ref);
    }
    console.log(stack);
}

function ordersDayClick(day)
{
    // to standard state
    if(day.toStandard) {
        Store.state = 'standard';
        Helper.undo();
        standardDayClick(day);
        return false;
    }
    // show | hide clients
    else if(Helper.InsCalendar.bookings[day.ref]) {
        let stack = Store.LS_CL.stack;
        if(!Store.LS_CL.stack[day.ref]) {
            Vue.set(Store.LS_CL, 'stack', {});
            Vue.set(Store.LS_CL.stack, day.ref, day);
            Vue.set(Store.TS, 'state', 'clients');
        }
        else {
            Vue.set(Store.TS, 'state', false);
            Vue.delete(Store.LS_CL.stack, day.ref);
        }
    }
    console.log(day);
}
