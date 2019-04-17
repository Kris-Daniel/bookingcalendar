<template>
    <div
        class="dcal"
        :class="state"
    >
        <div class="SC">
            <div class="SC_head">
                <div class="SC_title">Schedule</div>

                <div class="SC_tab SC_tab-left" :class="{active: LS.state == 'regular'}">
                    <span class="SC_tab-text" @click="tie('changeStateLS', 'regular')">Regular</span>
                </div>
                <div class="SC_tab SC_tab-right" :class="{active: LS.state == 'special'}">
                    <span class="SC_tab-text" @click="tie('changeStateLS', 'special')">Special</span>
                </div>
            </div>

            <div class="SC_intervals">
                <div
                    v-for="day in LS.render"
                    class="SC_interval"
                    :class="{checked: day.checked}"
                    @click="tie('dayClickCL', day)"
                >
                    <div v-if="LS.state == 'regular'" class="SC_day">
                        {{day.name}}
                    </div>
                    <div v-else class="SC_day">
                        <div class="SC_day-month">{{day.index}}</div>
                        <div class="SC_day-day">{{shortMONTHS[day.month]}}</div>
                    </div>
                    <div class="SC_timebox">
                        <div v-if="!day.hasIntervals" class="SC_time">
                            day off
                        </div>
                        <template v-else>
                            <div v-for="int in day.sliceIntervals" class="SC_time">
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

                <div class="days main_days">
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
            <div class="TS_intervals">
                <div class="TS_interval" v-for="int in TS.render">
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
    import ArrowLeft from '../../svg/arrow-left';
    import ArrowRight from '../../svg/arrow-right';
    import * as servSchedule from './data/data';
    import reactCalendar from './data/reactSchedule';

    const presset = servSchedule.data;
    let rc = new reactCalendar(presset);

    let RenderCalendar, RenderServData, cMonth;

    setRendered();
    function setRendered(address) {
        RenderCalendar = JSON.parse(JSON.stringify(rc.calendar));
        RenderServData = JSON.parse(JSON.stringify(rc.data));

        if(address)
            cMonth = rc.find(address, RenderCalendar);
        else
            cMonth = RenderCalendar.years['y' + RenderCalendar.cYear].months['m' + (RenderCalendar.cMonth + 1)];

        console.log(rc);
    }

    function store(type) {
        this.length = 0;
        if(type) this.type = type;
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
                    render: {}
                },
                // Left side
                LS: {
                    state: '',
                    store: new store(),
                    render: {}
                },
                // Additional
                MONTHS: [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'Jule', 'August', 'September', 'October', 'November', 'December'
                ],
                WEEK: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']
            }
        },
        watch: {

        },
        created() {
            this.setStateMethods();
            this.setLS('regular');
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
                console.log(this.CL);
            },
            removeMarginGrid(n) {
                if(n == 0) return 'day_grid-ml0';
                if(n == 6) return 'day_grid-mr0';
                return '';
            },
            tie(method, arg) {
                if(this.SM[method]['all']) return this.SM[method]['all'](arg);
                if(this.SM[method][this.state]) return this.SM[method][this.state](arg);
            },
            setLS(state) {
                let LS = this.LS;
                if(state && LS.state != state){
                    LS.state = state;
                    if(LS.state == 'regular') {
                        LS.render =  this.CL.weekDays;
                    }
                    else if(LS.state == 'special') {
                        LS.render = {};
                        let SpecDays = RenderCalendar.specialDays;
                        for(let i in SpecDays) {
                            LS.render[i] = rc.find(SpecDays[i].address, RenderCalendar);
                        }
                    }
                }
                console.log(LS);

            },
            setStateMethods() {
                let it = this;
                let CL = it.CL;
                let LS = it.LS;
                let TS = it.TS;
                it.SM = {
                    dayClickCL: {
                        standard: standardDayClickCL
                    },
                    classesCL: {
                        standard: standardDayClassesCL
                    },
                    changeStateLS: {
                        standard: standardChangeStateLS
                    }
                }

                function standardDayClickCL(day) {
                    day.checked = !day.checked;
                    if(day.checked) {
                        if(CL.store.type == day.type) {
                            CL.store[day.name] = day;
                            addToRenderLS();
                        }
                        else{
                            setChangeStateLS();
                            addToRenderLS();

                            CL.store = new store(day.type);
                            if(day.type == 'week') {
                                day = CL.weekDays[day.name];
                            }
                            else if(day.type == 'day') {
                                day = CL.days['d' + day.index];

                            }
                            day.checked = true;
                            CL.store[day.name] = day;
                        }
                        CL.store.length++;
                    } else {
                        delete CL.store[day.name];
                        CL.store.length--;
                        deleteFromRenderLS();
                    }

                    if(CL.store.length == 0)
                        TS.render = {};
                    else if(CL.store.length == 1) {
                        for(let key in CL.store) {
                            if(key != 'length' && key != 'type')
                                TS.render = CL.store[key].intervals;
                        }
                    }
                    else
                        TS.render = emptyIntervals();


                    function setChangeStateLS() {
                        if(day.type == 'week') standardChangeStateLS('regular');
                        else standardChangeStateLS('special');
                    }
                    function addToRenderLS() {
                        if(day.type == 'day') {
                            RenderCalendar.specialDays[day.name] = day;
                            setRenderLS();
                        }
                    }
                    function deleteFromRenderLS() {
                        if(day.type == 'day' && !RenderCalendar.specialDays[day.name].isSpecial) {
                            delete RenderCalendar.specialDays[day.name];
                            setRenderLS();
                        }
                    }
                    function setRenderLS() {
                        LS.render = {};
                        let SpecDays = RenderCalendar.specialDays;
                        for(let i in SpecDays) {
                            LS.render[i] = rc.find(SpecDays[i].address, RenderCalendar);
                        }
                    }
                }

                function standardDayClassesCL(day) {
                    var classes = '';
                    if(day.current) classes += ' current';

                    // special days
                    if(day.isSpecial) {
                        if(day.hasIntervals) classes += ' special';
                        else classes += ' off';
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

                function standardChangeStateLS(state) {
                    if(state != LS.state) {
                        it.undo();
                        it.setLS(state);
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
                    return intervals;
                }
            },
            undo() {
                setRendered([
                    'y' + this.CL.year,
                    'm' + (this.CL.month + 1)
                ]);
                this.CL.days = cMonth.days;
                this.CL.weekDays = RenderCalendar.weekDays;
                this.CL.store = new store('day');
            }
        }
    }
</script>
