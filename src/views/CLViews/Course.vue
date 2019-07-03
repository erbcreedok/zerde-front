<template>
  <div class="page wrap">
    <div style="height: 200px" v-loading v-if="status==='loading'"></div>
    <template v-if="course">
      <h1 class="title course_title">{{course.title}}</h1>

      <div class="course_grid">
        <div class="course_main">
          <main class="course_description" v-html="course.body_in">
          </main>

          <section class="course_video" v-if="course.video">
            <iframe :src="course.video" height="350px" width="100%"></iframe>
          </section>

          <section class="course_section courcont">
            <div class="courcont_header">
              <div class="courcont_title">
                <div class="caption">Содержание</div>
              </div>
            </div>

            <div class="courcont_progress">
              <div class="courcont_progress_captions">
                <span class="courcont_progress_caption courcont_progress_caption-success">Вы на 3 занятии</span>
                <span class="courcont_progress_caption">Всего 8 занятий</span>
              </div>

              <div class="courcont_progress_line">
                <a href="#" class="courcont_progress_item courcont_progress_item-done"></a>
                <a href="#" class="courcont_progress_item courcont_progress_item-done"></a>
                <a href="#" class="courcont_progress_item courcont_progress_item-current"></a>
                <span href="#" class="courcont_progress_item"></span>
                <span href="#" class="courcont_progress_item"></span>
                <span href="#" class="courcont_progress_item"></span>
                <span href="#" class="courcont_progress_item"></span>
                <span href="#" class="courcont_progress_item"></span>
              </div>
            </div>

            <a href="#" class="courcont_item courcont_item-done">
              <div class="courcont_item_wrap">
                <div class="courcont_item_icon"></div>
                <div class="courcont_item_title">Вводное занятие</div>
                <div class="courcont_item_duration">5:47</div>
              </div>

              <ul class="courcont_item_timing">
                <li>
                  <span class="courcont_item_timing_title">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, necessitatibus.</span>
                  <span class="courcont_item_timing_time">5:47</span>
                </li>
                <li>
                  <span class="courcont_item_timing_title">Что такое экспозиция</span>
                  <span class="courcont_item_timing_time">5:47</span>
                </li>
              </ul>
            </a>

            <a href="#" class="courcont_item courcont_item-done">
              <div class="courcont_item_wrap">
                <div class="courcont_item_icon"></div>
                <div class="courcont_item_title">Техника и аксессуары</div>
                <div class="courcont_item_duration">5:47</div>
              </div>
            </a>

            <a href="#" class="courcont_item">
              <div class="courcont_item_wrap">
                <div class="courcont_item_icon"></div>
                <div class="courcont_item_title">Композиция</div>
                <div class="courcont_item_duration">5:47</div>
              </div>

              <ul class="courcont_item_timing">
                <li>
                  <span class="courcont_item_timing_title">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Fugiat, necessitatibus.</span>
                  <span class="courcont_item_timing_time">5:47</span>
                </li>
                <li>
                  <span class="courcont_item_timing_title">Что такое экспозиция</span>
                  <span class="courcont_item_timing_time">5:47</span>
                </li>
              </ul>
            </a>

            <a href="#" class="courcont_item">
              <div class="courcont_item_wrap">
                <div class="courcont_item_icon"></div>
                <div class="courcont_item_title">Экспозиция. Свет</div>
                <div class="courcont_item_duration">5:47</div>
              </div>
            </a>

            <a href="#" class="courcont_item courcont_item-quiz">
              <div class="courcont_item_wrap">
                <div class="courcont_item_icon"></div>
                <div class="courcont_item_title">Промежуточное тестирование</div>
              </div>
            </a>

            <a class="courcont_item courcont_item-locked">
              <div class="courcont_item_wrap">
                <div class="courcont_item_icon"></div>
                <div class="courcont_item_title">Съемка людей</div>
                <div class="courcont_item_duration">5:47</div>
              </div>
            </a>
          </section>

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

  export default {
    components: {CourseComments, ActionForAuthorised, CommentForm},
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