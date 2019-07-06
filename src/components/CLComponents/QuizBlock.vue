<template>
  <div class="quiz_block">
    <div class="quiz_question" v-html="question[localeName]"></div>

    <div class="quiz_answers">
      <label class="quiz_answer" v-for="(answer, index) in answers" :key="index" @click="handleSelect(answer.id)">
        <input type="radio" :name="id" :value="answer.id"/>
        <div class="quiz_answer_wrap" v-html="answer[localeName]"></div>
      </label>
    </div>
  </div>
</template>

<script>
  import i18nService from '../../_services/i18n.service'

  export default {
    props: {
      id: [String, Number],
      question: Object,
      value: [Number, String],
    },
    data() {
      return {
        answers: this.question.answers,
      }
    },
    methods: {
      handleSelect(value) {
        this.$emit('input', value);
      }
    },
    computed: {
      localeName() {
        return i18nService.getCurrentLocale() + '_name';
      },
    },
  }
</script>