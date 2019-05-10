<template>
  <div class="page wrap">
    <h1 class="title qa_title">Вопросы и ответы</h1>

    <section class="qa_header">
      <ui-search-input/>

      <div class="qa_controls">
        <ul class="qa_controls_counters">
          <li>1254 вопросов</li>
          <li>3255 ответов</li>
        </ul>

        <a href="add-qa.html" class="qa_controls_button button button-primary">Задать вопрос</a>
      </div>
    </section>

    <div class="qa_grid">
      <main class="qa_main">
        <div class="tabs qa_menu">
          <div class="tabs_list">
            <a href="#" class="tabs_item tabs_item-active">Моя лента</a>
            <a href="#" class="tabs_item">Все вопросы</a>
            <a href="#" class="tabs_item">Интересные</a>
          </div>
        </div>

        <article class="qaCard">
          <div class="qaCard_wrap">
            <div class="qa_tags">
              <a href="#">Старт бизнеса</a>
            </div>

            <a href="/single-qa.html" class="qaCard_title">Как правильно выбрать торговую точку для магазина бижутерии?</a>
          </div>

          <div class="qaCard_footer">
            <div class="qaCard_answers">нет ответов</div>

            <ul class="qaCard_details">
              <li>22 марта</li>
              <li>245 просмотров</li>
              <li>2 подписчика</li>
            </ul>

            <div class="qaCard_author avatar">
              <img src="https://thispersondoesnotexist.com/image" alt="">
            </div>
          </div>
        </article>

        <article class="qaCard">
          <div class="qaCard_wrap">
            <div class="qa_tags">
              <a href="#">Старт бизнеса</a>
            </div>

            <a href="/single-qa.html" class="qaCard_title">Как правильно выбрать торговую точку для магазина бижутерии?</a>
          </div>

          <div class="qaCard_footer">
            <div class="qaCard_answers">нет ответов</div>

            <ul class="qaCard_details">
              <li>22 марта</li>
              <li>245 просмотров</li>
              <li>2 подписчика</li>
            </ul>

            <div class="qaCard_author avatar">
              <img src="https://thispersondoesnotexist.com/image" alt="">
            </div>
          </div>
        </article>

        <nav class="navigation pagination" role="navigation">
          <div class="nav-links">
            <a class="prev page-numbers" href="http://test.rocketstudy.kz/q/page/2">Назад</a>
            <span aria-current="page" class="page-numbers current">1</span>
            <a class="page-numbers" href="http://test.rocketstudy.kz/q/page/2">2</a>
            <span class="page-numbers dots">…</span>
            <a class="page-numbers" href="http://test.rocketstudy.kz/q/page/5">5</a>
            <a class="next page-numbers" href="http://test.rocketstudy.kz/q/page/2">Далее</a>
          </div>
        </nav>
      </main>

      <aside class="qa_sidebar">
        <section class="qa_sidesection">
          <h3 class="qa_sidesection_title caption">Темы вопросов</h3>

          <ul class="qa_threads">
            <li class="qa_threads_item">
              <a href="#" class="qa_threads_link">Открытие бизнеса</a>
              <button class="qa_threads_fav"></button>
            </li>

            <li class="qa_threads_item">
              <a href="#" class="qa_threads_link">Нужен совет</a>
              <button class="qa_threads_fav qa_threads_fav-selected"></button>
            </li>
          </ul>

          <a href="#" class="button button-small button-primary button-outline button-icon button-icon-left button-icon-dots">Все темы</a>
        </section>

        <section class="qa_sidesection">
          <h3 class="qa_sidesection_title caption">Лидеры ответов</h3>

          <ul class="qa_leaders">
            <li class="qa_leaders_item user user-block">
              <div class="user_photo avatar"><img src="https://thispersondoesnotexist.com/image" alt=""></div>

              <div class="user_info">
                <a href="#" class="user_name">Сергей Горностаев</a>
                <ul class="user_details">
                  <li>32 ответа</li>
                  <li>3 комментария</li>
                  <li>542 лайка</li>
                </ul>
              </div>
            </li>
          </ul>
        </section>
      </aside>
    </div>
  </div>
</template>
<script>
  import UiSearchInput from '../components/ui/UiSearchInput'
  export default {
    components: {UiSearchInput},
  }
</script>