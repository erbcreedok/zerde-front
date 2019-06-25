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
                        <button class="post_controls_item button button-small button-secondary button-outline button-icon button-icon-left button-icon-bookmark">Сохранить</button>
                    </div>
                </div>

                <main class="post_content post_wrap typeset" v-html="article.body"></main>

                <div class="post_details post_wrap">
                    <div class="post_author">
                        <div class="avatar post_author_photo">
                            <img src="https://thispersondoesnotexist.com/image" alt="">
                        </div>
                        <div class="post_author_name">Minnie Ortiz</div>
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

                <section class="post_comments post_wrap">
                    <div class="post_subtitle caption">17 комментариев</div>

                    <article class="comment" data-id="8">
                        <a href="#" class="comment_post">Название поста</a>

                        <div class="comment_body">
                            <div class="comment_text">Тестовый ответ</div>

                            <div class="comment_details">
                                <div class="user comment_author">
                                    <div class="user_photo avatar">
                                        <img src="http://2.gravatar.com/avatar/5eb37376a348cbb324c93a1c5dee5b1b?s=96&amp;d=mm&amp;r=g" alt="">
                                    </div>

                                    <div class="user_info">
                                        <a href="#" class="user_name">Юрий Апретов</a>
                                        <div class="user_details">
                                            <li>
                                                3 апреля </li>

                                            <li>
                                                <a href="#" class="comment_reply_link" data-post-id="47" data-parent="8">Комментировать</a>
                                            </li>
                                        </div>
                                    </div>
                                </div>

                                <div class="comment_rating rating" data-entry-id="8" data-entry-type="comment"> <button class="rating_control rating_control-decrease rating_control-selected"></button>
                                    <div class="rating_counter">0</div> <button class="rating_control rating_control-increase"></button></div>
                            </div>
                        </div>
                    </article>

                    <button class="post_comments_toggle button button-primary button-outline button-block">Показать комментарии</button>
                </section>

                <div class="post_addcomment post_wrap">
                    <div class="post_subtitle caption">Ваш комментарий</div>

                    <form class="form">
                        <input type="hidden" name="post_id" value="47">
                        <input type="hidden" name="parent" value="8">

                        <div class="textfield textfield-block">
                            <textarea rows="2" class="textfield_input" placeholder=" " name="text" required=""></textarea>
                            <div class="textfield_label">Напишите свой комментарий</div>
                        </div>

                        <div class="comment_form_controls">
                            <div class="comment_form_user avatar">
                                <img src="http://2.gravatar.com/avatar/27ae0d93a82a7ebe577bac396da1560d?s=96&amp;d=mm&amp;r=g" alt="">
                            </div>

                            <div class="comment_form_buttons">
                                <button type="submit" class="button button-small button-primary">Комментировать</button>
                            </div>
                        </div>
                    </form>
                </div>
            </article>

            <section class="post_next wrap">
                <div class="post_next_title caption">Выберите следующий материал</div>

                <div class="blog_grid">
                    <article class="blogcard">
                        <div class="blogcard_cover">
                            <img src="http://placehold.it/500x500" alt="">
                        </div>

                        <div class="blogcard_wrap">
                            <div class="blogcard_type">Статья</div>
                            <div class="blogcard_category">Личная эффективность</div>
                            <a href="#" class="blogcard_title">Lorem ipsum dolor.</a>

                            <ul class="blog_stats blogcard_stats">
                                <li class="blog_stat blog_stat-rating">13</li>
                                <li class="blog_stat blog_stat-comments">1</li>
                                <li class="blog_stat blog_stat-bookmarks">12</li>
                            </ul>
                        </div>
                    </article>

                    <article class="blogcard blogcard-inverse">
                        <div class="blogcard_cover">
                            <img src="http://placehold.it/500x500" alt="">
                        </div>

                        <div class="blogcard_wrap">
                            <div class="blogcard_type">Статья</div>
                            <div class="blogcard_category">Личная эффективность</div>
                            <a href="#" class="blogcard_title">Когда идей нет: предприниматели рассказывают, где искали вдохновение</a>

                            <ul class="blog_stats blogcard_stats">
                                <li class="blog_stat blog_stat-rating">13</li>
                                <li class="blog_stat blog_stat-comments">1</li>
                                <li class="blog_stat blog_stat-bookmarks">12</li>
                            </ul>
                        </div>
                    </article>

                    <article class="blogcard blogcard-inverse">
                        <div class="blogcard_cover">
                            <img src="http://placehold.it/500x500" alt="">
                        </div>

                        <div class="blogcard_wrap">
                            <div class="blogcard_type">Статья</div>
                            <div class="blogcard_category">Личная эффективность</div>
                            <a href="#" class="blogcard_title">Когда идей нет: предприниматели рассказывают, где искали вдохновение</a>

                            <ul class="blog_stats blogcard_stats">
                                <li class="blog_stat blog_stat-rating">13</li>
                                <li class="blog_stat blog_stat-comments">1</li>
                                <li class="blog_stat blog_stat-bookmarks">12</li>
                            </ul>
                        </div>
                    </article>

                    <article class="blogcard">
                        <div class="blogcard_cover">
                            <img src="http://placehold.it/500x500" alt="">
                        </div>

                        <div class="blogcard_wrap">
                            <div class="blogcard_type">Статья</div>
                            <div class="blogcard_category">Личная эффективность</div>
                            <a href="#" class="blogcard_title">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Nostrum a aliquid hic reprehenderit quos harum amet!</a>

                            <ul class="blog_stats blogcard_stats">
                                <li class="blog_stat blog_stat-rating">13</li>
                                <li class="blog_stat blog_stat-comments">1</li>
                                <li class="blog_stat blog_stat-bookmarks">12</li>
                            </ul>
                        </div>
                    </article>
                </div>

                <div class="post_next_button">
                    <a href="#" class="button button-secondary button-outline button-icon button-icon-left button-icon-arrow-left">Вернуться в базу знаний</a>
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

  export default {
    components: {UiRating},
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
        kbService.loadSimilars(slug).then(articles => this.similars = articles);
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
    }
  }
</script>
