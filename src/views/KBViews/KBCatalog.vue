<template>
    <div class="catalog">

        <div class="wrap">
            <kb-tags :tags="themes"/>
        </div>

        <div class="wrap">
            <template v-if="status==='loading'">
                <grid-loader color="#e3e3e3" style="text-align: center; margin: 1rem auto"/>
            </template>
            <div class="blog_section blog_grid blog_grid-static">
                <template v-for="(article, index) in bestArticles">
                    <blog-card :key="index" v-bind="article" :wide="index < 2" inverse/>
                </template>
            </div>
        </div>

        <section class="blog_section blog_section-hl">
            <div class="wrap">
                <h3 class="blog_subtitle blog_subtitle-icon blog_subtitle-icon-best">Лучшее за март-апрель</h3>
                <div class="blog_grid blog_grid-slider">
                    <swiper ref="mySwiper" :options="swiperOptions">
                        <swiper-slide v-for="(article, index) in lastArticles" :key="index">
                            <blog-card  v-bind="article" inverse/>
                        </swiper-slide>
                    </swiper>
                </div>
            </div>
        </section>

        <div class="wrap">
            <section class="blog_section" v-for="themeArticles in themesArticles" :key="themeArticles.theme.id">
                <h3 class="blog_subtitle">{{themeArticles.theme.name}}</h3>
                <div class="blog_grid blog_grid-slider swiper-container-initialized swiper-container-horizontal">
                    <swiper :ref="'swiper-'+themeArticles.theme.id" :options="swiperOptions">
                        <swiper-slide v-for="(article, index) in themeArticles.articles" :key="index">
                            <blog-card  v-bind="article" inverse/>
                        </swiper-slide>
                    </swiper>
                </div>
            </section>
        </div>

        <!--<div class="wrap">-->
            <!--<section class="blog_section">-->
                <!--<h3 class="blog_subtitle blog_subtitle-icon blog_subtitle-icon-questions">Отвечаем на ваши вопросы</h3>-->
                <!--<div class="blog_grid blog_grid-static">-->
                <!--</div>-->
            <!--</section>-->
        <!--</div>-->
    </div>
</template>
<script>
  import KbTags from '../../components/KBComponents/KBTags'
  import kbService from '../../_services/kb.service'
  import BlogCard from '../../components/KBComponents/BlogCard'
  import {blogsAutoPlayOptions} from '../../_helpers/swiperOptions'
  import GridLoader from 'vue-spinner/src/GridLoader'

  export default {
    components: {GridLoader, BlogCard, KbTags},
    data() {
      return {
        themes: [],
        status: 'clean',
        bestArticles: [],
        lastArticles: [],
        swiperOptions: blogsAutoPlayOptions,
        themesArticles: [],
      }
    },
    methods: {
      loadBestArticles() {
        this.status = 'loading';
        kbService.loadArticles(1, 6, {orderBy: 'rating'}).then(({articles}) => {
          this.status = 'success';
          this.bestArticles = articles;
        });
      },
      loadLastArticles() {
        kbService.loadArticles(1, 6, {orderBy: 'created_by'}).then(({articles}) => {
          this.lastArticles = articles;
        });
      },
      loadArticlesByTheme(theme_id) {
        return kbService.loadArticles(1, 6, {themes: [theme_id]}).then(({articles}) => articles);
      },
      loadThemes() {
        this.themesArticles = [];
        return kbService.loadThemes().then(themes => {
          this.themes = themes;
          themes.slice(0,5).forEach(async theme => {
            const articles = await this.loadArticlesByTheme(theme.id);
            this.themesArticles.push({
              theme: theme,
              articles: articles,
            });
          });
        });
      }
    },
    mounted() {
      this.loadBestArticles();
      this.loadLastArticles();
      this.loadThemes();
    }
  }
</script>
