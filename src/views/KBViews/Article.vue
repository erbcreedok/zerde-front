<template>
    <div class="page page-post">
        <div style="height: 200px" v-loading="true" v-if="status==='loading'"></div>
        <template v-if="article">
            <article class="post">

                <div class="post_header post_wrap">
                    <ul class="post_categories">
                        <li>Статья</li>
                        <li><a href="#" v-for="theme in article.themes" :key="theme.id">{{theme.name}}</a></li>
                    </ul>

                    <h1 class="post_title title">{{article.title}}</h1>
                </div>

                <div class="post_details post_wrap">
                    <div class="post_date">{{article.created_at | moment('D MMMM YYYY')}}</div>

                    <ul class="blog_stats blog_stats-big post_stats">
                        <li class="blog_stat blog_stat-comments">{{article.comments_count}}</li>
                        <li class="blog_stat blog_stat-bookmarks">{{article.fav_count}}</li>
                        <li class="blog_stat blog_stat-views">{{article.views}}</li>
                    </ul>

                    <div class="post_controls">
                        <template v-if="article.user_favorite">
                            <span data-tooltip="Убрать из сохранении" data-tooltip-position="top"><button class="post_controls_item button button-small button-secondary button-icon button-icon-left button-icon-bookmark button-danger" @click="setSubscription(false)">Сохранено</button></span>
                        </template>
                        <template v-else>
                            <button class="post_controls_item button button-small button-secondary button-icon button-icon-left button-icon-bookmark button-outline" @click="setSubscription(true)">Сохранить</button>
                        </template>
                    </div>
                </div>

                <template v-if="article.type === 'text'">
                    <main class="post_content post_wrap typeset" v-html="article.body"></main>
                </template>

                <template v-if="article.type === 'video_out'">
                    <main class="post_content post_wrap typeset">
                        <iframe :src="article.embed" width="100%" height="350px" frameborder="0"></iframe>
                    </main>
                </template>

                <div class="post_details post_details-bottom post_wrap">
                    <div class="post_author" v-if="article.author">
                        <div class="avatar post_author_photo">
                            <img :src="article.author.avatar_src" alt="">
                        </div>
                        <div class="post_author_name">{{article.author.fullname}}</div>
                    </div>

                    <div class="post_controls">
                        <button class="post_controls_item button button-small button-secondary button-outline button-icon button-icon-left button-icon-share" @click="sharePost">Поделиться</button>
                        <template v-if="article.user_favorite">
                            <span data-tooltip="Убрать из сохранении" data-tooltip-position="top"><button class="post_controls_item button button-small button-secondary button-icon button-icon-left button-icon-bookmark button-danger" @click="setSubscription(false)">Сохранено</button></span>
                        </template>
                        <template v-else>
                            <button class="post_controls_item button button-small button-secondary button-icon button-icon-left button-icon-bookmark button-outline" @click="setSubscription(true)">Сохранить</button>
                        </template>
                    </div>

                    <ui-rating class="post_rating" :rate="article.rating" :rated="article.user_rate" :loading="ratingStatus==='loading'"  @change="putLike"/>
                </div>

                <article-comments v-if="(article.comments && article.comments.length) || freshComments.length" :comments="article.comments" :fresh-comments="freshComments" :article_id="article.id"/>

                <div class="post_addcomment post_wrap">
                    <div class="post_subtitle caption">Ваш комментарий</div>
                    <template v-if="isAuthorised">
                        <comment-form :post-id="article.id" :send-reply="replyFunction" @onSend="addToComments"/>
                    </template>
                    <template v-else>
                        <action-for-authorised style="margin-top: 0.4rem;" action="leave comments" ref="input"/>
                    </template>
                </div>
            </article>

            <section class="post_next wrap" v-if="similars && similars.length">
                <div class="post_next_title caption">Выберите следующий материал</div>

                <div class="blog_grid blog_grid-slider">
                    <swiper ref="mySwiper" :options="swiperOptions">
                        <swiper-slide v-for="(similarArticle, index) in similars" :key="index">
                            <blog-card  v-bind="similarArticle"/>
                        </swiper-slide>
                    </swiper>
                </div>

                <div class="post_next_button">
                    <router-link :to="{name: 'kb'}"  class="button button-secondary button-outline button-icon button-icon-left button-icon-arrow-left">Вернуться в базу знаний</router-link>
                </div>
            </section>
        </template>
    </div>
</template>

<script>
  import kbService from "../../_services/kb.service";
  import {capitalize} from "../../_filters/capitalize";
  import copyToClipboard from "../../_helpers/copyToClipboard";
  import UiRating from "../../components/ui/UIRating";
  import ArticleComments from "../../components/KBComponents/ArticleComments";
  import CommentForm from "../../components/CommentComponents/CommentForm";
  import ActionForAuthorised from "../../components/ui/ActionForAuthorised";
  import BlogCard from "../../components/KBComponents/BlogCard";
  import {blogsSwiperOptions} from "../../_helpers/swiperOptions";

  export default {
    components: {BlogCard, ActionForAuthorised, CommentForm, ArticleComments, UiRating},
    props: {
      slug: {
        required: true,
        type: [String, Number],
      }
    },
    data() {
      return {
        status: 'clean',
        ratingStatus: 'clean',
        subscriptionStatus: 'clean',
        article: null,
        similars: [],
        replyFunction: kbService.sendComment,
        freshComments: [],
        swiperOptions: blogsSwiperOptions,
      }
    },
    watch: {
      slug(to) {
        this.loadArticle(to)
      }
    },
    mounted() {
      this.loadArticle();
      this.loadSimilars();
    },
    computed: {
      isAuthorised() {
        return this.$store.state.auth.authorized;
      },
      isOwnArticle() {
        return this.isAuthorised && this.article.user_id === this.$store.state.user.user.id
      },
    },
    methods: {
      loadArticle(slug = this.slug) {
        this.status = 'loading';
        this.article = null;
        return kbService.loadArticleById(slug).then(data => {
          this.status = 'success';
          this.article = data;
          return data;
        }).catch(err => {
          console.log(err);
          this.status = 'error';
          throw err;
        })
      },
      loadSimilars(slug = this.slug) {
        kbService.loadSimilars(slug).then(articles => {
          console.log(articles);
          this.similars = articles;
        });
      },
      putLike(value) {
        if (this.isOwnArticle) {
          this.$notyf.error({
            message: capitalize(this.$t('you can\'t rate own material'))
          });
          return;
        }
        this.ratingStatus = 'loading';
        kbService.rateArticle(this.article.id, value).then(total => {
          this.article.rating = total;
          this.article.user_rate = value;
          this.ratingStatus = 'success';
        }).catch(() => {
          this.ratingStatus = 'error';
        });
      },
      setSubscription(value) {
        if (this.isOwnArticle) {
          this.$notyf.error({
            message: capitalize(this.$t('you can\'t subscribe to own material'))
          });
          return;
        }
        this.subscriptionStatus = 'loading';
        kbService.addArticleToFavorites(this.article.id, value).then(() => {
          this.article = {...this.article, user_favorite: value};
          this.subscriptionStatus = 'success';
        }).catch(() => {
          this.subscriptionStatus = 'error';
        });
      },
      sharePost() {
        const url = window.location.href;
        copyToClipboard(url);
        this.$notyf.success({
          message: capitalize(this.$t('link saved to clipboard')),
        });
      },
      addToComments(comment) {
        console.log(comment);
        this.freshComments.push(comment)
      },
    }
  }
</script>
