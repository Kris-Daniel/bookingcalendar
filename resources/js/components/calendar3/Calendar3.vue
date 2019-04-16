<template>
    <div
        class="dcal"
        :class="state"
    >
        <div class="SC">
            <div class="SC_head">
                <div class="SC_title">Schedule</div>

                <div class="SC_tab SC_tab-left" :class="{active: LS.state == 'regular'}">
                    <span class="SC_tab-text" @click="toSM('changeStateLS', 'regular')">Regular</span>
                </div>
                <div class="SC_tab SC_tab-right" :class="{active: LS.state == 'special'}">
                    <span class="SC_tab-text" @click="toSM('changeStateLS', 'special')">Special</span>
                </div>
            </div>

            <div class="SC_intervals">
                <div
                    v-for="day in LS.render"
                    class="SC_interval"
                    :class="{checked: day.dayObj.checked}"
                    @click="toSM('clickLS', day)"
                >
                    <div v-if="LS.state == 'regular'" class="SC_day">
                        {{day.name}}
                    </div>
                    <div v-else class="SC_day">
                        <div class="SC_day-month">{{day.day}}</div>
                        <div class="SC_day-day">{{day.month}}</div>
                    </div>
                    <div class="SC_timebox">
                        <div v-if="!day.intervals[0]" class="SC_time">
                            day off
                        </div>
                        <template v-else>
                            <div v-for="int in day.intervals" class="SC_time">
                                <span v-if="int.from">{{int.from}} - {{int.to}}</span>
                                <span v-else>{{int.intervals}}</span>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>

        <div class="main">
            <div class="tab_grid">
                <div
                    class="tab tab-left"
                    :class="{active: state == 'standard' || state ==  'delete'}"
                    @click="toSM('tab', 'standard')"
                ><span>Work hours</span></div>
            </div>
            <div class="tab_grid">
                <div
                    class="tab tab-right"
                    :class="{active: state == 'orders'}"
                    @click="toSM('tab', 'orders')"
                ><span>Your orders</span></div>
            </div>
            <div class="main_content">

                <div class="YM">
                    <div class="arrow arrow-left" @click="changeMonth('prev')">
                        <ArrowLeft></ArrowLeft>
                    </div>
                    <div class="YM_text YM_text-left">{{monthNames[month.index - 1]}}</div>
                    <div class="YM_text YM_text-right">{{year}}</div>
                    <div class="arrow arrow-right" @click="changeMonth('next')">
                        <ArrowRight></ArrowRight>
                    </div>
                </div>

                <div class="hr-top"></div>

                <div class="days weekdays">
                    <div class="day_grid" :class="removeMarginGrid(index)" v-for="item, key, index in weekDays">
                        <div
                            class="day"
                            @click="toSM('click', item)"
                            :class="[toSM('classes', item), {checked: item.checked}]"
                        >
                            <div class="day_name">
                                <div class="day_name-rel">
                                    {{item.name}}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="hr-bottom"></div>

                <div class="days main_days">
                    <div class="day_grid" :class="removeMarginGrid(n - 1)" v-for="n in days['d1'].weekIndex"></div>
                    <div class="day_grid" :class="removeMarginGrid(item.weekIndex)" v-for="item in days">
                        <div
                            class="day"
                            @click="toSM('click', item)"
                            :class="[toSM('classes', item), {checked: item.checked}]"
                        >
                            <div class="day_name">
                                <div class="day_name-rel">
                                    {{item.index}}
                                    <div class="day_info"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>

        <div v-if="SM.CArr.length" class="TS">
            <div class="TS_head">
                <div class="TS_title">Time Settings</div>
                <div class="TS_descr">For April 15, 16</div>
            </div>
            <div class="TS_intervals">
                <div class="TS_interval" v-for="int in SM.CI">
                    <div class="TS_interval_data">
                        {{int.from}} - {{int.to}} - {{int.checked}}
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import Vue from 'vue';
    import * as servSchedule from './data/data';
    import reactCalendar from './data/reactSchedule';
    import ArrowLeft from '../../svg/arrow-left';
    import ArrowRight from '../../svg/arrow-right';

    const presset = servSchedule.data;
    let rc = new reactCalendar(presset);

    let InsCalendar = rc.calendar;
    let InsServData = rc.data;

    let RenderCalendar, RenderServData, cYear, cMonth, cDay;

    setRendered();
    function setRendered() {
        RenderCalendar = JSON.parse(JSON.stringify(InsCalendar));
        RenderServData = JSON.parse(JSON.stringify(InsServData));

        console.log(RenderCalendar);

        cYear    = RenderCalendar.years['y' + RenderCalendar.cYear];
        cMonth   = cYear.months['m' + (RenderCalendar.cMonth + 1)];
        cDay     = cMonth.days['d' + RenderCalendar.cDay];
    }

    function stack() {
        this.length = 0;
    }

    export default {
        name: 'calendar3',
        components: {
            ArrowLeft,
            ArrowRight
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
                SCstate: 'regular',
                year: cYear.index,
                month: cMonth,
                days: cMonth.days,
                monthNames: [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'Jule', 'August', 'September', 'October', 'November', 'December'
                ],
                monthNamesShort: [
                    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
                ],
                weekDays: RenderCalendar.weekDays,
                weekNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                servDays: RenderServData.days,
                servWeekDays: RenderServData.weekDays,
                checkedWeekDays: [],
                checkedDays: [],
                scheduleInts: [],
                LS: {
                    state: 'regular',
                    stack: new stack(),
                    render: []
                }
            }
        },
        watch: {

        },
        created() {
            this.setStateMethods();
            this.toSM('renderLS');
        },
        computed: {

        },
        methods: {
            changeMonth(side) {
                var fromSide = rc.find(this.month[side], RenderCalendar);
                if(fromSide) {
                    this.month = fromSide;
                    this.days  = this.month.days;
                    this.year  = rc.find(this.month.ref, RenderCalendar).index;
                }
                console.log(this.year, this.month, this.days);
            },
            removeMarginGrid(n) {
                if(n == 0) return 'day_grid-ml0';
                if(n == 6) return 'day_grid-mr0';
                return '';
            },
            toSM(type, item) {
                if(this.SM[type]['all']) return this.SM[type]['all'](item);
                if(this.SM[type][this.state]) return this.SM[type][this.state](item);
            },
            setStateMethods() {
                let it = this;
                it.SM = {
                    click: {
                        'standard': clickDayStandard,
                        'delete': function() {},
                        'orders': clickDayOrder,
                        'client': clickDayClient
                    },
                    classes: {
                        'standard': dayClassesStandard,
                    },
                    tab: {
                        'standard': changeTab,
                        'delete': changeTab,
                        'orders': changeTab
                    },
                    changeStateLS: {
                        'all': changeStateLS
                    },
                    renderLS: {
                        'all': renderLS
                    },
                    clickLS: {
                        'standard': clickStandardLS
                    },
                    dayType: 'day',
                    CArr: [],
                    CI: {}

                };
                let SM = it.SM;
                let LS = it.LS;

                function clickDayStandard(day) {
                    day.checked = !day.checked;
                    if(day.checked) {
                        if(SM.dayType == day.type){
                            SM.CArr.push(day);
                        } else {
                            it.undo();
                            if(day.address)
                                day = rc.find(day.address, RenderCalendar);
                            else
                                day = it.weekDays[day.name];
                            day.checked = true;
                            SM.CArr.push(day);
                            SM.dayType = day.type;
                        }
                    } else {
                        uncheckFromArr(SM.CArr, day);
                    }

                    if(SM.CArr.length == 0)
                        SM.CI = {};
                    else if(SM.CArr.length == 1) {
                        let dayObj = SM.CArr[0];
                        if(
                            dayObj.isSpecial ||
                            dayObj.type == 'week'
                        ){
                            SM.CI = SM.CArr[0].intervals;
                            changeStateLS('regular');
                        }
                        else{
                            let weekName = it.weekNames[dayObj.weekIndex];
                            SM.CI = it.weekDays[weekName].intervals;
                            changeStateLS('special');
                        }

                    }
                    else
                        SM.CI = emptyIntervals();
                }
                function clickDayOrder() {

                }
                function clickDayClient() {

                }
                function dayClassesStandard(day) {
                    var classes = '';
                    if(day.current) classes += ' current';

                    // special days
                    if(day.isSpecial) {
                        if(day.hasIntervals) classes += ' special';
                        else classes += ' off';
                    }
                    // default days
                    else if(day.type == 'day') {
                        let weekName = it.weekNames[day.weekIndex];
                        if(it.weekDays[weekName].hasIntervals) classes += ' standard';
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

                function changeStateLS(state) {
                    if(LS.state != state) {
                        LS.state = state;
                        LS.stack = new Stack();
                        renderLS();
                    }
                }

                function renderLS() {
                    LS.render = [];
                    if(LS.state == 'regular') {
                        for(let day in RenderServData.weekDays) {
                            LS.render.push({
                                name: day,
                                intervals: RenderServData.weekDays[day],
                                dayObj: RenderCalendar.weekDays[day]
                            });
                        }
                    }
                    else if(LS.state == 'special') {
                        for(let day in RenderServData.days) {
                            let date  = new Date(day.split('d').join(''));
                            let y = 'y' + date.getFullYear();
                            let m = 'm' + date.getMonth();
                            let d = 'd' + date.getDate();

                            let month = it.monthNamesShort[date.getMonth()];
                            let monthDay = date.getDate();
                            LS.render.push({
                                name: day,
                                month,
                                day: monthDay,
                                intervals: RenderServData.days[day],
                                dayObj: rc.find([y, m, d], RenderCalendar)
                            });
                        }
                    }
                }

                function clickStandardLS(day) {
                    day.checked = !day.checked;
                    if (day.checked) {
                        LS.stack[day.name] = day;
                    }
                    else {
                        delete LS.stack[day.name];
                    }
                }

                function changeTab(state) {
                    if(it.state != state){
                        it.undo();
                        it.state = state;
                    }
                }

                function uncheckFromArr(arr, item) {
                    for (var i = 0; i < arr.length; i++) {
                        if(arr[i] == item) {
                            arr.splice(i, 1);
                            break;
                        }
                    }
                }

                function emptyIntervals() {
                    let len  = 24 * 60;
                    let step = RenderServData.segment;
                    let intervals = {};
                    for(let i = 0; i < len; i += step) {
                        intervals['i' + i / step] = {
                            from: rc.parseToMins(i),
                            to: rc.parseToMins(i + step),
                            checked: false
                        }
                    }
                    console.log(intervals);
                    return intervals;
                }

            },
            undo() {
                setRendered();
                this.month = rc.find(['y' + this.year, 'm' + this.month.index], RenderCalendar);
                this.days  = this.month.days;
                this.weekDays = RenderCalendar.weekDays;
                this.SM.CArr = [];
                this.SM.CI = {};
            }
        }
    }
</script>
