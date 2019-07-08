<template>
  <div v-html="capitalize($t('{authoriseButton} to {action}', {authoriseButton, action: $t(action)}))"></div>
</template>
<script>
  import {capitalize} from '../../_filters/capitalize'
  import i18nService from '../../_services/i18n.service'

  export default {
    props: {
      action: String,
      buttonClass: {
        type: String,
        default: 'button-outline button-primary',
      },
      redirectTo: String,
    },
    computed: {
      authoriseButton() {
        return `<a href="/${this.locale}/signin?fromPath=${this.fromPath}" class="button button-small ${this.buttonClass}">${capitalize(this.$t('authorise'))}</a>`
      },
      locale() {
        return i18nService.getCurrentLocale();
      },
      fromPath() {
        if (this.redirectTo) {
          return this.redirectTo;
        }
        return this.$route.path;
      },
    },
    methods: {
      capitalize,
    }
  }
</script>