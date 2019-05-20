<template>
  <div class="page wrap">
    <h1 class="title qa_title">{{'questions and answers' | translate | capitalize}}</h1>

    <section class="qa_header">
      <ui-search-input :value="searchText" @submit="handleSearch"/>
      <qa-controls/>
    </section>

    <div class="qa_grid">

      <main class="qa_main">

        <tabs class="qa_menu"
              :tabs="tabs"
              active-class="tabs_item-active"/>

        <div style="height: 200px" v-loading="true" v-if="status==='loading'"></div>
        <question-card v-for="question in questions"
                       :key="question.id"
                       :question="question"/>

        <list-pagination v-if="totalCount > perPage"
                         :active-page="activePage-0"
                         :limit="perPage"
                         :total="totalCount"
                         :route="$route"/>
      </main>
      <qa-sidebar/>
    </div>
  </div>
</template>
<script>
  import UiSearchInput from '../components/ui/UiSearchInput'
  import QuestionCard from '../components/QAComponents/QuestionCard'
  import qaService from '../_services/qa.service'
  import ListPagination from '../components/ListPagination'
  import Tabs from '../components/Tabs'
  import QaSidebar from '../sections/QASidebar'
  import QaControls from '../components/QAComponents/QAControls'
  export default {
    components: {QaControls, QaSidebar, Tabs, ListPagination, QuestionCard, UiSearchInput},
    data() {
      return {
        questions: [],
        status: 'clean',
        totalCount: 0,
        perPage: 5,
      }
    },
    computed: {
      tabs() {
        return [
          {title: 'my feed',  route: { ...this.$route, query: {...this.$route.query, page: 1, category: 'my'}},          isActive: 'my'===this.activeTab},
          {title: 'all questions', route: { ...this.$route, query: {...this.$route.query, page: 1, category: 'all'}},         isActive: 'all'===this.activeTab},
          {title: 'interesting', route: { ...this.$route, query: {...this.$route.query, page: 1, category: 'interesting'}}, isActive: 'interesting'===this.activeTab},
        ]
      },
      activePage() {
        return this.$route.query && this.$route.query['page'] ? this.$route.query['page']-0 : 1;
      },
      activeTab() {
        return this.$route.query && this.$route.query['category'] ? this.$route.query['category'] : 'my';
      },
      searchText() {
        return this.$route.query && this.$route.query['search'] ? this.$route.query['search'] : '';
      }
    },
    watch: {
      activePage() {
        this.loadQuestions();
      },
      activeTab() {
        this.loadQuestions();
      },
      searchText() {
        this.loadQuestions();
      }
    },
    methods: {
      handleSearch(value) {
        this.$router.push({...this.$route, query: {...this.$route.query, page: 1, category: 'all', search: value}});
      },
      loadQuestions(page=this.activePage, limit=this.perPage, {categories=[this.activeTab], searchText=this.searchText}={}) {
        if (page < 1) {
          this.$router.push({...this.$route, query: {...this.$route.query, page: 1}});
        }
        this.status = 'loading';
        this.questions = [];
        qaService.getQuestions(page, limit, {categories, searchText}).then(({questions, totalCount}) => {
          this.status = 'success';
          this.questions = questions;
          this.totalCount = totalCount;
        });
      }
    },
    mounted() {
      console.log(this.$route.query)
      this.loadQuestions();
    },
  }
</script>