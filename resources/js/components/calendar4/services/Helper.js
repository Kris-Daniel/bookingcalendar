import CalendarClass from './GetCalendar';

export default{
    InsCalendar: new CalendarClass(),
    RenderCalendar: new CalendarClass(),
    getDaysInMonth(year, month)
    {
        let daysNum = new Date(year, month, 0).getDate();
        return daysNum;
    },
    zeroToNum(num)
    {
        num = num.toString();
        num = num.length < 2 ? '0' + num : num;
        return num;
    },
    shortMonths(months) {
        let arr = [];
        months.forEach(function(item) {
            item = item.slice(0, 3);
            arr.push(item);
        });
        return arr;
    }
}
