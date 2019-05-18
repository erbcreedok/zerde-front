<template>
    <div class="localization-provider" :class="'locale-' + currentLocale" v-if="currentLocale">
        <slot/>
        <router-view/>
    </div>
</template>

<script>
    import {checkLocale} from "../router/router-guards";
    import i18nService from "../_services/i18n.service";

    export default {
      computed: {
        currentLocale() {
          return this.$route.params.locale;
        }
      },
      watch: {
        $route(to, from) {
          if (to.params.locale !== from.params.locale) {
            this.setLocale(to.params.locale)
          }
        },
      },
      mounted() {
        this.setLocale(this.$route.params.locale);
      },
      methods: {
        setLocale(locale) {
          i18nService.setCurrentLocale(locale)
        }
      },
      beforeRouteUpdate: checkLocale
    }
</script>
