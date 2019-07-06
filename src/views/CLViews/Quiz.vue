<template>
  <div class="lesson page wrap">
    <template v-if="status==='loading'">
      <grid-loader color="#e3e3e3" style="text-align: center; margin: 1rem auto"/>
    </template>
    <template v-if="quiz">
      <router-link :to="{name: 'course', params: {slug: quiz.course_id}}" class="lesson_backlink">{{quiz.course_title}}</router-link>
      <h1 class="title lesson_title">Тест. Урок "{{quiz.lesson_title}}"</h1>

      <template v-if="!quizBegin">
        <div class="lesson_content lesson_content-quiz">
          <div class="lesson_content_wrap">
            <div class="quiz_result" :class="{'quiz_result-danger': isFailed, 'quiz_result-success': isSuccess}">
              <ui-progress :progress="percentage - 0"/>
              <div class="quiz_result_stats">
                <span>{{quizMessage}}</span>
                {{quizResultMessage}}
              </div>
            </div>

            <div class="quiz_description" v-if="!isSuccess">
              Для прохождения тестирования необходимо набрать не менее 70% правильных ответов. Всего вопросов: {{questionCount}}.
            </div>
            <div class="quiz_description" v-else>
              Вы успешно прошли тестирование, теперь вам доступно следующее занятие.
            </div>

          </div>

          <div class="lesson_controls">
            <button v-if="!isSuccess" class="button button-primary" @click="quizBegin = true">Начать</button>
            <button v-else-if="!quiz.next_lesson" class="button button-success button-icon button-icon-left button-icon-checkmark" @click="finishCourse()">Закончить курс</button>
            <router-link v-else :to="{name: 'lesson', params: {slug: quiz.next_lesson - 0}}" class="button button-primary button-icon button-icon-left button-icon-angle-right">Следующий урок</router-link>
          </div>
        </div>
      </template>

      <template v-else>
        <div class="lesson_content lesson_content-quiz" v-if="quiz.questions">
          <div class="lesson_content_wrap">
            <quiz-form ref="form" :questions="quiz.questions" @submit="handleSubmit"/>
          </div>
          <div class="lesson_controls">
            <button class="button button-primary quiz_button" @click="answerQuestion">
              <pulse-loader v-if="submitStatus==='loading'" color="white" size="8px" style="margin-top: 2px; width: 60px"/>
              <template v-else>Ответить</template>
            </button>
          </div>
        </div>
      </template>
    </template>
  </div>
</template>
<script>
  import UiProgress from '../../components/ui/UiProgress'
  import QuizForm from '../../components/CLComponents/QuizForm'
  import clService from '../../_services/cl.service'
  import GridLoader from 'vue-spinner/src/GridLoader'
  import PulseLoader from 'vue-spinner/src/PulseLoader'
  export default {
    components: {PulseLoader, GridLoader, QuizForm, UiProgress},
    props: {
      slug: [Number, String],
    },
    data() {
      return {
        user_passed: false,
        nextButton: undefined,
        status: 'clean',
        submitStatus: 'clean',
        quiz: null,
        quizBegin: false,
        quizResult: null,
        quizSuccess: false,
      }
    },
    computed: {
      questionCount() {
        return this.quiz.questions.length;
      },
      percentage() {
        return this.quizResult / this.questionCount * 100;
      },
      isFailed() {
        return this.quizResult!==null && !this.quizSuccess;
      },
      isSuccess() {
        return this.quizResult!==null && this.quizSuccess;
      },
      quizMessage() {
        if (this.isFailed) {
          return this.$t('Тестирование не пройдено');
        }
        if (this.isSuccess) {
          return this.$t('Тестирование пройдено');
        }
        return this.$t('Нет результатов');
      },
      quizResultMessage() {
        if (this.quizResult === null) {
          return this.$t('Вы еще не проходили тестирование');
        } else {
          return this.$t('{res} из {total} правильных ответов', {res: this.quizResult, total: this.questionCount});
        }
      },
    },
    watch: {
      slug(to) {
        this.loadQuiz(to);
      }
    },
    methods: {
      loadQuiz(id = this.slug) {
        this.status = 'loading';
        this.quiz = null;
        return clService.loadQuizByLessonId(id).then(data => {
          this.status = 'success';
          this.quiz = data;
          this.quizResult = data.previous_result ? data.previous_result.result : null;
          this.quizSuccess = data.previous_result ? !!data.previous_result.success : false;
          return data;
        }).catch(err => {
          this.status = 'error';
          throw err;
        });
      },
      answerQuestion() {
        this.$refs.form.answerQuestion();
      },
      handleSubmit({correctsCount}) {
        this.submitStatus = 'loading';
        clService.submitQuizResult(this.quiz.lesson_id, this.quiz.id, correctsCount).then(is_success => {
          this.quizResult = correctsCount;
          this.quizSuccess = !!is_success;
          this.quizBegin = false;
          this.submitStatus = 'success';
        }).catch(() => {
          this.submitStatus = 'error';
          this.$notyf.error({message: this.$t('server error')});
        });
      },
      finishCourse() {
        this.$router.push({name: 'course', params: {slug: this.quiz.course_id}});
        this.$notyf.success({
          message: 'Курс завершен'
        });
      }
    },
    mounted() {
      this.loadQuiz();
    }
  }
</script>