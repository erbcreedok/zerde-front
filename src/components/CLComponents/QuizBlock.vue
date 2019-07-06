<template>
  <div class="quiz_block">
    <div class="quiz_question">{{question}}</div>

    <div class="quiz_answers">
      <label class="quiz_answer" v-for="(answer, index) in answers" :key="index" @click="handleSelect(index)">
        <input type="radio" :name="id" :value="index"/>
        <div class="quiz_answer_wrap">{{answer}}</div>
      </label>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      id: [String, Number],
      question: String,
      answers: Array,
      value: [Number, String],
    },
    methods: {
      handleSelect(id) {
        this.$emit('input', id);
      }
    },
  }
</script>