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
        <template v-if="!(!authorised && activeTab==='my') && questions.length">
          <question-card v-for="question in questions"
                         :key="question.id"
                         :question="question"/>

          <list-pagination v-if="totalCount > perPage"
                           :active-page="activePage-0"
                           :limit="perPage"
                           :total="totalCount"
                           :route="$route"/>
        </template>
        <template v-if="!authorised && activeTab==='my'">
          <action-for-authorised :action="$t('see personal {list} feed', {list: $t('question ::: questions', {}, 5)})"></action-for-authorised>
        </template>
        <template v-if="!questions.length && status==='success'">
          <h2>Вопросов нет</h2>
        </template>
      </main>
      <qa-sidebar/>
    </div>
  </div>
</template>
<script>
  import Tabs from '../../components/Tabs'
  import qaService from '../../_services/qa.service'
  import QaSidebar from '../../sections/QASidebar'
  import QaControls from '../../components/QAComponents/QAControls'
  import QuestionCard from '../../components/QAComponents/QuestionCard'
  import UiSearchInput from '../../components/ui/UiSearchInput'
  import ListPagination from '../../components/ListPagination'
  import ActionForAuthorised from '../../components/ui/ActionForAuthorised'

  export default {
    components: {ActionForAuthorised, QaControls, QaSidebar, Tabs, ListPagination, QuestionCard, UiSearchInput},
    data() {
      return {
        questions: [],
        status: 'clean',
        totalCount: 0,
        perPage: 5,
        theme: null,
      }
    },
    computed: {
      authorised() {
        return this.$store.state.auth.authorized
      },
      tabs() {
        const tabs = [
          {title: 'all questions', route: { ...this.$route, query: {...this.$route.query, theme: undefined, page: 1, category: 'all'}}},
          {title: 'my feed',  route: { ...this.$route, query: {...this.$route.query, theme: undefined, page: 1, category: 'my'}}},
          {title: 'interesting', route: { ...this.$route, query: {...this.$route.query, theme: undefined, page: 1, category: 'interesting'}}},
        ];
        if (this.theme) {
          tabs.unshift({title: this.theme.name, route: { ...this.$route, query: {theme: this.theme.id, page: 1}}, isActive: true},)
        } else {
          tabs.forEach(tab => {
            tab.isActive = tab.route.query.category===this.activeTab;
            return tab;
          });
        }
        return tabs;
      },
      activePage() {
        return this.$route.query && this.$route.query['page'] ? this.$route.query['page']-0 : 1;
      },
      activeTab() {
        return this.$route.query && this.$route.query['category'] ? this.$route.query['category'] : 'all';
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
      },
      theme() {
        this.loadQuestions();
      }
    },
    methods: {
      handleSearch(value) {
        this.$router.push({...this.$route, query: {...this.$route.query, page: 1, category: 'all', search: value}});
      },
      loadQuestions(page=this.activePage, limit=this.perPage, {themes=this.theme, category=this.activeTab, searchText=this.searchText}={}) {
        if (page < 1) {
          this.$router.push({...this.$route, query: {...this.$route.query, page: 1}});
        }
        if (themes) {
          themes = [themes.id];
        }
        this.status = 'loading';
        this.questions = [];
        qaService.getQuestions(page, limit, {category, themes, searchText}).then(({questions, totalCount}) => {
          this.status = 'success';
          this.questions = questions;
          this.totalCount = totalCount;
        });
      },
      setTheme(theme) {
       this.theme = theme;
      },
    },
    mounted() {
      console.log(this.$route.query);
      this.loadQuestions();
    },
    beforeRouteEnter(to, from, next) {
      if (to.query && to.query.theme) {
        checkTheme(to.query.theme, theme => {
          if (theme) next(vm => vm.setTheme(theme));
          else next({name: 'qa'});
        });
      } else next();
    },
    beforeRouteUpdate(to, from, next) {
      if (to.query && to.query.theme) {
        checkTheme(to.query.theme, theme => {
          if (theme) {
            this.setTheme(theme);
            next();
          }
          else {
            this.setTheme();
            next({name: 'qa'});
          }
        })
      } else {
        this.setTheme();
        next();
      }
    }
  }
  function checkTheme(theme_id, callback=() => {}) {
    const selectedTheme = theme_id.toString();
    qaService.getThemes().then(themes => {
      const theme = themes.find(t => selectedTheme === t.id.toString());
      callback(theme);
    })
  }
</script>
