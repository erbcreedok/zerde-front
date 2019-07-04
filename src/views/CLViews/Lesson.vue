<link rel="stylesheet" href="../../../../../../Downloads/Telegram Desktop/Основа/assets/css/elements/buttons.less">
<template>
  <div class="lesson page wrap">
    <template v-if="lesson">
    <router-link v-if="lesson.course" :to="{name: 'course', params: {slug: lesson.course.id}}" class="lesson_backlink">{{lesson.course.title}}</router-link>
    <h1 class="title lesson_title">{{lesson.title}}</h1>

    <!-- <p class="lesson_description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> -->

    <!-- <div class="alert alert-danger lesson_alert">Алёрт</div> -->

    <div class="lesson_tabs tabs">
      <div class="tabs_list">
        <router-link :to="{name: 'lesson-video'}" class="tabs_item">Видео</router-link>
        <router-link :to="{name: 'lesson-text'}" class="tabs_item">Текст</router-link>
        <router-link :to="{name: 'lesson-resources'}" class="tabs_item">Дополнительно</router-link>
        <router-link :to="{name: 'lesson-comments'}" class="tabs_item">Комментарии</router-link>
      </div>
    </div>

    <div class="lesson_content">
      <div class="lesson_content_wrap">
        <div class="lesson_video">
          <div class="video lesson_video">
            <video id="lesson-video" controls ref="video">
              <source :src="lesson.video_src">
            </video>
          </div>
        </div>

        <div class="lesson_timecodes" v-if="schemeList.length">
          <div class="lesson_timecodes_title">Содержание видео</div>

          <div class="lesson_timecodes_wrap">
            <div class="lesson_timecodes_item" v-for="(timing, index) in schemeList" :key="index" @click="setVideoTime(timing.time)">
              <div class="lesson_timecodes_item_caption">{{timing.title}}</div>
              <div class="lesson_timecodes_item_time">{{timing.timeString}}</div>
            </div>
          </div>
        </div>
      </div>

      <div class="lesson_controls">
        <button class="button button-primary">Завершить</button>

        <div class="lesson_rating" v-if="isAuthorised">
          <div class="lesson_rating_caption">Пожалуйста, оцените это занятие:</div>
          <div class="voting">
            <div class="voting_wrap">
              <button class="voting_button voting_button-dislike"></button>
              <button class="voting_button voting_button-like"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </template>
  </div>
</template>

<script>
  import clService from "../../_services/cl.service";
  import {getTimeString} from "../../_helpers";

  export default {
    props: {
      slug: [String, Number],
    },
    data() {
      return {
        status: 'clean',
        lesson: null,
      }
    },
    computed: {
      isAuthorised() {
        return this.$store.state.auth.authorized;
      },
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
        });
      }
    },
    methods: {
      loadLesson(id = this.slug) {
        this.status = 'loading';
        this.lesson = null;
        return clService.loadLessonById(id).then(data => {
          this.status = 'success';
          this.lesson = data;
          return data;
        }).catch(err => {
          this.status = 'error';
          throw err;
        });
      },
      setVideoTime(time) {
        const video = this.$refs.video;
        if (video) {
          video.currentTime = time;
        }
      },
    },
    watch: {
      slug(to) {
        this.loadLesson(to)
      }
    },
    mounted() {
      this.loadLesson();
    },
  }
</script>
