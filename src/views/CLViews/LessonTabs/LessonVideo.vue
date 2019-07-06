<template>
  <div class="lesson_content_wrap">
    <div class="lesson_video">
      <div class="video lesson_video">
        <video id="lesson-video" controls ref="video" :poster="lesson.img_src">
          <source :src="lesson.video_src">
        </video>
      </div>
    </div>

    <div class="lesson_timecodes" v-if="schemeList.length">
      <div class="lesson_timecodes_title">Содержание видео</div>

      <div class="lesson_timecodes_wrap">
        <div class="lesson_timecodes_item" v-for="(timing, index) in schemeList" :key="index" @click="setVideoTime(timing.time)">
          <div class="lesson_timecodes_item_caption">{{ timing.title }}</div>
          <div class="lesson_timecodes_item_time">{{ timing.timeString }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {getTimeString} from '../../../_helpers'

  export default {
    props: {
      lesson: Object,
    },
    methods: {
      setVideoTime(time) {
        const video = this.$refs.video;
        if (video) {
          video.currentTime = time;
        }
      },
    },
    computed: {
      scheme() {
        try {
          return JSON.parse(this.lesson.scheme);
        }
        catch {
          return {};
        }
      },
      schemeList() {
        return Object.keys(this.scheme).map(title => {
          const time = this.scheme[title];
          return {title, time, timeString: getTimeString(time)}
        }).sort((a, b) => a.time - b.time);
      }
    }
  }
</script>