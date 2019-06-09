<template>
  <div class="qa_answers" v-loading="status==='loading'">
    <div class="qa_subtitle caption" v-if="answers.length">Ответы</div>
    <div class="qa_subtitle caption" v-if="!answers.length">Пока нет ответов</div>
    <comment-block v-for="(comment) in answers"
                   :key="comment.id"
                   :comment="comment"
                   :reply-function="replyFunction"
                   :put-like-function="putLikeFunction"
                   :put-like-to-child-function="putLikeToChildFunction"
                   @change="handleChange"/>
    <qa-answer-form :question-id="question.id" @onSend="handleAnswerSend"/>
  </div>
</template>

<script>
  import CommentBlock from "../CommentBlock";
  import qaService from "../../_services/qa.service";
  import QaAnswerForm from "./QAAnswerForm";
  export default {
    name: 'qa-answers',
    components: {QaAnswerForm, CommentBlock},
    props: {
      question: {
        type: Object,
        required: true
      },
    },
    data() {
      return {
        answers: [...this.question.answers],
        status: 'clean',
        replyFunction: qaService.sendComment,
        putLikeFunction: qaService.setLikeToAnswer,
        putLikeToChildFunction: qaService.setLikeToComment,
      }
    },
    methods: {
      handleChange(comment) {
        this.answers = this.answers.map(a => {
          if (a.id === comment.id) return comment;
          return a;
        })
      },
      handleAnswerSend(answer) {
        console.log(answer);
        this.answers.push(answer);
      },
    },
  }
</script>
