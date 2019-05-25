<template>
    <div class="page wrap">
        <main class="login_wrap">
            <section class="login_section login_section-secondary" v-html="$t('signin by', {links})">
            </section>

            <form class="login_section login_form form" @submit.prevent="onSubmit" v-loading="status === 'loading'">

                <template v-if="globalErrors.length">
                    <div v-for="(error, i) in globalErrors"
                         class="alert alert-danger form_alert"
                         :key="error.status + ' ' + i">{{error.message | translate | capitalize}}</div>
                </template>

                <!--<ui-input class="textfield-block form_field" name="email" :label="capitalize($t('email'))" :placeholder="capitalize($t('enter email'))" v-model="data.email"/>-->

                <ui-input class="textfield-block form_field" required name="phone" :label="capitalize($t('phone'))" :placeholder="capitalize($t('enter phone'))" v-model="data.phone" @focus="handlePhoneFocus" @blur="handlePhoneBlur" mask="+#(###)###-##-##"/>

                <ui-input class="textfield-block form_field" required name="password" :label="capitalize($t('password'))" :placeholder="capitalize($t('enter password'))"  type="password" v-model="data.password"/>

                <ui-button type="submit" color="primary" class="button-block form_button" :disabled="status === 'loading'">{{'signin' | translate | capitalize }}</ui-button>

                <div class="form_sublinks"><router-link :to="{name: 'forgot-password'}">{{'restore password' | translate | capitalize }}</router-link></div>
            </form>

            <section class="login_section login_section-secondary">
                <p>{{'don\'t have an account?' | translate | capitalize }}</p>
                <router-link :to="{name: 'signup'}" class="login_subbuton button button-small button-primary button-outline">{{'create account' | translate | capitalize }}</router-link>
            </section>
        </main>
    </div>
</template>
<script>
  import UiButton from '../components/ui/UiButton'
  import UiInput from '../components/ui/UiInputField'
  import authService from '../_services/auth.service'
  import 'vue-loading-overlay/dist/vue-loading.css'
  import {capitalize} from "../_filters/capitalize";
  import {dismaskPhone} from '../_helpers/stringManipulations'

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
    methods: {
      capitalize,
      handlePhoneFocus() {
        if(this.data.phone === '') {
          this.data.phone = '+7(7';
        }
      },
      handlePhoneBlur() {
        if(this.data.phone.length < 5) {
          this.data.phone = '';
        }
      },
      onSubmit() {
        this.status = 'loading';
        const phone = dismaskPhone(this.data.phone);
        const password = this.data.password;
        authService.login(phone, password)
          .then(() => {
            this.status = 'success';
            this.globalErrors = [];
            this.$router.push({name: 'home'});
          })
          .catch(err => {
            this.status = 'error';
            this.globalErrors = err;
          })
      }
    }
  }
</script>
