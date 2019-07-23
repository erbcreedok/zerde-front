<template>
  <div class="page wrap">
    <main class="login_wrap">

      <form v-if="!data.code" class="login_section login_form form" @submit.prevent="onSend" v-loading="status === 'loading'">

        <template v-if="globalErrors.length">
          <div v-for="(error, i) in globalErrors"
               class="alert alert-danger form_alert"
               :key="error.status + ' ' + i">{{error.message.toLowerCase() | translate | capitalize}}</div>
        </template>

        <ui-input class="textfield-block form_field" required name="phone" :label="capitalize($t('phone'))" :placeholder="capitalize($t('enter phone'))" v-model="data.phone" @focus="handlePhoneFocus" @blur="handlePhoneBlur" mask="+#(###)###-##-##"/>

        <ui-button type="submit" color="primary" class="button-block form_button" :disabled="status === 'loading'">{{'restore password' | translate | capitalize }}</ui-button>

        <div class="form_sublinks"><router-link :to="{...$route, name: 'signin'}">{{'remember password' | translate | capitalize }}</router-link></div>
      </form>

      <form v-if="data.code" class="login_section login_form form" @submit.prevent="onSubmit" v-loading="status === 'loading'">

        <template v-if="globalErrors.length">
          <div v-for="(error, i) in globalErrors"
               class="alert alert-danger form_alert"
               :key="error.status + ' ' + i">{{error.message.toLowerCase() | translate | capitalize}}</div>
        </template>

        <p style="margin-bottom: 20px; font-size: 12px">{{$t('set new password for {phone}', {phone: maskPhone}) | capitalize }}</p>

        <ui-input class="textfield-block form_field" required name="password" :label="capitalize($t('new password'))" :placeholder="capitalize($t('enter new password'))" type="password" v-model="data.password"/>

        <ui-input class="textfield-block form_field" required name="c_password" :label="capitalize($t('confirm password'))" :placeholder="capitalize($t('confirm password'))" type="password" v-model="data.c_password"/>

        <ui-button type="submit" color="primary" class="button-block form_button" :disabled="status === 'loading'">{{'restore password' | translate | capitalize }}</ui-button>

        <div class="form_sublinks"><router-link :to="{...$route, name: 'signin'}">{{'remember password' | translate | capitalize }}</router-link></div>
      </form>



      <section class="login_section login_section-secondary">
        <p>{{'don\'t have an account?' | translate | capitalize }}</p>
        <router-link :to="{...$route, name: 'signup'}" class="login_subbuton button button-small button-primary button-outline">{{'create account' | translate | capitalize }}</router-link>
      </section>

      <modal-block v-if="modalVisible" :visible.sync="modalVisible" title="Подтверждение номера телефона" with-header width="400px">
        <PhoneConfirmationForm v-loading="modalStatus==='loading'"  :phone="data.phone" @resendSMS="onSend" @submit="confirmSMS"/>
      </modal-block>
    </main>
  </div>
</template>
<script>
  import UiButton from '../../components/ui/UiButton'
  import UiInput from '../../components/ui/UiInputField'
  import authService from '../../_services/auth.service'
  import 'vue-loading-overlay/dist/vue-loading.css'
  import {capitalize} from '../../_filters/capitalize'
  import {dismaskPhone} from '../../_helpers/stringManipulations'
  import ModalBlock from '../../components/ModalBlock'
  import PhoneConfirmationForm from '../../components/PhoneConfirmationForm'
  import {setDocumentTitle} from '../../_helpers'

  export default {
    components: {PhoneConfirmationForm, ModalBlock, UiInput, UiButton},
    data() {
      return {
        data: {
          email: '',
          phone: '',
          password: '',
          c_password: '',
          code: '',
        },
        status: 'clear',
        globalErrors: [],
        modalVisible: false,
        modalStatus: 'clean',
        links: `<a href="#" class="login_socbutton login_socbutton-vk"></a><a href="#" class="login_socbutton login_socbutton-fb"></a>`,
      }
    },
    computed: {
      maskPhone() {
        return this.data.phone.substr(0,7)+' - ... - '+this.data.phone.substr(this.data.phone.length - 2, 2);
      },
      redirectTo() {
        return this.$route.query && this.$route.query.from ? this.$route.query.from : 'home';
      },
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
      onSend() {
        this.status = 'loading';
        this.modalVisible = false;
        this.globalErrors = [];
        const phone = dismaskPhone(this.data.phone);
        authService.forgotPassword(phone)
          .then(() => {
            this.status = 'success';
            this.modalVisible = true;
          })
          .catch(err => {
            this.status = 'error';
            this.globalErrors = err;
          });
      },
      confirmSMS(code) {
        const phone = this.rawPhone;
        this.modalStatus = 'loading';
        authService.verifyForgotPassword(phone, code).then(() => {
          this.modalStatus = 'success';
          this.modalVisible = false;
          this.data.code = code;
        }).catch(() => {
          this.modalStatus = 'error';
        });
      },
      onSubmit() {
        this.globalErrors = [];
        if (this.data.password === this.data.c_password) {
          this.status = 'loading';
          const phone = dismaskPhone(this.data.phone);
          authService.resetPassword(phone, this.data.password, this.data.c_password, this.data.code).then(() => {
            this.$notyf.success({
              message: `${capitalize(this.$t('password changed successfully'))}, ${this.$t('sign in again using the new password')}.`,
              duration: 6000,
            });
            this.$router.push({...this.$route, name: 'signin'});
          })
        } else {
          this.status = 'error';
          this.globalErrors = {code: 1, message: 'passwords aren\'t same'};
        }
      }
    },
    mounted() {
      setDocumentTitle('restore password');
    },
    beforeDestroy() {
      setDocumentTitle();
    }
  }
</script>
