<template>
  <div class="tabs">
    <div class="tabs_list">
      <router-link v-for="(tab, index) in leftTabs"
                   :key="index"
                   :to="tab.route"
                   class="tabs_item"
                   :class="{active: tab.isActive, [activeClass]: tab.isActive,}"
      >{{tab.title | translate | capitalize}}</router-link>
      <router-link v-for="(tab, index) in rightTabs"
                   :key="index+leftTabs.length"
                   :to="tab.route"
                   class="tabs_item"
                   :class="{'tabs_item-right': index===0, ...getTabClasses(tab)}"
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
      activeClass: {
        type: String,
        default: 'tabs_item-active',
      },
    },
    computed: {
      leftTabs() {
        return this.tabs.filter(tab => !(tab.position && tab.position === 'right'));
      },
      rightTabs() {
        return this.tabs.filter(tab => (tab.position && tab.position === 'right'));
      },
    },
    methods: {
      getTabClasses(tab) {
        const classes = {active: tab.isActive, [this.activeClass]: tab.isActive};
        if (tab.icon) {
          classes['tabs_item-icon'] = true;
          classes['tabs_item-icon-'+tab.icon] = true;

        }
        return classes
      }
    }
  }
</script>
