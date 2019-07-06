<template>
  <div class="lesson page wrap">
    <a href="#" class="lesson_backlink">Мобильная фотография для бизнеса</a>
    <h1 class="title lesson_title">Промежуточное тестирование</h1>

    <template v-if="showQuiz">
      <div class="lesson_content lesson_content-quiz">
        <div class="lesson_content_wrap">
          <div class="quiz_result">
            <ui-progress :progress="50" danger/>
            <div class="quiz_result_stats">
              <span>Нет результатов</span>
              Вы еще не проходили тестирование
            </div>
          </div>

          <div class="quiz_description">
            Для прохождения тестирования необходимо набрать не менее 70% правильных ответов. Всего вопросов: 12.
          </div>
        </div>

        <div class="lesson_controls">
          <button class="button button-primary">Начать</button>
        </div>
      </div>
    </template>

    <template v-else>
      <div class="lesson_content lesson_content-quiz">
        <div class="lesson_content_wrap">
          <quiz-form ref="form" @submit="handleSubmit"/>
        </div>
        <div class="lesson_controls">
          <button class="button button-primary quiz_button" @click="answerQuestion">Ответить</button>
        </div>
      </div>
    </template>

  </div>
</template>
<script>
  import UiProgress from '../../components/ui/UiProgress'
  import QuizForm from '../../components/CLComponents/QuizForm'
  export default {
    components: {QuizForm, UiProgress},
    data() {
      return {
        user_passed: false,
        nextButton: undefined,
      }
    },
    computed: {
      showQuiz() {
        return this.user_passed;
      },
    },
    methods: {
      answerQuestion() {
        this.$refs.form.answerQuestion();
      },
      handleSubmit() {
        console.log('parent handle finish');
      },
    },
  }
</script>