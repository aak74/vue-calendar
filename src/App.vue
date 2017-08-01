<template>
  <div id="app">
    <calendar :start-week="1" :locale="`ru`" :events="events"></calendar>
  </div>
</template>

<script>
import Calendar from './components/Calendar'
import Events from './config/events'

export default {
  name: 'app',
  components: {
    Calendar
  },
  data () {
    return {
      events: Events,
    }
  },

}
</script>

<style lang="sass">
$fontFamily: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif

#app
  display: flex
  font-family: $fontFamily
  padding: 20px

</style>
