<template>
    <div class="page wrap">
        <main class="login_wrap">
            <!--<section class="login_section login_section-secondary" v-html="$t('signup by', {links})">-->
            <!--</section>-->

            <form class="login_section login_form form" @submit.prevent="onSubmit" v-loading="status === 'loading'">
                <template v-if="globalErrors.length">
                    <div v-for="error in globalErrors" class="alert alert-danger form_alert" :key="error.status">{{error.message.toLowerCase() | translate | capitalize}}</div>
                </template>

                <ui-input class="textfield-block form_field"
                          required
                          show-required
                          v-for="input in inputs"
                          v-validate="input.validators"
                          v-model="data[input.name]"
                          :is-phone="input.type === 'phone'"
                          :key="'input_' + input.name"
                          :error="status!=='clear' && fields[input.name] && fields[input.name].dirty && fields[input.name].touched ? errors.first(input.name) : ''"
                          :notification="capitalize(input.notification)"
                          :name="input.name"
                          :type="input.type ? input.type : ''"
                          :label="capitalize($t(input.label ? input.label : input.name))"
                          :placeholder="capitalize($t(input.placeholder ? input.placeholder : `enter ${input.name}`))"
                          :mask="input.mask ? input.mask : ''"
                          :ref="input.name"
                          :disabled="modalVisible"
                />

                <ui-button type="submit" color="primary" class="button-block form_button">{{'signup' | translate | capitalize }}</ui-button>
            </form>

            <modal-block v-if="modalVisible" :visible.sync="modalVisible" title="Подтверждение номера телефона" with-header width="400px">
                <PhoneConfirmationForm v-loading="modalStatus==='loading'" :error="modalError" :phone="data.phone" @resendSMS="resendSMS" @submit="confirmSMS"/>
            </modal-block>

            <section class="login_section login_section-secondary">
                <p>{{'already have an account?' | translate | capitalize }}</p>
                <router-link :to="{...$route, name: 'signin'}" class="login_subbuton button button-small button-primary button-outline">{{'signin account' | translate | capitalize }}</router-link>
            </section>
        </main>
    </div>
</template>
<script>
  import UiInput from '../../components/ui/UiInputField'
  import UiButton from '../../components/ui/UiButton'
  import authService from '../../_services/auth.service'
  import Vue from 'vue'
  import VeeValidate from 'vee-validate'
  import {capitalize} from "../../_filters/capitalize";
  import {dismaskPhone} from '../../_helpers/stringManipulations'
  import ModalBlock from '../../components/ModalBlock'
  import PhoneConfirmationForm from '../../components/PhoneConfirmationForm'

  Vue.use(VeeValidate, {
    mode: 'eager'
  });

  export default {
    components: {PhoneConfirmationForm, ModalBlock, UiButton, UiInput},
    data() {
      return {
        modalVisible: false,
        modalStatus: 'clean',
        modalError: null,
        status: 'clear',
        data: {
          phone: '',
          password: '',
          name: '',
          surname: '',
        },
        inputs: [
          {
            val: '',
            name: 'phone',
            validators: 'required|length:16',
            type: 'phone',
          },
          {
            val: '',
            name: 'password',
            validators: 'required|min:8',
            type: 'password',
            notification: this.$t('not less than {count} symbols', {count:8}),
          },
          {
            val: '',
            name: 'c_password',
            label: 'confirm password',
            placeholder: 'confirm password',
            validators: 'required|confirmed:password',
            type: 'password',
            notification: this.$t('not less than {count} symbols', {count:8}),
          },
          {
            val: '',
            name: 'name',
            validators: 'required',
          },
          {
            val: '',
            name: 'surname',
            validators: 'required',
          },
        ],
        token: null,
        globalErrors: [],
        links: `<a href="#" class="login_socbutton login_socbutton-vk"></a><a href="#" class="login_socbutton login_socbutton-fb"></a>`,
      }
    },
    computed: {
      rawPhone() {
        return dismaskPhone(this.data.phone);
      },
      redirectTo() {
        return this.$route.query && this.$route.query.from ? this.$route.query.from : 'home';
      },
    },
    methods: {
      capitalize,
      resendSMS() {
        console.log('resend');
        this.modalVisible = false;
        this.status = 'loading';
        const phone = this.rawPhone;
        this.globalErrors = [];
        authService.resendSMS(phone).then(res => {
          console.log(res);
          this.status = 'success';
          this.modalVisible = true;
        }).catch(err => {
          console.error(err);
          this.globalErrors.push(err);
          this.status = 'error';
          this.modalVisible = false;
        })
      },
      confirmSMS(code) {
        if(this.modalStatus==='loading') return;
        this.modalError = null;
        const phone = this.rawPhone;
        this.modalStatus = 'loading';
        authService.confirmSMS(phone, code).then(res => {
          console.log(res);
          this.$notyf.success({
            message: capitalize(this.$t('user have been registered')),
          });
          authService.login(phone, this.data.password).then(() => {
            this.modalStatus = 'success';
            this.modalVisible = false;
            this.$router.push({name: this.redirectTo});
          });
        }).catch(() => {
          this.modalStatus = 'error';
          this.modalError = capitalize(this.$t('wrong code'));
        })
      },
      onSubmit() {
        this.$validator.validateAll().then(valid => {
          this.status = 'loading';
          this.globalErrors = [];
          if (valid) {
            const data = {
              ...this.data,
              phone: this.rawPhone,
            };
            authService.register(data).then(() => {
              this.status = 'success';
              this.modalVisible = true;
            }).catch(err => {
              this.status = 'error';
              this.globalErrors = err;
            });
          } else {
            this.status = 'error';
            this.globalErrors.push({
              message: 'wrong form filling, please check if all fields are valid',
              status: 1,
            })
          }
        });
      }
    },
  }
</script>
