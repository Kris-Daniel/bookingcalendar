<template>
    <div
        class="dcal"
        :class="state"
    >
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
            <div class="TS_title">Time Settings</div>
            <div class="TS_descr">For April 15, 16</div>
            <div class="intervals">
                <div class="interval" v-for="int in SM.CI">
                    <div class="interval_data">
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


    export default {
        name: 'calendar2',
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
                year: cYear.index,
                month: cMonth,
                days: cMonth.days,
                monthNames: [
                    'January', 'February', 'March', 'April', 'May', 'June',
                    'Jule', 'August', 'September', 'October', 'November', 'December'
                ],
                weekDays: RenderCalendar.weekDays,
                weekNames: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
                checkedWeekDays: [],
                checkedDays: []
            }
        },
        watch: {

        },
        created() {
            console.log(this.year, this.month, this.days);
            this.setStateMethods();
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
            removeChecked(name) {
                for (var i = 0; i < this[name].length; i++) {
                    this[name][i].checked = false;
                }
                this[name] = [];
            },
            toSM(type, item) {
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
                    dayType: 'day',
                    CArr: [],
                    CI: {}

                };
                let SM = it.SM;

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
                    else if(SM.CArr.length == 1)
                        SM.CI = SM.CArr[0].intervals;
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
                            from: rc.parseToMins(len),
                            to: rc.parseToMins(len + step),
                            checked: false
                        }
                    }
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
