const days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const daysX = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const WEEK = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

class DateServiceClass {
    constructor() { }

    getWeek(dayN, mondayFirst) {
        let t = new Date(dayN * 86400000);
        let mid = t.getDay();
        let arr = [];

        if (mondayFirst) {
            if (mid == 0)
                for (let i = 0; i < 7; i++)
                    arr.unshift(dayN - i);
            else
                for (let i = 1; i < 8; i++)
                    arr.push(dayN - (mid - i));
        }
        else {
            for (let i = 0; i < 7; i++)
                arr.push(dayN - (mid - i));
        }
        return arr;
    }

    getMonth(monthN) {
        let year = Math.floor(monthN / 12);
        let month = monthN - (year * 12);

        let res = {
            year,
            month,
            days: null,
        }

        if ((!(year % 4) && !!(year % 100)) || !(year % 400))
            res.days = daysX[month];
        else
            res.days = days[month];
        return res;
    }

    zeroToNum(num) {
        num = num.toString();
        num = num.length < 2 ? '0' + num : num;
        return num;
    }

    getDayStr(year, month, day) {
        let dayStr = year + '-';
        dayStr += this.zeroToNum(month + 1) + '-';
        dayStr += this.zeroToNum(day);
        return dayStr;
    }

    getWeeksInMonth(monthN, mondayFirst) {
        let monthObj = this.getMonth(monthN);
        let weeksInMonth = [];
        for (let i = 1; (i - monthObj.days) <= 7; i += 7) {
            let dayNM = i > monthObj.days ? monthObj.days : i;
            let dayStr = this.getDayStr(monthObj.year, monthObj.month, dayNM);

            dayNM = new Date(dayStr);
            dayNM = Math.floor(dayNM.getTime() / 86400000);
            weeksInMonth.push(this.getWeek(dayNM, mondayFirst));
        }
        if (weeksInMonth[weeksInMonth.length - 1][0] == weeksInMonth[weeksInMonth.length - 2][0])
            weeksInMonth.pop();
        return weeksInMonth;
    }

    addHourDelimiter(value) {
        return value.slice(0, 2) + ":" + value.slice(2, 4);
    }

    getScheduleCopy(schedule) {
        return JSON.parse(JSON.stringify(schedule));
    }

    getIntHours(time) {
        if(time.length < 2) return "";
        time = time.split(":").join("");
        return parseInt(time);
    }

    convertTime24to12(date) {
        date = date.split(":");
        var hours = parseInt(date[0]);
        var minutes = parseInt(date[1]);
        var ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        hours = hours < 10 ? '0' + hours : hours;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        var strTime = hours + ':' + minutes;
        return {
            time: strTime,
            ampm: ampm
        }
    }

    convertTime12to24(time12h) {
        const [time, modifier] = time12h.split(' ');

        let [hours, minutes] = time.split(':');

        if (hours === '12') {
            hours = '00';
        }

        if (modifier === 'PM') {
            hours = parseInt(hours, 10) + 12;
        }

        return `${hours}:${minutes}`;
    }

    getWeekRefByDateRef(ref) {
        let date = new Date(ref.split("d").join());
        return WEEK[date.getDay()];
    }
}
const DateService = new DateServiceClass();
export default DateService;