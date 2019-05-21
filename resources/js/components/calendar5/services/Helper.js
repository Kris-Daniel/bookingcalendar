import Vue from 'vue';
import Store from './Store';

class ForHelp {
    constructor() {}
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
    dayClick(day)
    {
        switch (Store.state) {
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
        let checked = Store.stackLS_CL.inStack({ref}) ? true : false;
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
        type, current, intervals,
        bookings, bookingsAmount, checked;

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
        intervals = Store.SD[ref] ? Store.SD[ref] : Store.WD[weekName];
        bookings = Store.BK[ref] ? Store.BK[ref] : [];
        bookingsAmount = bookings.length;
        current = (dateMS / 86400000) == Math.floor(Store.settings.time.getTime() / 86400000);
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
            current,
            intervals,
            bookings,
            bookingsAmount,
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
        // this.RenderCalendar = JSON.parse(JSON.stringify(this.InsCalendar));
        // Vue.set(Store, 'schedule', this.RenderCalendar.schedule);
        // Vue.set(Store, 'bookings', this.RenderCalendar.bookings);
        // Vue.set(Store.TS, 'state', false);
        // Vue.set(Store.LS_CL, 'stack', {});
        // Store.stackLS_CL.reset();
    }
    saveSchedule(TS)
    {

    }
}
let Helper = new ForHelp();
export default Helper;

function standardDayClick(day) {
    console.log(day, Store.stackLS_CL.items);
    // check for undo
    if(Store.stackLS_CL.state != day.type) {
        Store.stackLS_CL.state = day.type;
        Store.stackLS_CL.resetVue(Store.stackLS_CL);
    }

    // add | remove from stack
    Store.stackLS_CL.addRemove(day, Store.stackLS_CL);
}

function ordersDayClick(day)
{
    Store.stackTS.resetVue(Store.stackTS);
    // to standard state
    if(day.toStandard) {
        Store.stackLS_CL.resetVue(Store.stackLS_CL);
        Store.stackTS.state = false;
        Store.state = 'standard';
        standardDayClick(day);
    }
    // show | hide clients
    else if(day.bookingsAmount) {
        Store.stackLS_CL.addRemoveOnce(day, Store.stackLS_CL);
    }
    // console.log(Store.stackLS_CL);
}
