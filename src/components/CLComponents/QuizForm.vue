<template>
  <form class="quiz" ref="form">
    <div class="quiz_progress">Вопрос <span>{{activeSlide + 1}}</span> из {{questions.length}}</div>
    <swiper class="swiper-wrapper" :options="sliderOptions" ref="swiper">
      <swiper-slide class="swiper-slide" v-for="(question, index) in questions" :key="index">
        <quiz-block :id="question.id" :question="question" v-model="question.answer"/>
      </swiper-slide>
    </swiper>
  </form>
</template>

<script>
  import QuizBlock from './QuizBlock'
  export default {
    components: {QuizBlock},
    props: {
      questions: Array,
    },
    data() {
      return {
        sliderOptions: {
          slidesPerView: 1,
          spaceBetween: 24,
          allowTouchMove: false,
        },
        activeSlide: 0,
        isLastSlide: this.questions && this.questions.length === 1,
      };
    },
    computed: {
      swiper() {
        if (this.$refs.swiper) {
          return this.$refs.swiper.swiper;
        }
        return null;
      },
      isValid() {
        return this.questions.filter(this.isQuestionValid).length === this.formData.length;
      },
      formData() {
        return this.questions.map(q => q.answer);
      },
    },
    methods: {
      isQuestionValid(q) {
        return q.answer !== null && q.answer !== undefined
      },
      answerQuestion() {
        if (this.isQuestionValid(this.questions[this.activeSlide])) {
          if (!this.isLastSlide) {
            this.swiper.slideNext();
          } else {
            this.submitQuiz();
          }
        } else {
          this.$notyf.error({
            message: 'Выберите ответ!',
          });
        }
      },
      submitQuiz() {
        if (this.isValid) {
          const correctsCount = this.questions.filter(q => q.answer === q.answers.find(a => a.is_correct).id).length;
          const totalCount = this.questions.length;
          const percentage = correctsCount / totalCount * 100;
          this.$emit('submit', {correctsCount, totalCount, percentage});
        } else {
          this.$notyf.error({
            message: 'Тест не валиден!',
          });
        }
      }
    },
    mounted() {
      if (this.swiper) {
        this.swiper.on('reachEnd', () => {
          this.$emit('onLast');
          this.isLastSlide = true;
        });
        this.swiper.on('slideChange', () => {
          this.activeSlide = this.swiper.clickedIndex + 1;
        });
      } else {
        alert('sorry');
      }
    }
  }
</script>