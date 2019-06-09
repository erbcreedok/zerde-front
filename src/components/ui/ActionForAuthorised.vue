<template>
  <div v-html="capitalize($t('{authoriseButton} to {action}', {authoriseButton, action: $t(action)}))"></div>
</template>
<script>
  import {capitalize} from '../../_filters/capitalize'
  import i18nService from '../../_services/i18n.service'

  export default {
    props: {
      action: String,
    },
    computed: {
      authoriseButton() {
        return `<a href="/${this.locale}/signin" class="button button-small button-outline button-primary">${capitalize(this.$t('authorise'))}</a>`
      },
      locale() {
        return i18nService.getCurrentLocale();
      },
    },
    methods: {
      capitalize,
    }
  }
</script>