<template>
  <div class="page wrap">
    <div style="height: 200px" v-loading v-if="status==='loading'"></div>
    <template v-if="course">
      <h1 class="title course_title">{{course.title}}</h1>

      <div class="course_grid">
        <div class="course_main">
          <main class="course_description typeset" v-html="course.body_in">
          </main>

          <section class="course_video" v-if="course.video">
            <iframe :src="course.video" height="350px" width="100%"></iframe>
          </section>

          <lessons-list :lessons="course.lessons_list"/>

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
                  <div class="dtable_col">8 занятий</div>
                </div>
                <div class="dtable_row">
                  <div class="dtable_col dtable_col-muted">Продолжительность</div>
                  <div class="dtable_col">40:25</div>
                </div>
                <div class="dtable_row">
                  <div class="dtable_col dtable_col-muted">Прошло человек</div>
                  <div class="dtable_col">324</div>
                </div>
                <div class="dtable_row">
                  <div class="dtable_col dtable_col-muted">Оценка</div>
                  <div class="dtable_col">
                    <div class="stars"><div style="width:90%"></div></div>
                  </div>
                </div>
              </div>
            </div>
            <div class="course_sidebar_section">
              <div class="course_sidebar_title">Начали изучение курса</div>
              <div class="course_users">
                <a href="#" class="avatar course_users_item"><img src="https://thispersondoesnotexist.com/image?" alt=""></a>
                <a href="#" class="avatar course_users_item"><img src="https://thispersondoesnotexist.com/image?" alt=""></a>
                <a href="#" class="avatar course_users_item"><img src="https://thispersondoesnotexist.com/image?" alt=""></a>
                <a href="#" class="avatar course_users_item"><img src="https://thispersondoesnotexist.com/image?" alt=""></a>
                <a href="#" class="avatar course_users_item"><img src="https://thispersondoesnotexist.com/image?" alt=""></a>
                <a href="#" class="avatar course_users_item"><img src="https://thispersondoesnotexist.com/image?" alt=""></a>
                <a href="#" class="avatar course_users_item"><img src="https://thispersondoesnotexist.com/image?" alt=""></a>
                <a href="#" class="avatar course_users_item"><img src="https://thispersondoesnotexist.com/image?" alt=""></a>
                <a href="#" class="avatar course_users_item"><img src="https://thispersondoesnotexist.com/image?" alt=""></a>
                <a href="#" class="avatar course_users_item"><img src="https://thispersondoesnotexist.com/image?" alt=""></a>
                <div class="course_users_counter">+ еще 242</div>
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

  export default {
    components: {LessonsList, CourseComments, ActionForAuthorised, CommentForm},
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
    },
    computed: {
      isAuthorised() {
        return this.$store.state.auth.authorized;
      },
    },
    methods: {
      loadCourse(id = this.slug) {
        this.status = 'loading';
        this.course = null;
        return clService.loadCourseById(id).then(data => {
          this.status = 'success';
          this.course = data;
          return data;
        }).catch(err => {
          this.status = 'error';
          throw err;
        });
      },
      addToComments(comment) {
        console.log(comment);
        this.freshComments.push(comment)
      },
    },

  }
</script>
