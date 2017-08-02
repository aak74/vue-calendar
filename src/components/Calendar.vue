<template id='calendar'>
<div class="calendar-layout">
  <div class='calendar'>
    <div class='header'>
      <a class='arrow' @click='movePreviousYear'>&laquo;</a>
      <a class='arrow' @click='movePreviousMonth'>&lsaquo;</a>
      <span class='title' @click='moveThisMonth'>
        {{ header.label }}
      </span>
      <a class='arrow' @click='moveNextMonth'>&rsaquo;</a>
      <a class='arrow' @click='moveNextYear'>&raquo;</a>
    </div>
    <div class='weekdays'>
      <div class='weekday' v-bind:class="{ 'weekday-today': weekday.isToday }" v-for='(weekday, index) in weekdays'>
        {{ weekday.nameShort }}
      </div>
    </div>
    <div class='week' v-for='week in weeks'>
      <div class='day' :class='{ today: day.isToday, "not-in-month": !day.inMonth }' v-for='day in week'>
        <span class="day__title">{{ day.day }}</span>
        <events :events="day.events" :date="day.dateStr" @addEvent="addEvent"></events>
      </div>
    </div>
  </div>
</div>
</template>


<script>
import Names from '../config/locale'
import Events from './Events'

// Calendar data
const _daysInMonths = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
const _today = new Date();
const _todayComps = {
  year: _today.getFullYear(),
  month: _today.getMonth() + 1,
  day: _today.getDate(),
};


let pad = function(num, size) {
  if (size === undefined) {
    size = 2
  }
  var s = num + "";
  while (s.length < size) s = "0" + s;
  return s;
}

export default {
  components: {
    Events
  },
  data() {
    return {
      month: _todayComps.month,
      year: _todayComps.year,
    };
  },
  props: {
    events : {
      type : Array,
      default : []
    },
    startWeek: {
      type : Number | String,
      validator (val) {
        let res = parseInt(val);
        return res == 0 || res == 1
      },
      default: 0
    },
    locale: {
      type: String,
      validator (val) {
        return Names[val] !== undefined
      },
      default: 'en'
    },
  },
  computed: {
    isWeekdayToday (index) {
      return _todayComps.day == index
    },
    monthIndex() {
      return this.month - 1;
    },
    isLeapYear() {
      return (this.year % 4 === 0 && this.year % 100 !== 0) || this.year % 400 === 0;
    },
    // Day/month/year components for previous month
    previousMonthComps() {
      if (this.month === 1) return {
        days: _daysInMonths[11],
        month: 12,
        year: this.year - 1,
      }
      return {
        days: (this.month === 3 && this.isLeapYear) ? 29 : _daysInMonths[this.month - 2],
        month: this.month - 1,
        year: this.year,
      };
    },
    // Day/month/year components for next month
    nextMonthComps() {
      if (this.month === 12) return {
        days: _daysInMonths[0],
        month: 1,
        year: this.year + 1,
      };
      return {
        days: (this.month === 2 && this.isLeapYear) ? 29 : _daysInMonths[this.month],
        month: this.month + 1,
        year: this.year,
      };
    },
    // State for calendar header (no dependencies yet...)
    months() {
      return Names[this.locale].monthNames
    },
    // State for weekday header (no dependencies yet...)
    weekdays() {
      let weekdays = Names[this.locale].weekdayNames.slice(this.startWeek, 7 + this.startWeek);
      weekdays.map((weekday, index) => {
        weekday.isToday = (index - 1 == _todayComps.day - this.startWeek)
      })
      return weekdays
    },
    // State for calendar header
    header() {
      const month = this.months[this.monthIndex];
      return {
        month: month,
        year: this.year.toString(),
        shortYear: this.year.toString().substring(2, 4),
        label: month + ', ' + this.year,
      };
    },
    // Returns number for first weekday (1-7), starting from Sunday
    firstWeekdayInMonth() {
      // console.log('firstWeekdayInMonth', new Date(this.year, this.monthIndex, 1).getDay() + 1);
      return new Date(this.year, this.monthIndex, 1).getDay() + 1;
    },
    // Returns number of days in the current month
    daysInMonth() {
      // Check for February in a leap year
      if (this.month === 2 && this.isLeapYear) return 29;
      // ...Just a normal month
      return _daysInMonths[this.monthIndex];
    },
    weeks() {
      const weeks = [];
      let previousMonth = true,
        thisMonth = false,
        nextMonth = false;
      let day = this.previousMonthComps.days - this.firstWeekdayInMonth + 3 - this.startWeek;
      // let day = this.previousMonthComps.days - this.firstWeekdayInMonth + 3;
      let month = this.previousMonthComps.month;
      let year = this.previousMonthComps.year;
      console.log('events', this.events);
      // Cycle through each week of the month, up to 6 total
      for (let w = 1; w <= 6 && !nextMonth; w++) {
        // Cycle through each weekday
        const week = [];
        for (let d = 1 + this.startWeek; d <= 7 + this.startWeek; d++) {

          // We need to know when to start counting actual month days
          if (previousMonth && d >= this.firstWeekdayInMonth) {
            // Reset day/month/year counters
            day = 1;
            month = this.month;
            year = this.year;
            // ...and flag we're tracking actual month days
            previousMonth = false;
            thisMonth = true;
          }
          let currentDay = year + '-' + pad(month) + '-' + pad(day)

          let thisDayEvents = this.events.filter(day => {
            return day.date == currentDay
          });
          // console.log('currentDay', currentDay);
          console.log('currentDay', currentDay, thisDayEvents, day);

          // Append day info for the current week
          // Note: this might or might not be an actual month day
          //  We don't know how the UI wants to display various days,
          //  so we'll supply all the data we can
          week.push({
            label: (day && thisMonth) ? day.toString() : '',
            dateStr: currentDay,
            day,
            weekday: d,
            week: w,
            month,
            year,
            date: new Date(year, month - 1, day),
            beforeMonth: previousMonth,
            afterMonth: nextMonth,
            inMonth: thisMonth,
            isToday: day === _todayComps.day && month === _todayComps.month && year === _todayComps.year,
            isFirstDay: thisMonth && day === 1,
            isLastDay: thisMonth && day === this.daysInMonth,
            events: thisDayEvents
          });

          // We've hit the last day of the month
          if (thisMonth && day >= this.daysInMonth) {
            thisMonth = false;
            nextMonth = true;
            day = 1;
            month = this.nextMonthComps.month;
            year = this.nextMonthComps.year;
            // Still in the middle of the month (hasn't ended yet)
          } else {
            day++;
          }
        }
        // Append week info for the month
        weeks.push(week);
      }
      return weeks;
    },
  },
  methods: {
    moveThisMonth() {
      this.month = _todayComps.month;
      this.year = _todayComps.year;
    },
    moveNextMonth() {
      const {
        month,
        year
      } = this.nextMonthComps;
      this.month = month;
      this.year = year;
    },
    movePreviousMonth() {
      const {
        month,
        year
      } = this.previousMonthComps;
      this.month = month;
      this.year = year;
    },
    moveNextYear() {
      this.year++;
    },
    movePreviousYear() {
      this.year--;
    },
    addEvent(dateStr) {
      console.log('addEvent', this, dateStr);
      this.events.push({date: dateStr, time: '12:00', title: 'Some new event', class: 'green'})
    }
  },
}
</script>

<style lang="sass">
  $fontFamily: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif

  $headerPadding: 0.5rem 1rem
  $headerBorderWidth: 2px
  $headerBorderStyle: solid
  $headerBorderColor: #ffffff
  $headerBackground: #ffffff
  $headerColor: #3f4144

  $weekdayPadding: 0.4rem 0
  $weekdayColor: #879096
  $weekdayBorderWidth: 2px
  $weekdayBorderStyle: solid
  $weekdayBorderColor: #f6f9fc
  $weekdayTodayBackground: #dfe8ee
  $weekdayBackground: #f6f9fc

  $weekBorderColor: #dfe8ee

  $dayColor: #3a3a3a
  $dayBorder: solid 2px white
  $dayBackgroundColor: white
  $dayWidth: 14.2857%
  $dayHeight: 120px

  $todayColor: white
  $todayBackgroundColor: #00b5d5

  $notInMonthOpacity: 0.5
  $notInMonthColor: #868b8e
  $notInMonthBackgroundColor: #f6f9fc

  *
    box-sizing: border-box

  .calendar-layout
    min-width: 400px
    width: 100%

  .calendar
    display: flex
    flex-direction: column

  .header
    display: flex
    justify-content: stretch
    align-items: center
    color: $headerColor
    padding: $headerPadding
    border-right: $headerBorderWidth $headerBorderStyle
    border-color: $headerBorderColor
    background-color: $headerBackground

    =pointer()
      cursor: pointer
      &:hover
        color: #dcdcdc

    .arrow
      +pointer
      padding: 0 0.4em 0.2em 0.4em
      font-size: 1.8rem
      font-weight: 500
      user-select: none
      flex-grow: 0

    .title
      +pointer
      flex-grow: 1
      font-size: 1.2rem
      text-align: center

  .weekdays
    display: flex

  .weekday
    width: $dayWidth
    display: flex
    justify-content: center
    align-items: center
    padding: $weekdayPadding
    color: $weekdayColor
    border-right: $weekdayBorderWidth $weekdayBorderStyle
    border-color: $weekdayBorderColor
    background-color: $weekdayBackground
    cursor: default

  .weekday-today
    border-color: $weekdayTodayBackground
    background-color: $weekdayTodayBackground

  .week
    display: flex
    border-bottom: $weekBorderColor 2px solid

  .day
    width: $dayWidth
    height: $dayHeight
    display: flex
    justify-content: center
    align-items: center
    color: $dayColor
    background-color: $dayBackgroundColor
    border-right: $dayBorder
    cursor: default
    position: relative

  .day__title
    // justify-content: left
    // align-items: top
    position: absolute
    top: 5px
    left: 15px

  .today
    font-weight: 500
    color: $todayColor
    background-color: $todayBackgroundColor
    border-right: $todayBackgroundColor

  .not-in-month
    color: $notInMonthColor
    background-color: $notInMonthBackgroundColor
    opacity: $notInMonthOpacity

  .options
    padding: 20px
    .option
      margin-top: 5px
</style>
