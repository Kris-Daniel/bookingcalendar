<template>
    <div
        class="dcal"
        :class="state"
    >
        <div class="LS">
            <div class="LS_head">
                <div class="LS_title">Schedule</div>
                <div class="LS_tabs">
                    <div class="tab" :class="{active: LS_CL.state == 'week'}">
                        <span class="name" @click="tie('changeStateLS', 'week')">Regular</span>
                    </div>
                    <div class="tab" :class="{active: LS_CL.state == 'day'}">
                        <span class="name" @click="tie('changeStateLS', 'day')">Special</span>
                    </div>
                </div>

            </div>

            <div class="intervals">
                <div
                    v-for="day in LS.render"
                    class="interval interval-sch"
                    :class="{checked: day.checked}"
                    @click="tie('dayClickLS', day)"
                >
                    <div v-if="LS_CL.state == 'week'" class="dateBox">
                        {{day.name}}
                    </div>
                    <div v-else class="dateBox">
                        <div class="dateBox_day">{{day.index}}</div>
                        <div class="dateBox_month">{{shortMONTHS[day.month]}}</div>
                    </div>
                    <div class="timeBox">
                        <div v-if="!day.hasIntervals" class="timeBox_time timeBox_time-off">
                            day off
                        </div>
                        <template v-else>
                            <div v-for="int in day.sliceIntervals" class="timeBox_time">
                                <span v-if="int.from">{{int.from}} - {{int.to}}</span>
                                <span v-else>{{int.intervals}}</span>
                            </div>
                        </template>
                    </div>
                    <div class="edit">
                        <Pencil></Pencil>
                    </div>
                </div>
            </div>
        </div>

        <div class="CL">
            <div class="tab_grid">
                <div
                    class="tab tab-left"
                    :class="{active: state == 'standard' || state ==  'delete'}"
                    @click="changeTab('standard')"
                ><span>Work hours</span></div>
            </div>
            <div class="tab_grid">
                <div
                    class="tab tab-right"
                    :class="{active: state == 'orders'}"
                    @click="changeTab('orders')"
                ><span>Your orders</span></div>
            </div>
            <div class="CL_content">

                <div class="YM">
                    <div class="arrow arrow-left" @click="changeMonth('prev')">
                        <ArrowLeft></ArrowLeft>
                    </div>
                    <div class="YM_text YM_text-left">{{MONTHS[CL.month]}}</div>
                    <div class="YM_text YM_text-right">{{CL.year}}</div>
                    <div class="arrow arrow-right" @click="changeMonth('next')">
                        <ArrowRight></ArrowRight>
                    </div>
                </div>

                <div class="hr-top"></div>

                <div class="days weekdays">
                    <div class="day_grid" v-for="weekDay, key, index in CL.weekDays">
                        <div
                            class="day"
                            @click="tie('dayClickLS', weekDay)"
                            :class="[tie('classesCL', weekDay), {checked: weekDay.checked}]"
                        >
                            <div class="day_name">
                                <div class="day_name-rel">
                                    {{weekDay.name}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="hr-bottom"></div>

                <div class="days CL_days">
                    <div class="day_grid" v-for="n in weekSetting.offset"></div>
                    <div class="day_grid" v-for="day in CL.days">
                        <div
                            class="day"
                            @click="tie('dayClickCL', day)"
                            :class="[tie('classesCL', day), {checked: day.checked}]"
                        >
                            <div class="day_name">
                                <div class="day_name-rel">
                                    {{day.index}}
                                    <div v-if="state == 'standard'" class="day_info"></div>
                                </div>
                            </div>
                            <div v-if="state == 'orders' && day.bookLength" class="day_bookCount">{{day.bookLength}}</div>
                        </div>
                    </div>
                </div>

            </div>
            <div
                v-if="TS.client"
                @click="tie('clearClient')"
                class="client_mask"
            ></div>
            <div
                class="client"
                :class="{active: TS.client}"
            >
                <div class="client_box">
                    <div
                        @click="tie('clearClient')"
                        class="client_x"
                    >
                        <X></X>
                    </div>
                    <div class="client_img">

                    </div>
                    <div class="client_name">{{TS.client.name}}</div>
                    <div class="client_hr"></div>
                    <div class="client_info">
                        <div class="client_icon"></div>
                        <div class="client_text"></div>
                    </div>
                </div>
            </div>
        </div>

        <div v-if="CL.store.length" class="TS">
            <div class="TS_head">
                <div class="TS_title">Time Settings</div>
                <div class="TS_descr">For April 15, 16</div>
            </div>
            <div class="intervals">
                <div
                    v-for="int in TS.render"
                    class="interval interval-hours"
                    :class="[{checked: int.checked}]"
                    @click="tie('clickIntTS', int)"
                >
                    <div v-if="state == 'orders'" class="interval_title">
                        {{int.name}}
                    </div>
                    <div v-if="state == 'standard'" class="icon">
                        <div class="icon_plus"><Plus></Plus></div>
                        <div class="icon_mark"><Mark></Mark></div>
                    </div>
                    <div class="timeBox">
                        {{toHoursFormat(int.from)}} - {{toHoursFormat(int.to)}}
                    </div>
                </div>
            </div>
            <div
                class="btn-save"
                @click="save()"
                v-if="state == 'standard'"
            >
                Schedule
            </div>
        </div>


    </div>
</template>

<script>
    import Vue from 'vue';
    import ArrowLeft from '../../svg/arrow-left';
    import ArrowRight from '../../svg/arrow-right';
    import Pencil from '../../svg/pencil';
    import Mark from '../../svg/mark';
    import Plus from '../../svg/plus';
    import X from '../../svg/x';
    import * as servSchedule from './data/data';
    import reactCalendar from './data/reactSchedule';

    const presset = servSchedule.data;
    const bookings = servSchedule.bookings;
    let rc = new reactCalendar(presset);
    rc.addBookings(bookings);

    let RenderCalendar, cMonth;

    setRendered();
    function setRendered(address) {
        RenderCalendar = JSON.parse(JSON.stringify(rc.calendar));

        if(address)
            cMonth = rc.find(address, RenderCalendar);
        else
            cMonth = RenderCalendar.years['y' + RenderCalendar.cYear].months['m' + (RenderCalendar.cMonth + 1)];

    }
    console.log(rc);

    function store(type) {
        this.items = {};
        this.length = 0;
    }

    export default {
        name: 'calendar3',
        components: {
            ArrowLeft,
            ArrowRight,
            Pencil,
            Mark,
            Plus,
            X
        },
        props: {
            stateProp: {
                default: 'standard',
                required: false
            }
        },
        data() {
            return {
                state: this.stateProp,
                // Calendar
                CL: {
                    year: rc.find(cMonth.ref, RenderCalendar).index,
                    month: cMonth.index - 1,
                    days: cMonth.days,
                    weekDays: '',
                    store: new store(),
                },
                // Time setting
                TS: {
                    state: 'standard',
                    store: new store(),
                    render: {},
                    startEdit: false,
                    client: false
                },
                // Left side
                LS: {
                    render: ''
                },
                LS_CL: {
                    state: 'week',
                },
                // Additional
                MONTHS: [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'Jule', 'August', 'September', 'October', 'November', 'December'
                ],
                WEEK: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                multiselect: true,
                weekSetting: {
                    mondayFirst: true,
                    offset: 0
                },
                hoursFormat: '12h'
            }
        },
        watch: {

        },
        created() {
            let it = this;
            it.setStateMethods();
            it.setWeekSetting();
        },
        computed: {
            shortMONTHS: function() {
                let arr = [];
                this.MONTHS.forEach(function(item) {
                    item = item.slice(0, 3);
                    arr.push(item);
                });
                return arr;
            }
        },
        methods: {
            setWeekSetting() {
                let wk = this.weekSetting;
                wk.offset = this.CL.days['d1'].weekIndex;
                if(wk.mondayFirst) {
                    wk.offset--;
                    wk.offset = wk.offset < 0 ? 6 : wk.offset;
                }

                let seq = this.WEEK;
                let temp = undefined;
                if(this.weekSetting.mondayFirst) {
                    seq = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
                }
                for(let i = 0; i < seq.length; i++) {
                    temp = RenderCalendar.weekDays[seq[i]];
                    delete RenderCalendar.weekDays[seq[i]];
                    RenderCalendar.weekDays[seq[i]] = temp;
                }
                if(this.LS_CL.state == 'week') {
                    this.LS.render = RenderCalendar.weekDays;
                    this.CL.weekDays = RenderCalendar.weekDays;
                }
            },
            toHoursFormat(time) {
                let format = '';
                if(this.hoursFormat == '12h') {
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
            },
            changeMonth(side) {
                var fromSide = rc.find(cMonth[side], RenderCalendar);
                if(fromSide) {
                    cMonth = fromSide;
                    this.CL.year  = rc.find(cMonth.ref, RenderCalendar).index;
                    this.CL.month = fromSide.index - 1;
                    this.CL.days  = fromSide.days;
                }
                this.setWeekSetting();
            },
            changeTab(tab) {
                if(this.state != tab) {
                    this.undo();
                    this.state = tab;
                    let daysLS = this.LS_CL.state == 'week' ? RenderCalendar.weekDays : RenderCalendar.specialDays;
                    this.LS.render = daysLS;
                }
            },
            setLS_CL(state) {
                let LS_CL = this.LS_CL;
                if(state && LS_CL.state != state){
                    this.undo();
                    LS_CL.state = state;
                    if(LS_CL.state == 'week') {
                        this.LS.render =  this.CL.weekDays;
                    }
                    else if(LS_CL.state == 'day') {
                        this.setRenderSpecLS();
                    }
                }
            },
            setRenderSpecLS() {
                this.LS.render = [];
                let SpecDays = RenderCalendar.specialDays;
                for(let i in SpecDays) {
                    this.LS.render.push(rc.find(SpecDays[i].address, RenderCalendar));
                }
                this.LS.render.sort(function (a, b) {
                    if (a.date > b.date) {
                        return 1;
                    }
                    if (a.date < b.date) {
                        return -1;
                    }
                    return 0;
                });
            },
            tie(method, arg) {
                if(this.SM[method]['all']) return this.SM[method]['all'](arg);
                if(this.SM[method][this.state]) return this.SM[method][this.state](arg);
            },
            setStateMethods() {
                let it = this;
                let CL = it.CL;
                let LS = it.LS;
                let TS = it.TS;
                let LS_CL = it.LS_CL;
                it.SM = {
                    dayClickCL: {
                        standard: standardDayClickCL,
                        orders: ordersDayClickCL
                    },
                    dayClickLS: {
                        standard: standardDayClickCL,
                        orders: function(arg) {
                            it.state = 'standard';
                            for(let i in CL.store.items) {
                                CL.store.items[i].checked = false;
                                delete CL.store.items[i];
                                CL.store.length--;
                            }
                            standardDayClickCL(arg);
                        }
                    },
                    classesCL: {
                        standard: standardDayClassesCL,
                        orders: ordersDayClassesCL
                    },
                    changeStateLS: {
                        standard: it.setLS_CL,
                        orders: it.setLS_CL
                    },
                    clickIntTS: {
                        standard: standardClickIntTS,
                        orders: ordersClickIntTS
                    },
                    clearClient: {
                        orders: ordersClearClient
                    }
                }

                function standardDayClickCL(day) {
                    ordersClearClient();
                    if(CL.store.length >= 10 && !day.checked && it.LS_CL.state == day.type) return false;
                    day.checked = !day.checked;

                    // check action
                    if(day.checked) {
                        if(LS_CL.state == day.type) {
                            if(!it.multiselect) {
                                it.undo();
                            }
                            pushDayLS_CL(day);
                        }
                        else{
                            it.setLS_CL(day.type);
                            pushDayLS_CL(day);
                        }
                    }
                    // uncheck action
                    else {
                        let refDay;
                        if(day.type == 'day') {
                            refDay = rc.find(day.address, rc.calendar);
                        }
                        else {
                            refDay = rc.calendar.weekDays[day.name];
                        }
                        day.hasIntervals = refDay.hasIntervals;
                        day.intervals = refDay.intervals;
                        day.isSpecial = refDay.isSpecial;
                        day.sliceIntervals = refDay.sliceIntervals;

                        delete CL.store.items[day.name];
                        CL.store.length--;
                        if(day.type == 'day' && !RenderCalendar.specialDays[day.name].isSpecial) {
                            delete RenderCalendar.specialDays[day.name];
                            it.setRenderSpecLS();
                        }
                    }

                    // insert interval
                    if(CL.store.length == 0) {
                        TS.render = {};
                        it.undo();
                        it.TS.startEdit = false;
                        insertFromRenderToCL();
                    }
                    else if(CL.store.length == 1) {
                        let items = CL.store.items;
                        for(let i in items) {
                            if(items[i].type == 'day' && !items[i].isSpecial) {
                                let weekName = it.WEEK[items[i].weekIndex];
                                TS.render = it.CL.weekDays[weekName].intervals;
                            }
                            else {
                                TS.render = items[i].intervals;
                            }
                            insertFromRenderToCL();
                        }
                    }
                    else {
                        if(!it.TS.startEdit) {
                            TS.render = emptyIntervals();
                            insertSlicedIntervalsToLS(day);
                        }
                        else if(it.TS.startEdit){
                            insertFromRenderToCL();
                        }
                    }
                }
                function ordersDayClickCL(day) {
                    if(day.bookings) {
                        day.checked = !day.checked;
                        if(day.checked) {
                            it.undo();
                            day = rc.find(day.address, RenderCalendar);
                            day.checked = true;
                            if(CL.store.length >= 1) {
                                for(let i in CL.store.items) {
                                    CL.store.items[i].checked = false;
                                    delete CL.store.items[i];
                                }
                            }
                            CL.store.items[day.name] = day;
                            CL.store.length = 1;
                            TS.render = day.bookings;
                        } else {
                            delete CL.store.items[day.name];
                            CL.store.length--;
                        }
                    }
                }
                function pushDayLS_CL(day) {
                    if(day.type == 'week') {
                        day = CL.weekDays[day.name];
                        LS.render = CL.weekDays;
                    }
                    else if(day.type == 'day') {
                        day = CL.days['d' + day.index];
                        RenderCalendar.specialDays[day.name] = day;
                        it.setRenderSpecLS();
                    }
                    day.checked = true;
                    CL.store.items[day.name] = day;
                    CL.store.length++;
                }
                function standardDayClassesCL(day) {
                    var classes = '';
                    if(day.current) classes += ' current';

                    // special days
                    if(day.isSpecial) {
                        classes += ' special';
                        if(!day.hasIntervals) classes += ' off';
                    }
                    // default days
                    else if(day.type == 'day') {
                        let weekName = it.WEEK[day.weekIndex];
                        if(it.CL.weekDays[weekName].hasIntervals) classes += ' standard';
                        else classes += ' off';
                    }
                    // week days
                    else if(day.type == 'week') {
                        classes += ' bold';
                        if(day.hasIntervals) classes += ' standard';
                        else classes += ' off';
                    }
                    return classes;
                }
                function ordersDayClassesCL(day) {
                    let classes = '';
                    if(day.type == 'week') {
                        classes += ' bold';
                    }
                    else if(day.bookings) {
                        classes += '';
                    } else{
                        classes += ' off'
                    }
                    return classes;
                }
                function emptyIntervals() {
                    let len  = 24 * 60;
                    let step = RenderCalendar.segment;
                    let intervals = {};
                    for(let i = 0; i < len; i += step) {
                        intervals['i' + i / step] = {
                            from: rc.parseToMins(i),
                            to: rc.parseToMins(i + step),
                            checked: false
                        }
                    }
                    return intervals;
                }
                function standardClickIntTS(int) {
                    int.checked = !int.checked;
                    it.TS.startEdit = true;
                    insertFromRenderToCL();
                }
                function ordersClickIntTS(int) {
                    for(let i = 0; i < TS.render.length; i++) {
                        TS.render[i].checked = false;
                    }
                    int.checked = !int.checked;
                    TS.client = false;
                    TS.client = int;
                }
                function ordersClearClient() {
                    for(let i = 0; i < TS.render.length; i++) {
                        TS.render[i].checked = false;
                    }
                    TS.client = false;
                }
                function insertFromRenderToCL() {
                    let sliced = rc.sliceIntervals(TS.render);
                    for(let i in CL.store.items) {
                        CL.store.items[i].hasIntervals = sliced.length > 0 ? true : false;
                        CL.store.items[i].sliceIntervals = sliced;
                        CL.store.items[i].intervals = TS.render;
                        if(LS_CL.state == 'day') {
                            CL.store.items[i].isSpecial = true;
                        }
                    }
                }
                function insertSlicedIntervalsToLS(day) {
                    if(LS_CL.state == 'day') {
                        let items = CL.store.items;
                        for(let i in items) {
                            if(!items[i].isSpecial) {
                                let weekName = it.WEEK[items[i].weekIndex];
                                items[i].sliceIntervals = CL.weekDays[weekName].sliceIntervals;
                                items[i].hasIntervals = CL.weekDays[weekName].hasIntervals;
                            }
                        }
                    }
                }
            },
            undo() {
                setRendered([
                    'y' + this.CL.year,
                    'm' + (this.CL.month + 1)
                ]);
                this.setWeekSetting();
                this.CL.days = cMonth.days;
                this.CL.weekDays = RenderCalendar.weekDays;
                this.CL.store = new store();
                this.TS.client = false;
                // this.TS.render = new store();
            },
            save() {
                let days = this.CL.store.items;
                for(let day in days) {
                    days[day].intervals = this.TS.render;
                    days[day].checked = false;
                    days[day].hasIntervals = false;
                    for(let i in this.TS.render) {
                        if(this.TS.render[i].checked == true) {
                            days[day].hasIntervals = true;
                            break;
                        }
                    }
                    if(this.LS_CL.state == 'day') {
                        days[day].isSpecial = true;
                    }
                }
                rc.calendar = JSON.parse(JSON.stringify(RenderCalendar));
                this.TS.startEdit = false;
                this.undo();
            },
        }
    }
</script>
