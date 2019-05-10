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
    shortMonth(month)
    {
        return month.slice(0, 3);;
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
    fillWeekDay(d, WD)
    {
        let checked = Store.LS_CL.stack[d] ? true : false;
        return {
            ref: d,
            name: d,
            intervals: WD[d],
            type: 'week',
            checked,
        };
    }
    fillSpecialDay(d, SD)
    {
        let name = d.split('d').join('');
        let times = name.split('-');
        let monthName = this.shortMonth(
            Store.MONTHS[parseInt(times[1] - 1)]
        );
        let weekName = Store.WEEK[new Date(name).getDay()];
        let checked = Store.LS_CL.stack[d] ? true : false;
        let date = new Date(name).getTime();
        return {
            ref: d,
            name,
            monthName,
            weekName,
            year: parseInt(times[0]),
            month: parseInt(times[1]),
            day: parseInt(times[2]),
            intervals: SD[d],
            checked,
            type: 'day',
            date
        };
    }
    undo()
    {
        this.RenderCalendar = new CalendarClass();
        Vue.set(Store, 'schedule', this.RenderCalendar.schedule);
        Vue.set(Store, 'bookings', this.RenderCalendar.bookings);
        Vue.set(Store.LS_CL, 'stack', {});
    }
}
let Helper = new ForHelp();
export default Helper;

function standardDayClick(day)
{
    if(Store.LS_CL.state != day.type) {
        Helper.undo();
        // Vue.set(Store.LS_CL, 'stack', {});
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
    else {
        Vue.delete(stack, day.ref);
    }

    //
    if(day.type == 'day' && !Helper.InsCalendar.schedule.days[day.ref]) {
        if(!day.checked) {
            let intervals = Store.schedule.weekDays[day.weekName];
            Vue.set(Store.schedule.days, day.ref, intervals);
        } else if(day.checked) {
            Vue.delete(Store.schedule.days, day.ref);
        }
    }
    console.log(day);
}
function ordersDayClick(day)
{

}
