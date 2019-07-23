<template>
    <div class="all">
        <div :class="{wrap: !noWrap}">
            <template v-if="isAuthorised">
                <template v-if="status==='loading'">
                    <grid-loader color="#e3e3e3" style="text-align: center; margin: 1rem auto"/>
                </template>
                <div class="blog_grid blog_grid-static">
                    <template v-for="(article, index) in articles">
                        <blog-card :key="index" v-bind="article" :inverse="inverse && !horizontal" :horizontal="horizontal"/>
                    </template>
                </div>
                <list-pagination v-if="totalCount > perPage"
                                 :active-page="activePage-0"
                                 :limit="perPage"
                                 :total="totalCount"
                                 :route="$route"/>
            </template>
            <template v-else>
                <action-for-authorised action="see bookmarks"/>
            </template>
        </div>
    </div>
</template>

<script>
  import kbService from "../../_services/kb.service";
  import ListPagination from "../../components/ListPagination";
  import BlogCard from "../../components/KBComponents/BlogCard";
  import GridLoader from "vue-spinner/src/GridLoader";
  import ActionForAuthorised from "../../components/ui/ActionForAuthorised";
  import {setDocumentTitle} from '../../_helpers'

  export default {
    components: {ActionForAuthorised, GridLoader, BlogCard, ListPagination},
    props: {
      inverse: Boolean,
      horizontal: Boolean,
      noWrap: Boolean,
    },
    data() {
      return {
        articles: [],
        status: 'clean',
        totalCount: 0,
        perPage: 5,
      }
    },
    computed: {
      isAuthorised() {
        return this.$store.state.auth.authorized;
      },
      activePage() {
        return this.$route.query && this.$route.query['page'] ? this.$route.query['page']-0 : 1;
      },
    },
    methods: {
      loadArticles(page=this.activePage, per_page=this.perPage) {
        this.status = 'loading';
        this.articles = [];
        kbService.loadFavorites(page, per_page).then(({articles}) => {
          console.log(articles);
          this.status = 'success';
          this.articles = articles;
        }).catch(err => {
          this.status = 'error';
          console.log(err);
          this.$notyf.error({
            message: 'Произошла ошибка при загрузке данных',
          });
        });
      },
    },
    watch: {
      activePage() {
        this.loadArticles();
      },
    },
    mounted() {
      this.loadArticles();
      setDocumentTitle('knowledge base bookmark');
    },
    beforeDestroy() {
      setDocumentTitle();
    }
  }
</script>
