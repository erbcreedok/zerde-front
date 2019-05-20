<template>
  <div class="tabs">
    <div class="tabs_list">
      <router-link v-for="(tab, index) in tabs"
                   :key="index"
                   :to="tab.route"
                   class="tabs_item"
                   :class="{active: tab.isActive, [activeClass]: tab.isActive}"
      >{{tab.title | translate | capitalize}}</router-link>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      tabs: {
        required: true,
        type: Array,
      },
      activeClass: String,
    }
  }
</script>