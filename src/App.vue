<template>
  <div id="app">
    <div class="calendar-layout">
      <calendar></calendar>
    </div>
  </div>
</template>

<script>
import Calendar from './components/Calendar'

export default {
  name: 'app',
  components: {
    Calendar
  },
  data () {
    return {
      dateSelection: null,
    }
  },

}
</script>

<style lang="sass">
$themeColor: #ff7a58

$headerPadding: 0.5rem 1rem
$headerBorderWidth: 1px
$headerBorderStyle: solid
$headerBorderColor: #aaaaaa
$headerBackground: $themeColor
$headerColor: white

$weekdayPadding: 0.4rem 0
$weekdayColor: #7a7a7a
$weekdayBorderWidth: 1px
$weekdayBorderStyle: solid
$weekdayBorderColor: #aaaaaa
$weekdayBackground: #eaeaea

$dayColor: #3a3a3a
$dayBorder: solid 1px #aaaaaa
$dayBackgroundColor: white
$dayWidth: 14.2857%
$dayHeight: 50px

$todayColor: white
$todayBackgroundColor: $themeColor

$notInMonthColor: #cacaca
$notInMonthBackgroundColor: #fafafa

$fontFamily: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif

*
  box-sizing: border-box

#app
  display: flex
  font-family: $fontFamily
  padding: 20px

.calendar-layout
  min-width: 400px

.calendar
  display: flex
  flex-direction: column

.header
  display: flex
  justify-content: stretch
  align-items: center
  color: $headerColor
  padding: $headerPadding
  border-width: $headerBorderWidth
  border-style: $headerBorderStyle
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
  border-width: $weekdayBorderWidth
  border-style: $weekdayBorderStyle
  border-color: $weekdayBorderColor
  background-color: $weekdayBackground
  cursor: default

.week
  display: flex

.day
  width: $dayWidth
  height: $dayHeight
  display: flex
  justify-content: center
  align-items: center
  color: $dayColor
  background-color: $dayBackgroundColor
  border: $dayBorder
  cursor: default

.today
  font-weight: 500
  color: $todayColor
  background-color: $todayBackgroundColor

.not-in-month
  color: $notInMonthColor
  background-color: $notInMonthBackgroundColor

.options
  padding: 20px
  .option
    margin-top: 5px
</style>
