<template>
  <div class="qa_answers" v-loading="status==='loading'">
    <div class="qa_subtitle caption">Ответы</div>
    <comment-block v-for="(comment) in answers"
                   :key="comment.id"
                   :comment="comment"
                   :reply-function="replyFunction"
                   :put-like-function="putLikeFunction"
                   @change="handleChange"/>
    <qa-answer-form :question-id="question.id" @onSend="handleAnswerSend" v-if="isAuthorised"/>

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
        answers: [],
        status: 'clean',
        replyFunction: qaService.addAnswerReply,
        putLikeFunction: qaService.setLikeToAnswer,
      }
    },
    computed: {
      isAuthorised() {
        return this.$store.state.auth.authorized;
      }
    },
    methods: {
      loadAnswers(questionId = this.question.id) {
        this.status = 'loading';
        qaService.getQuestionAnswers(questionId).then(data => {
          this.status = 'success';
          this.answers = data.map(a => {a.postId = a.questionId; return a});
        });
      },
      handleChange(comment) {
        this.answers = this.answers.map(a => {
          if (a.id === comment.id) return comment;
          return a;
        })
      },
      handleAnswerSend(answer) {
        console.log({answer});
        this.answers.push(answer);
      },
    },
    watch: {
      newAnswers(to, from) {
        const x = to.filter(t => from.map(f => f.id).indexOf(t.id) === -1);
        console.log(x);
      },
      question(to, from) {
        if (to.id !== from.id) {
          this.loadAnswers(to.id);
        }
      }
    },
    mounted() {
      this.loadAnswers();
    }
  }
</script>
