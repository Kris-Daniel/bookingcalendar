<template>
    <div class="dcal" :class="wrapperClass">
        hello
        <div class="dcal_box">
            <div class="dcal_header">
                <div class="dcal_year">{{ newYear }}</div>
                {{ newDay }}
            </div>
            <div class="dcal_body" ref="popupBody">
                <div>
                    <div class="dcal_monthSelector">
                        <div class="dcal_monthSelector_prev" @click="previousMonth">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.3 102.8">
                                <path fill="none" stroke="#444" stroke-width="14" stroke-miterlimit="10"
                                      d="M56.3 97.8L9.9 51.4 56.3 5"/>
                            </svg>
                        </div>
                        <div class="dcal_monthSelector_current">{{ currentMonth }}</div>
                        <div class="dcal_monthSelector_next" @click="nextMonth">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 61.3 102.8">
                                <path fill="none" stroke="#444" stroke-width="14" stroke-miterlimit="10"
                                      d="M56.3 97.8L9.9 51.4 56.3 5"/>
                            </svg>
                        </div>
                    </div>
                    <div class="dcal_daysBox" :style="{height: datePickerHeight}">
                        <div class="dcal_weekdays">
                            <div class="dcal_weekday"
                                 v-for="weekday in weekdays">{{ weekday }}
                            </div>
                        </div>
                        <div class="dcal_days">
                            <div
                                    class="dcal_dayGrid" v-for="day in currentMonthDays"
                                    :class="{'dcal_day-selected': day.selected}"
                            >
                                <input v-if="day.number" type="checkbox" class="dcal_dayInput"
                                       :id="newYear + currentMonth + day.number">
                                <label
                                        v-if="day.number"
                                        :for="newYear + currentMonth + day.number"
                                        class="dcal_day"
                                        :class="{'dcal_day-empty': !day.number}"
                                >
                                    <label v-if="day.number" :for="newYear + currentMonth + day.number"
                                           class="dcal_daySelect">
                                        <span class="checked"></span>
                                    </label>
                                    <div class="dcal_num">
                                        {{ day.number }}
                                    </div>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="dcal_actions">
                <button class="dcal_btn" @click="myconsole">Click</button>
            </div>
        </div>
    </div>
</template>

<script>
    import Vue from 'vue';
    import moment from 'moment';

    import * as util from '../calendar/util';
    import typeFlowFactory from '../calendar/TypeFlows';

    export default {
        name: 'calendar2',
        props: {
            value: {
                type: String,
                required: true
            },
            type: {
                type: String,
                default: 'date'
            },
            inputFormat: {
                type: String,
                default: ''
            },
            wrapperClass: {type: String},
            inputClass: {type: String},
            placeholder: {type: String},
            momentLocale: {
                type: String,
                default: null
            },
            minDate: {
                type: String,
                default: null
            },
            maxDate: {
                type: String,
                default: null
            },
            disabledDates: {
                type: Array,
                default() {
                    return []
                }
            },
            mondayFirst: {
                type: Boolean,
                default: false
            },
            autoContinue: {
                type: Boolean,
                default: false
            },
            autoClose: {
                type: Boolean,
                default: false
            },
            required: {
                type: Boolean,
                default: false
            },
            i18n: {
                type: Object,
                default() {
                    return {
                        ok: 'Ok',
                        cancel: 'Cancel'
                    }
                }
            }
        },
        data() {
            let date = this.getDate();

            return {
                isOpen: false,
                show: null,
                date: date,
                newDate: null,
                currentMonthDate: null,
                typeFlow: typeFlowFactory(this.type, this, date ? date.clone() : moment().locale(this.momentLocale)),
                datePickerHeight: null
            }
        },
        watch: {
            value(newValue) {
                this.date = this.getDate();
                this.typeFlow.setDate(date ? date.clone() : moment().locale(this.momentLocale));
                this.newDate = this.getNewDate();
                this.currentMonthDate = this.getCurrentMonthDate();
            }
        },
        created() {
            /*if(this.date) {
                this.$emit('input', this.typeFlow.isoDate())
            }*/
            this.newDate = this.getNewDate();
            this.currentMonthDate = this.getCurrentMonthDate();
        },
        computed: {
            inputValue() {
                return this.typeFlow.format(this.date, this.inputFormat || this.typeFlow.inputFormat());
            },
            newDay() {
                return this.newDate.format('ddd, MMM D');
            },
            newYear() {
                return this.newDate.format('YYYY');
            },
            currentMonth() {
                return this.currentMonthDate.format('MMMM YYYY')
            },
            currentMonthDays() {
                const currentYear = this.currentMonthDate.year()
                const currentMonth = this.currentMonthDate.month()
                const isCurrentMonth = currentYear === this.newDate.year() &&
                    currentMonth === this.newDate.month()

                let days = util.monthDays(currentMonth, currentYear, this.mondayFirst);

                return days.map(day => {
                    return {
                        number: day || '',
                        selected: day ? isCurrentMonth && day === this.newDate.date() : false,
                        disabled: day ? this.isDisabled(moment([currentYear, currentMonth, day])) : true
                    }
                })
            },
            weekdays() {
                return util.weekdays(this.momentLocale, this.mondayFirst)
            }
        },
        methods: {
            myconsole() {
                console.log(this.currentMonthDays, 'days');
            },
            getDate() {
                return this.value.length ? moment(this.value, this.type === 'time' ? 'HH:mm' : null).locale(this.momentLocale) : null;
            },
            open() {

            },
            previousMonth() {
                this.currentMonthDate = this.currentMonthDate.clone().subtract(1, 'month')
            },
            nextMonth() {
                this.currentMonthDate = this.currentMonthDate.clone().add(1, 'month')
            },
            getNewDate() {
                let newDate = this.date ? this.date.clone() : moment().locale(this.momentLocale)

                for (let i = 0; i < 1e5 && this.isDisabled(newDate); i++) {
                    newDate = newDate.clone().add(1, 'day')
                }

                return newDate
            },
            isDisabled(date) {
                return (this.minDate && date.isBefore(this.minDate, 'day')) ||
                    (this.maxDate && date.isAfter(this.maxDate, 'day')) ||
                    (this.disabledDatesRanges && this.disabledDatesRanges.find(function (dates) {
                        return date.isBetween(dates[0], dates[1], 'day', '[)')
                    }) !== undefined)
            },
            getCurrentMonthDate() {
                return moment([this.newDate.year(), this.newDate.month(), 1]).locale(this.momentLocale)
            }

        }
    }
</script>



























































