<template>
  <div id="app">
    <calendar :start-week="1" :locale="`ru`"></calendar>
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
$fontFamily: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen", "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue", "Helvetica", "Arial", sans-serif

#app
  display: flex
  font-family: $fontFamily
  padding: 20px

</style>
