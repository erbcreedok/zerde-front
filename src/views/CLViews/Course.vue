<template>
  <div class="page wrap">
    <template v-if="status==='loading'">
      <grid-loader color="#e3e3e3" style="text-align: center; margin: 1rem auto"/>
    </template>
    <template v-if="course">
      <h1 class="title course_title">{{course.title}}</h1>

      <div class="course_grid">
        <div class="course_main">
          <main class="course_description typeset" v-html="course.body_in">
          </main>

          <section class="course_video" v-if="course.video">
            <iframe :src="course.video" height="350px" width="100%"></iframe>
          </section>

          <lessons-list :lessons="course.lessons"/>

          <course-comments v-if="(course.comments_list && course.comments_list.length) || freshComments.length" :comments="course.comments_list" :fresh-comments="freshComments" :course_id="course.id" />

          <div class="course_section">
            <div class="post_subtitle caption">Ваш комментарий</div>
            <template v-if="isAuthorised">
              <comment-form :post-id="course.id" :send-reply="replyFunction" @onSend="addToComments"/>
            </template>
            <template v-else>
              <action-for-authorised style="margin-top: 0.4rem;" action="leave comments" ref="input"/>
            </template>
          </div>
        </div>


        <aside class="course_sidebar">
          <div class="course_sidebar_wrap">
            <div class="course_sidebar_section">
              <div class="course_sidebar_title">Авторы курса</div>

              <div class="course_author" v-for="author in course.authors" :key="author.id">
                <div class="course_author_photo avatar"><img :src="author.avatar_src" alt=""></div>
                <div class="course_author_name">{{author.fullname}}</div>
                <div class="course_author_description">{{author.about}}</div>
              </div>
            </div>

            <div class="course_sidebar_section">
              <div class="course_sidebar_title">Параметры</div>

              <div class="dtable dtable-justify">
                <div class="dtable_row">
                  <div class="dtable_col dtable_col-muted">Объём курса</div>
                  <div class="dtable_col">{{$t('{v} занятие ::: {v} занатия ::: {v} занятии', {v: course.lessons_amount}, course.lessons_amount)}}</div>
                </div>
                <div class="dtable_row">
                  <div class="dtable_col dtable_col-muted">Продолжительность</div>
                  <div class="dtable_col">{{durationString}}</div>
                </div>
                <div class="dtable_row">
                  <div class="dtable_col dtable_col-muted">Прошло человек</div>
                  <div class="dtable_col">{{course.users_finished_amount}}</div>
                </div>
                <div class="dtable_row">
                  <div class="dtable_col dtable_col-muted">Оценка</div>
                  <div class="dtable_col">
                    <div class="stars"><div :style="{width: ratingPercent + '%'}"></div></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="course_sidebar_section" v-if="course.users_started_ids.length">
              <div class="course_sidebar_title">Начали изучение курса</div>
              <div class="course_users">
                <user-avatar v-for="userId in course.users_started_ids.slice(0, 10)" :key="userId" :user-id="userId"/>
                <div class="course_users_counter" v-if="course.users_started_ids.length > 10">+ еще {{course.users_started_ids.length - 10}}}</div>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </template>
  </div>
</template>
<script>
  import clService from '../../_services/cl.service'
  import CommentForm from '../../components/CommentComponents/CommentForm'
  import ActionForAuthorised from '../../components/ui/ActionForAuthorised'
  import CourseComments from '../../components/CLComponents/CourseComments'
  import LessonsList from '../../components/CLComponents/LessonsList'
  import {getTimeString, setDocumentTitle} from '../../_helpers'
  import UserAvatar from '../../components/ui/UserAvatar'
  import GridLoader from 'vue-spinner/src/GridLoader'

  export default {
    components: {GridLoader, UserAvatar, LessonsList, CourseComments, ActionForAuthorised, CommentForm},
    props: {
      slug: [String, Number],
    },
    data() {
      return {
        status: 'clean',
        course: null,
        replyFunction: clService.sendComment,
        freshComments: [],
      }
    },
    watch: {
      slug(to) {
        this.loadCourse(to)
      }
    },
    mounted() {
      this.loadCourse();
      setDocumentTitle('course')
    },
    beforeDestroy() {
      setDocumentTitle();
    },
    computed: {
      isAuthorised() {
        return this.$store.state.auth.authorized;
      },
      durationString() {
        if (!this.course || !this.course.lesson_duration) return '00:00';
        return getTimeString(this.course.lesson_duration);

      },
      ratingPercent() {
        if (!this.course || !this.course.lessons_rating) return 0;
        return this.course.lessons_rating/5 * 100
      }
    },
    methods: {
      loadCourse(id = this.slug) {
        this.status = 'loading';
        this.course = null;
        return clService.loadCourseById(id).then(data => {
          this.status = 'success';
          this.course = data;
          setDocumentTitle(data.title, false)
          return data;
        }).catch(err => {
          this.status = 'error';
          throw err;
        });
      },
      addToComments(comment) {
        this.freshComments.push(comment)
      },
    },

  }
</script>
