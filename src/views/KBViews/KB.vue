<template>
  <div class="page">

    <div class="wrap">
    <tabs :tabs="tabs" class="blog_tabs"/>
    </div>

    <router-view/>

  </div>
</template>
<script>
  import Tabs from "../../components/Tabs";

  export default {
    components: {Tabs},
    data() {
      return {
      }
    },
    computed: {
      tabs() {
        return [
          {title: 'catalog', route: { ...this.$route, query: {...this.$route.query, theme: undefined, page: 1, category: 'catalog'}}},
          {title: 'all in a row', route: { ...this.$route, query: {...this.$route.query, theme: undefined, page: 1, category: 'all'}}},
          {title: 'search', position: 'right', icon: 'search', route: { ...this.$route, query: {...this.$route.query, theme: undefined, page: 1, category: 'search'}}},
          {title: 'bookmarks', position: 'right', icon: 'bookmark', route: { ...this.$route, query: {...this.$route.query, theme: undefined, page: 1, category: 'bookmarks'}}},
        ]
      }
    },
  }
</script>
