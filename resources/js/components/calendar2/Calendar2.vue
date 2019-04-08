<template>
    <div class="dcal">
        <div v-for="n in cMonth.days.d7.date.getDay()"></div>
        <div v-for="item in cMonth.days">{{item.date.getDate()}}</div>

        <button @click="changeMonth('prev')">prev</button>
        <button @click="changeMonth('next')">next</button>
    </div>
</template>

<script>
    import Vue from 'vue';
    import moment from 'moment';
    import * as servSchedule from './data/data';
    import reactCalendar from './data/reactSchedule';

    const presset = servSchedule.data;
    var rc = new reactCalendar(presset);
    let calendar = rc.calendar;
    let cYear = calendar.years['y' + calendar.time.getFullYear()];
    let cMonth = cYear.months['m' + (calendar.time.getMonth() + 1)];
    let cDay = cMonth.days['d' + calendar.time.getDate()];
    export default {
        name: 'calendar2',
        props: {

        },
        data() {
            return {
                vflag: true
            }
        },
        watch: {
            value() {

            }
        },
        created() {
            /*if(this.date) {
                this.$emit('input', this.typeFlow.isoDate())
            }*/
        },
        computed: {
            rc() {
                this.notF();
                return rc;
            },
            cYear() {
                this.notF();
                return cYear;
            },
            cMonth() {
                this.notF();
                return cMonth;
            },
            cDay() {
                this.notF();
                return cDay;
            }
        },
        methods: {
            changeMonth(side) {
                if(cMonth[side]) cMonth = cMonth[side];
                cYear = cMonth.ref;
                this.notF();
                console.log(this.cMonth, cYear, side);
            },
            notF() {
                this.vflag = !this.vflag;
            }
        }
    }
</script>



























































