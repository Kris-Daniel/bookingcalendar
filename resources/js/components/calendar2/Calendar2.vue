<template>
    <div class="dcal">
        <div class="main">
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
                        class="day_rel"
                        @click="checkDay(item)"
                        :class="{
                            day_checked: item.checked,
                            dayOff: checkDayOff(item)
                        }"
                    >
                        <div class="day_name bold">
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
                        class="day_rel"
                        @click="checkDay(item)"
                        :class="{
                            day_checked: item.checked,
                            current: item.current,
                            dayOff: checkDayOff(item)
                        }"
                    >
                        <div class="day_name">
                            <div class="day_name-rel">
                                {{item.index}}
                                <div v-if="item.isSpecial && item.hasIntervals" class="day_info"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    </div>
</template>

<script>
    import Vue from 'vue';
    import moment from 'moment';
    import * as servSchedule from './data/data';
    import reactCalendar from './data/reactSchedule';
    import ArrowLeft from '../../svg/arrow-left';
    import ArrowRight from '../../svg/arrow-right';

    const presset = servSchedule.data;
    let rc = new reactCalendar(presset);

    let InsCalendar = rc.calendar;
    let InsServData = rc.data;

    let RenderCalendar = JSON.parse(JSON.stringify(InsCalendar));
    let RenderServData = JSON.parse(JSON.stringify(InsServData));

    RenderCalendar.test = 'test';
    console.log(InsCalendar, RenderCalendar);

    let cYear    = RenderCalendar.years['y' + RenderCalendar.cYear];
    let cMonth   = cYear.months['m' + (RenderCalendar.cMonth + 1)];
    let cDay     = cMonth.days['d' + RenderCalendar.cDay];

    export default {
        name: 'calendar2',
        components: {
            ArrowLeft,
            ArrowRight
        },
        props: {

        },
        data() {
            return {
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
        },
        computed: {

        },
        methods: {
            changeMonth(side) {
                var fromSide = rc.find(this.month[side]);
                if(fromSide) {
                    this.month = fromSide;
                    this.days  = this.month.days;
                    this.year  = rc.find(this.month.ref).index;
                }
                console.log(this.year, this.month, this.days);

            },
            checkDay(item) {
                if(item.date) {
                    this.removeChecked('checkedWeekDays');
                    this.checkedDays.push(item);
                }
                else {
                    this.removeChecked('checkedDays');
                    this.checkedWeekDays.push(item);
                }
                var prev = rc.find(item.prev);
                var next = rc.find(item.next);
                item.checked = !item.checked;
                console.log(item);
                // console.log(prev.intervals, item.intervals, next.intervals);
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
            checkDayOff(day) {
                if(day.date) {
                    let weekDay = this.weekNames[day.weekIndex];
                    if(day.isSpecial && !day.hasIntervals) return true;
                    if(this.weekDays[weekDay].hasIntervals || day.hasIntervals) return false;
                }else{
                    if(day.hasIntervals) return false
                }
                return true;
            }
        }
    }
</script>
