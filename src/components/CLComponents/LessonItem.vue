<template>
  <a href="#" class="courcont_item" :class="{'courcont_item-done': done, 'courcont_item-locked': locked}">
    <div class="courcont_item_wrap">
      <div class="courcont_item_icon"></div>
      <div class="courcont_item_title">{{title}}</div>
      <div class="courcont_item_duration">{{durationString}}</div>
    </div>
    <ul class="courcont_item_timing">
      <li v-for="time in timing" :key="time.time">
        <span class="courcont_item_timing_title">{{time.title}}</span>
        <span class="courcont_item_timing_time">{{time.timeString}}</span>
      </li>
    </ul>
  </a>
</template>

<script>
  import moment from 'moment';

  function getTimeString(seconds) {
    return moment(seconds * 1000).format('m:ss');
  }

  export default {
    name: 'lesson-item',
    props: {
      duration: [Number],
      title: String,
      user_finished: Boolean,
      scheme: [String, Array],
    },
    computed: {
      durationString() {
        return getTimeString(this.duration)
      },
      timing() {
        const obj = JSON.parse(this.scheme);
        return Object.keys(obj).map(title => {
          return {time: obj[title], title, timeString: getTimeString(obj[title])};
        }).sort((a, b) => a.time - b.time);
      },
      done() {
        return this.user_finished
      },
      locked() {
        return this.user_finished === null
      }
    }
  }
</script>