<template>
  <div>
    <div class="profile_tabs tabs">
      <div class="tabs_list">
        <router-link v-for="tab in tabs" :key="tab.name" :to="{query: {tab: tab.name}}" class="tabs_item" :class="{'tabs_item-active': tab.name===selectedTab}"> {{tab.label | capitalize}} <span class="tabs_counter" v-if="tab.count!==null">{{tab.count}}</span> </router-link>
      </div>
    </div>
    <template v-if="questionsStatus==='loading'">
      <div style="margin: 3rem 0">
        <grid-loader loading style="margin: auto" color="#6a89f9"/>
      </div>
    </template>
    <template v-else>
      <template v-if="selectedTab === 'q'">
        <template v-if="!questions.length">
          <span class="muted">Пользователь не сохранял вопросы</span>
        </template>
        <question-card v-for="question in questions" :key="question.id" :question="question"/>
      </template>
      <template v-if="selectedTab === 'a'">
        <k-b-bookmarks horizontal no-wrap/>
      </template>
    </template>
  </div>
</template>
<script>
  import qaService from "../../_services/qa.service";
  import GridLoader from "vue-spinner/src/GridLoader";
  import QuestionCard from "../../components/QAComponents/QuestionCard";
  import {requireOwnAuth} from '../../router/router-guards'
  import KBBookmarks from "../KBViews/KBBookmarks";

  export default {
    components: {KBBookmarks, QuestionCard, GridLoader},
    data() {
      return {
        tabs: [
          {name: 'q', label: this.$t('questions'), count: null},
          {name: 'a', label: this.$t('articles'), count: null},
        ],
        questionsStatus: 'clean',
        questions: [],
        questionsTotal: 0,
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
        qaService.getFavoriteQuestions().then(({questions, totalCount}) => {
          this.questionsStatus = 'success';
          this.questions = questions;
          this.questionsTotal = totalCount;
          this.tabs[0].count = totalCount;
        });
      }
    },
    mounted() {
      this.loadQuestions();
    },
    beforeRouteEnter: requireOwnAuth
  }
</script>
