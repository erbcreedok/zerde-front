<template>
  <router-link :to="{name: type, params: {slug: id}}" class="courcont_item" :class="{'courcont_item-quiz': type==='quiz', 'courcont_item-done': done, 'courcont_item-locked': !user_access || !isAuthorised}">
    <div class="courcont_item_wrap">
      <div class="courcont_item_icon"></div>
      <div class="courcont_item_title">{{title}}</div>
      <div class="courcont_item_duration">{{durationString}}</div>
    </div>
    <ul class="courcont_item_timing" v-if="timing && timing.length">
      <li v-for="time in timing" :key="time.time">
        <span class="courcont_item_timing_title">{{time.title}}</span>
        <span class="courcont_item_timing_time">{{time.timeString}}</span>
      </li>
    </ul>
  </router-link>
</template>

<script>
  import {getTimeString} from "../../_helpers";

  export default {
    name: 'lesson-item',
    props: {
      duration: [Number],
      type: String,
      title: String,
      user_finished: [Boolean, Number],
      user_access: [Boolean, Number],
      scheme: [String, Array],
      id: [Number, String],
    },
    computed: {
      isAuthorised() {
        return this.$store.state.auth.authorized;
      },
      durationString() {
        return this.duration ? getTimeString(this.duration) : '';
      },
      timing() {
        try {
          const obj = JSON.parse(this.scheme);
          return Object.keys(obj).map(title => {
            return {time: obj[title], title, timeString: getTimeString(obj[title])};
          }).sort((a, b) => a.time - b.time);
        } catch {
          return {};
        }
      },
      done() {
        return this.user_finished
      },
    }
  }
</script>
