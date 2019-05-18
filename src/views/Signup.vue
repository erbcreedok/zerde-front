<template>
    <div class="page wrap">
        <main class="login_wrap">
            <section class="login_section login_section-secondary" v-html="$t('signup by', {links})">
            </section>

            <form class="login_section login_form form" @submit.prevent="onSubmit" v-loading="status === 'loading'">
                <template v-if="globalErrors.length">
                    <div v-for="error in globalErrors" class="alert alert-danger form_alert" :key="error.status">{{error.message | translate | capitalize}}</div>
                </template>

                <ui-input class="textfield-block form_field"
                          v-for="input in inputs"
                          :key="'input_' + input.name"
                          v-validate="input.validators"
                          :error="status!=='clear' && fields[input.name] && fields[input.name].dirty && fields[input.name].touched ? errors.first(input.name) : ''"
                          :notification="capitalize(input.notification)"
                          :name="input.name"
                          :type="input.type ? input.type : ''"
                          v-model="data[input.name]"
                          required
                          :label="capitalize($t(input.name))"
                          :placeholder="capitalize($t(`enter ${input.name}`))"
                          :mask="input.mask ? input.mask : ''"
                />

                <ui-button type="submit" color="primary" class="button-block form_button">{{'signup' | translate | capitalize }}</ui-button>
            </form>

            <section class="login_section login_section-secondary">
                <p>{{'already have an account?' | translate | capitalize }}</p>
                <router-link :to="{name: 'signin'}" class="login_subbuton button button-small button-primary button-outline">{{'signin account' | translate | capitalize }}</router-link>
            </section>
        </main>
    </div>
</template>
<script>
  import UiInput from '../components/ui/UiInput'
  import UiButton from '../components/ui/UiButton'
  import authService from '../_services/auth.service'
  import Vue from 'vue'
  import VeeValidate from 'vee-validate'
  import {capitalize} from "../_filters/capitalize";
  import {dismaskPhone} from '../_helpers/stringManipulations'

  Vue.use(VeeValidate, {
    mode: 'eager'
  });

  export default {
    components: {UiButton, UiInput},
    data() {
      return {
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
            mask: '+7(7##)###-##-##',
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
            name: 'name',
            validators: 'required',
          },
          {
            val: '',
            name: 'surname',
            validators: 'required',
          },
        ],
        globalErrors: [],
        links: `<a href="#" class="login_socbutton login_socbutton-vk"></a><a href="#" class="login_socbutton login_socbutton-fb"></a>`,
      }
    },
    methods: {
      capitalize,
      onSubmit() {
        this.$validator.validateAll().then(valid => {
          this.status = 'loading';
          this.globalErrors = [];
          if (valid) {
            const data = {
              ...this.data,
              phone: dismaskPhone(this.data.phone),
            };
            authService.register(data).then(data => {
              this.status = 'success';
              console.log(data);
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
        })
      }
    }
  }
</script>
