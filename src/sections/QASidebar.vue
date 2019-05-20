<template>
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

      <router-link :to="{name: 'qa-create'}" class="button button-small button-primary button-outline button-icon button-icon-left button-icon-dots">Все темы</router-link>
    </section>
    <qa-leaders/>
  </aside>
</template>

<script>
  import QaLeaders from '../components/QAComponents/QALeaders'
  export default {
    name: 'qa-sidebar',
    components: {QaLeaders}
  }
</script>
