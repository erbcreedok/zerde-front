<template>
  <div>
    <div class="profile_tabs tabs">
      <div class="tabs_list">
        <router-link v-for="tab in tabs" :key="tab.name" :to="{query: {tab: tab.name}}" class="tabs_item" :class="{'tabs_item-active': tab.name===selectedTab}"> {{tab.label | capitalize}} <span class="tabs_counter" v-if="tab.count!==null">{{tab.count}}</span> </router-link>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {},
    data() {
      return {
        tabs: [
          {name: 'q', label: this.$t('questions'), count: null},
        ],
        questionsStatus: 'clean',
        questions: [],
        questionsTotal: 0,
      };
    },
    computed: {
      selectedTab() {
        return this.$route.query.tab ? this.$route.query.tab : this.tabs[0].name
      }
    },
  }
</script>