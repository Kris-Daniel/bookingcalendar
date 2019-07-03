import Vue from 'vue';

let RightSlideSTORE = new Vue({
    name: 'CalendarSTORE',
    data: function () {
        return {
            showFlag: false,
            calendarId: null,
            renderBlock: null
        }
    },
    methods: {
        render(ref, daysProps, data, calendarId) {
            this.calendarId = calendarId;
            this.renderBlock = data.type;
            this.showFlag = true;
            console.log(daysProps, ref, data, 'daysProps');
        }
    }
});

export default RightSlideSTORE;