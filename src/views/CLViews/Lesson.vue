<template>
  <div class="lesson page wrap">
    <a href="#" class="lesson_backlink">Мобильная фотография для бизнеса</a>
    <h1 class="title lesson_title lesson_title-complete">Техника и аксессуары</h1>

    <!-- <p class="lesson_description">Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p> -->

    <!-- <div class="alert alert-danger lesson_alert">Алёрт</div> -->

    <div class="lesson_tabs tabs">
      <div class="tabs_list">
        <a href="#" class="tabs_item tabs_item-active">Видео</a>
        <a href="#" class="tabs_item">Текст</a>
        <a href="#" class="tabs_item">Дополнительно</a>
        <a href="#" class="tabs_item">Комментарии</a>
      </div>
    </div>

    <div class="lesson_content">
      <div class="lesson_content_wrap">
        <div class="lesson_video">
          <div class="video lesson_video">
            <video class="lesson_video" controls></video>
          </div>
        </div>

        <div class="lesson_timecodes">
          <div class="lesson_timecodes_title">Содержание видео</div>

          <div class="lesson_timecodes_wrap">
            <div class="lesson_timecodes_item">
              <div class="lesson_timecodes_item_caption">Lorem ipsum dolor sit amet, consectetur adipiscing</div>
              <div class="lesson_timecodes_item_time">00:07</div>
            </div>
          </div>
        </div>
      </div>

      <div class="lesson_controls">
        <button class="button button-primary">Кнопка</button>

        <div class="lesson_rating">
          <div class="lesson_rating_caption">Пожалуйста, оцените это занятие:</div>
          <div class="voting">
            <div class="voting_wrap">
              <button class="voting_button voting_button-dislike"></button>
              <button class="voting_button voting_button-like"></button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      slug: [String, Number],
    },
  }
</script>