<template>
  <form class="quiz" ref="form">
    <div class="quiz_progress">Вопрос <span>{{activeSlide + 1}}</span> из {{questions.length}}</div>
    <swiper class="swiper-wrapper" :options="sliderOptions" ref="swiper">
      <swiper-slide class="swiper-slide" v-for="(question, index) in questions" :key="index">
        <quiz-block :id="index" v-bind="question" v-model="question.answer"/>
      </swiper-slide>
    </swiper>
  </form>
</template>

<script>
  import QuizBlock from './QuizBlock'
  export default {
    components: {QuizBlock},
    data() {
      return {
        sliderOptions: {
          slidesPerView: 1,
          spaceBetween: 24,
          allowTouchMove: false,
        },
        activeSlide: 0,
        isLastSlide: false,
        questions: [
          {
            question: 'Фотографы довольно часто обсуждают некое «исо». Что это такое?',
            answers: [
              'Один из параметров метода передачи цветного изображения, определяющий соответствие цветовой гаммы изображения объекта цветовой гамме объекта съёмки.',
              'Технологии работы с изображениями и видео, диапазон яркости которых превышает возможности стандартных технологий.',
              'ISO — это параметр, указывающий на уровень чувствительности к свету матрицы или пленки.',
              'Среди вариантов ответа нет верного.'
            ],
          },
          {
            question: 'Фотографы довольно часто обсуждают некое «исо». Что это такое 2?',
            answers: [
              'Один из параметров метода передачи цветного изображения, определяющий соответствие цветовой гаммы изображения объекта цветовой гамме объекта съёмки.',
              'Технологии работы с изображениями и видео, диапазон яркости которых превышает возможности стандартных технологий.',
              'ISO — это параметр, указывающий на уровень чувствительности к свету матрицы или пленки.',
              'Среди вариантов ответа нет верного.'
            ]
          },
          {
            question: 'Фотографы довольно часто обсуждают некое «исо». Что это такое 3?',
            answers: [
              'Один из параметров метода передачи цветного изображения, определяющий соответствие цветовой гаммы изображения объекта цветовой гамме объекта съёмки.',
              'Технологии работы с изображениями и видео, диапазон яркости которых превышает возможности стандартных технологий.',
              'ISO — это параметр, указывающий на уровень чувствительности к свету матрицы или пленки.',
              'Среди вариантов ответа нет верного.'
            ]
          },
        ]
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
          this.$emit('submit', this.formData);
        } else {
          this.$notyf.error({
            message: 'Тест не валиден!',
          });
        }
      }
    },
    mounted() {
      this.swiper.on('reachEnd', () => {
        this.$emit('onLast');
        this.isLastSlide = true;
      });
      this.swiper.on('slideChange', () => {
        this.activeSlide = this.swiper.clickedIndex + 1;
      })
    }
  }
</script>