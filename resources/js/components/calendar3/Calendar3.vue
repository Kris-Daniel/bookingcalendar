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
                    <div class="day_grid" :class="removeMarginGrid(index)" v-for="weekDay, key, index in CL.weekDays">
                        <div
                            class="day"
                            @click="tie('dayClickCL', weekDay)"
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
                    <div class="day_grid" :class="removeMarginGrid(n - 1)" v-for="n in CL.days['d1'].weekIndex"></div>
                    <div class="day_grid" :class="removeMarginGrid(day.weekIndex)" v-for="day in CL.days">
                        <div
                            class="day"
                            @click="tie('dayClickCL', day)"
                            :class="[tie('classesCL', day), {checked: day.checked}]"
                        >
                            <div class="day_name">
                                <div class="day_name-rel">
                                    {{day.index}}
                                    <div class="day_info"></div>
                                </div>
                            </div>
                        </div>
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
                    <div class="icon">
                        <div class="icon_plus"><Plus></Plus></div>
                        <div class="icon_mark"><Mark></Mark></div>
                    </div>
                    <div class="timeBox">
                        {{int.from}} - {{int.to}}
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
    import * as servSchedule from './data/data';
    import reactCalendar from './data/reactSchedule';

    const presset = servSchedule.data;
    let rc = new reactCalendar(presset);

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
            Plus
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
                    weekDays: RenderCalendar.weekDays,
                    store: new store(),
                },
                // Time setting
                TS: {
                    state: 'standard',
                    store: new store(),
                    render: {},
                    startEdit: false
                },
                // Left side
                LS: {
                    render: RenderCalendar.weekDays
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
                multiselect: true
            }
        },
        watch: {

        },
        created() {
            this.setStateMethods();
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
            changeMonth(side) {
                var fromSide = rc.find(cMonth[side], RenderCalendar);
                if(fromSide) {
                    cMonth = fromSide;
                    this.CL.year  = rc.find(cMonth.ref, RenderCalendar).index;
                    this.CL.month = fromSide.index - 1;
                    this.CL.days  = fromSide.days;
                }
            },
            changeTab(tab) {
                if(this.state != tab) {
                    this.undo();
                    this.state = tab;
                    let daysLS = this.LS_CL.state == 'week' ? RenderCalendar.weekDays : RenderCalendar.specialDays;
                    this.LS.render = daysLS;
                }
            },
            removeMarginGrid(n) {
                if(n == 0) return 'day_grid-ml0';
                if(n == 6) return 'day_grid-mr0';
                return '';
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
                    },
                    dayClickLS: {
                        standard: standardDayClickCL,
                        orders: function(arg) {
                            it.state = 'standard';
                            standardDayClickCL(arg);
                        }
                    },
                    classesCL: {
                        standard: standardDayClassesCL
                    },
                    changeStateLS: {
                        standard: it.setLS_CL,
                        orders: it.setLS_CL
                    },
                    clickIntTS: {
                        standard: standardClickIntTS
                    }
                }

                function standardDayClickCL(day) {
                    if(CL.store.length >= 10 && !day.checked) return false;
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
                this.CL.days = cMonth.days;
                this.CL.weekDays = RenderCalendar.weekDays;
                this.CL.store = new store();

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
            }
        }
    }
</script>
