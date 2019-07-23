<template>
  <div class="page">

    <div class="wrap">
      <tabs :tabs="tabs" class="blog_tabs"/>
    </div>

    <router-view/>

  </div>
</template>
<script>
  import Tabs from '../../components/Tabs'

  export default {
    components: {Tabs},
    data() {
      return {
      }
    },
    computed: {
      tabs() {
        const tabs = [
          {title: 'catalog', route: { name: 'kb-catalog' }},
          {title: 'all in a row', route: { name: 'kb-all' }},
          {title: 'search', position: 'right', icon: 'search', route: { name: 'kb-search' }},
          {title: 'bookmarks', position: 'right', icon: 'bookmark', route: { name: 'kb-bookmarks' }},
        ];
        tabs.forEach(tab => {
          tab.isActive = tab.route.name === this.$route.name;
          return tab;
        });
        return tabs;
      }
    },
  }
</script>
