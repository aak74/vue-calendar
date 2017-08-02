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
    >
      <span class="event__time" v-if="event.time">{{ event.time }}</span>
      <span class="event__title">{{ event.title }}</span>
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
      console.log('events addEvent', $event, this.date);
      this.$emit('addEvent', this.date)
    },
  },
}
</script>

<style lang="sass">
  $eventsBackgroundColor: inherited

  .events
    height: 100%
    width: 100%
    background-color: $eventsBackgroundColor
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
    background-color: $eventsBackgroundColor
    // vertical-align: bottom
    bottom: 0px
    // left: 0
    // right: 0

  .event
    // background-color: $eventsBackgroundColor
    display: inline-block
    border-top: 2px solid
    border-color: white
    width: 100%
    height: 22px
    overflow: hidden
    // overflow-y: hidden
    margin-bottom: -4px

  .today .event
    border-top: 2px solid
    border-color: #00b5d5
    // border-top: 2px solid #00b5d5

  .event__title
    font-weight: 400
    // width: 60px
    // overflow-y: hidden
    // overflow-x: hidden
    // overflow: hidden
    // position: absolute

  .event__time
    font-weight: 700

  .event.green
    background-color: #9cca57
    color: #242323

  .event.red
    background-color: #ed1848
    color: white
</style>
