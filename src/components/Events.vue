<template>
<div class="events">
  <span class="events__add-button" @click="addEvent">+</span>
  <div class="events-list">
    <div
      class='event'
      v-bind:class="event.class"
      v-for="event in events"
      v-if="events.length > 0"
      :title="event.title"
      :key="event.id"
    >
      <span class="event__time" v-if="event.time">{{ event.time }}</span>
      <span class="event__title">{{ event.title }}</span>
      <span class="event__delete-button" @click="deleteEvent($event, event.id)">x</span>
    </div>
  </div>
</div>
</template>


<script>
export default {
  props: {
    date: {
      type: String
    },
    events : {
      type : Array,
      default : []
    },
  },
  methods: {
    addEvent($event) {
      this.$emit('addEvent', this.date)
    },
    deleteEvent($event, id) {
      this.$emit('deleteEvent', id)
    },
  },
}
</script>

<style lang="sass" scoped>
  $eventHeight: 22px
  $brightColor: white
  $brightBackgroundColor: #ed1848
  $smoothColor: #242323
  $smoothBackgroundColor: #9cca57

  .events
    height: 100%
    width: 100%
    font-size: 14px

  .events__add-button
    display: inline-block
    position: absolute
    top: -12px
    right: 4px
    font-size: 36px
    color: #6caf56
    cursor: pointer

  .today .events__add-button
    color: white

  .events-list
    position: absolute
    width: 100%
    bottom: 0px

  .event
    position: relative
    display: inline-block
    border-top: 2px solid
    border-color: white
    width: 100%
    height: $eventHeight
    overflow: hidden
    margin-bottom: -4px

  .today .event
    border-top: 2px solid
    border-color: #00b5d5

  .event__title
    font-weight: 400

  .event__delete-button
    position: absolute
    top: -4px
    right: -1px
    text-align: center
    vertical-align: middle
    font-size: 18px
    width: $eventHeight
    height: $eventHeight + 2px
    z-index: 100

  .event.smooth .event__delete-button
    background-color: $smoothBackgroundColor

  .event.bright .event__delete-button
    background-color: $brightBackgroundColor

  .event.smooth .event__delete-button:hover
    background-color: $brightBackgroundColor
    color: $brightColor

  .event.bright .event__delete-button:hover
    background-color: $smoothBackgroundColor
    color: $smoothColor

  .event__time
    font-weight: 700

  .event.smooth
    background-color: $smoothBackgroundColor
    color: $smoothColor

  .event.bright
    background-color: $brightBackgroundColor
    color: $brightColor
</style>
