<template>
    <div class="page wrap">
        <main class="login_wrap">
            <!--<section  class="login_section login_section-secondary" v-html="$t('signin by', {links})">-->
            <!--</section>-->

            <form class="login_section login_form form" @submit.prevent="onSubmit" v-loading="status === 'loading'">

                <template v-if="globalErrors.length">
                    <div v-for="(error, i) in globalErrors"
                         class="alert alert-danger form_alert"
                         :key="error.status + ' ' + i">{{error.message.toLowerCase() | translate | capitalize}}</div>
                </template>

                <!--<ui-input class="textfield-block form_field" name="email" :label="capitalize($t('email'))" :placeholder="capitalize($t('enter email'))" v-model="data.email"/>-->

                <ui-input class="textfield-block form_field" required name="phone" :label="capitalize($t('phone'))" :placeholder="capitalize($t('enter phone'))" v-model="data.phone" is-phone/>

                <ui-input class="textfield-block form_field" required name="password" :label="capitalize($t('password'))" :placeholder="capitalize($t('enter password'))"  type="password" v-model="data.password"/>

                <ui-button type="submit" color="primary" class="button-block form_button" :disabled="status === 'loading'">{{'signin' | translate | capitalize }}</ui-button>

                <div class="form_sublinks"><router-link :to="{...$route, name: 'restore-password'}">{{'forgot password' | translate | capitalize }}</router-link></div>
            </form>

            <section class="login_section login_section-secondary">
                <p>{{'don\'t have an account?' | translate | capitalize }}</p>
                <router-link :to="{...$route, name: 'signup'}" class="login_subbuton button button-small button-primary button-outline">{{'create account' | translate | capitalize }}</router-link>
            </section>
        </main>
    </div>
</template>
<script>
  import UiButton from '../../components/ui/UiButton'
  import UiInput from '../../components/ui/UiInputField'
  import authService from '../../_services/auth.service'
  import 'vue-loading-overlay/dist/vue-loading.css'
  import {capitalize} from "../../_filters/capitalize";
  import {dismaskPhone} from '../../_helpers/stringManipulations'

  export default {
    components: {UiInput, UiButton},
    data() {
      return {
        data: {
          email: '',
          phone: '',
          password: '',
        },
        status: 'clear',
        globalErrors: [],
        links: `<a href="#" class="login_socbutton login_socbutton-vk"></a><a href="#" class="login_socbutton login_socbutton-fb"></a>`,
      }
    },
    computed: {
      redirectName() {
        return this.$route.query && this.$route.query.from ? this.$route.query.from : null;
      },
      redirectPath() {
        return this.$route.query && this.$route.query.fromPath ? this.$route.query.fromPath : null;
      },
      redirectTo() {
        if (this.redirectPath) {
          return this.redirectPath;
        } else if (this.redirectName) {
          return {name: this.redirectName}
        } else {
          return '/';
        }
      }
    },
    methods: {
      capitalize,
      onSubmit() {
        this.status = 'loading';
        const phone = dismaskPhone(this.data.phone);
        const password = this.data.password;
        authService.login(phone, password)
          .then(() => {
            this.status = 'success';
            this.globalErrors = [];
            this.$router.push(this.redirectTo);
          })
          .catch(err => {
            this.status = 'error';
            this.globalErrors = err;
          })
      }
    },
  }
</script>
