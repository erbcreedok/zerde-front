<template>
    <div class="all">
        <div class="wrap">
            <template v-if="status==='loading'">
                <grid-loader color="#e3e3e3" style="text-align: center; margin: 1rem auto"/>
            </template>
            <div class="blog_section blog_grid blog_grid-static">
                <template v-for="(article, index) in articles">
                    <blog-card :key="index" v-bind="article" inverse/>
                </template>
            </div>
            <list-pagination v-if="totalCount > perPage"
                             :active-page="activePage-0"
                             :limit="perPage"
                             :total="totalCount"
                             :route="$route"/>
        </div>
    </div>
</template>

<script>
  import kbService from "../../_services/kb.service";
  import ListPagination from "../../components/ListPagination";
  import BlogCard from "../../components/KBComponents/BlogCard";
  import GridLoader from "vue-spinner/src/GridLoader";

  export default {
    components: {GridLoader, BlogCard, ListPagination},
    data() {
      return {
        articles: [],
        status: 'clean',
        totalCount: 0,
        perPage: 5,
      }
    },
    computed: {
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
    },
  }
</script>
