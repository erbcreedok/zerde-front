<template>
  <div class="lesson page wrap">
    <div style="height: 200px" v-loading v-if="status==='loading'"></div>
    <template v-if="lesson">
    <router-link :to="{name: 'course', params: {slug: lesson.course_id}}" class="lesson_backlink">{{lesson.course_title}}</router-link>
    <h1 class="title lesson_title" :class="{'lesson_title-complete': lesson.user_finished}">{{lesson.title}}</h1>

     <p class="lesson_description" v-if="lesson.body_short" v-html="lesson.body_short"></p>

      <template v-if="!lesson.user_access">
        <div class="alert alert-danger lesson_alert">У вас нет доступа к этому занятию.</div>
      </template>

      <template v-else>
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
              <video id="lesson-video" controls ref="video" :poster="lesson.img_src">
                <source :src="lesson.video_src">
              </video>
              <div class="video_pause">
                <span class="video_pause_content">PLAY</span>
              </div>
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
          <template v-if="isAuthorised">
            <button class="button button-primary" @click="finishLesson">Завершить</button>
            <div class="lesson_rating">
              <div class="lesson_rating_caption">Пожалуйста, оцените это занятие:</div>
              <div class="voting">
                <div class="voting_wrap">
                  <button class="voting_button voting_button-dislike" @click="rateLesson(0)" :class="{'voting_button-selected': lesson.user_rate === 0}"></button>
                  <button class="voting_button voting_button-like" @click="rateLesson(5)"  :class="{'voting_button-selected': lesson.user_rate === 5}"></button>
                </div>
              </div>
            </div>
          </template>
          <template v-else>
            <action-for-authorised action="завершить курс" />
          </template>
        </div>
      </div>
      </template>
      </template>
    </div>
  </template>

<script>
  import clService from "../../_services/cl.service";
  import {getTimeString} from "../../_helpers";
  import ActionForAuthorised from '../../components/ui/ActionForAuthorised'
  import {capitalize} from '../../_filters/capitalize'

  export default {
    components: {ActionForAuthorised},
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
          this.startLesson(id);
          this.startCourse(data.course_id);
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
      startCourse(id = this.lesson ? this.lesson.course_id : undefined) {
        if(!id) return;
        if (this.isAuthorised) {
          clService.startCourse(id);
        }
      },
      startLesson(id = this.slug) {
        if (this.isAuthorised) {
          clService.startLesson(id);
        }
      },
      finishLesson(id = this.slug) {
        if (this.isAuthorised) {
          clService.startLesson(id);
        } else {
          this.$notyf.error({
            message: capitalize(this.$t('authorisation required'))
          });
        }
      },
      rateLesson(value, id = this.slug) {
        if (!this.isAuthorised) {
          this.$notyf.error({
            message: capitalize(this.$t('authorisation required'))
          });
        } else {
          clService.rateLesson(id, value).then(() => {
            this.lesson.user_rate = value;
          });
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
