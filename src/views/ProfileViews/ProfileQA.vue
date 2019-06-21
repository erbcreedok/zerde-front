<template>
  <div>
    <div class="profile_tabs tabs">
      <div class="tabs_list">
        <router-link v-for="tab in tabs" :key="tab.name" :to="{query: {tab: tab.name}}" class="tabs_item" :class="{'tabs_item-active': tab.name===selectedTab}"> {{tab.label | capitalize}} <span class="tabs_counter" v-if="tab.count!==null">{{tab.count}}</span> </router-link>
      </div>
    </div>
    <template v-if="questionsStatus==='loading' || answersStatus==='loading'">
      <div style="margin: 3rem 0">
        <grid-loader loading style="margin: auto" color="#6a89f9"/>
      </div>
    </template>
    <template v-else>
      <template v-if="selectedTab === 'q'">
        <question-card v-for="question in questions" :key="question.id" :question="question" :author="user"/>
      </template>
      <template v-if="selectedTab === 'a'">
        <comment-block v-for="answer in answers" :key="answer.id" :comment="answer" :author="user" disable-comment show-link/>
      </template>
    </template>
  </div>
</template>
<script>
  import qaService from '../../_services/qa.service'
  import GridLoader from 'vue-spinner/src/GridLoader'
  import QuestionCard from '../../components/QAComponents/QuestionCard'
  import CommentBlock from '../../components/CommentBlock'

  export default {
    components: {CommentBlock, QuestionCard, GridLoader},
    props: {
      user: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        tabs: [
          {name: 'q', label: this.$t('questions'), count: null},
          {name: 'a', label: this.$t('answers'), count: null},
        ],
        questionsStatus: 'clean',
        answersStatus: 'clean',
        questions: [],
        answers: [],
        questionsTotal: 0,
        answersTotal: 0,
      };
    },
    computed: {
      selectedTab() {
        return this.$route.query.tab ? this.$route.query.tab : this.tabs[0].name
      }
    },
    methods: {
      loadQuestions() {
        this.questionsStatus = 'loading';
        qaService.getQuestionByUserId(this.user.id).then(({questions, totalCount}) => {
          this.questionsStatus = 'success';
          this.questions = questions;
          this.questionsTotal = totalCount;
          this.tabs[0].count = totalCount;
        });
      },
      loadAnswers() {
        this.answersStatus = 'loading';
        qaService.getAnswersByUserId(this.user.id).then(({answers=[], totalCount}) => {
          this.answersStatus = 'success';
          this.answers = answers.map(a => {
            delete a.comments;
            return a;
          });
          this.answersTotal = totalCount;
          this.tabs[1].count = totalCount;
        });
      },
    },
    mounted() {
      this.loadQuestions();
      this.loadAnswers();
    },
  }
</script>