<template>
  <div class="wrapper">
    <p style="margin-bottom: 1rem">На ваш номер {{maskPhone}} был отправлен код подтверждения</p>
    <form ref="form" @submit.prevent="handleSubmit" style="margin: 0 auto 1rem; max-width: 200px; padding: 1rem 0">
      <ui-input label="Введите код" style="font-size: 1.3rem; text-align: center; margin: 0 0 2rem" class="textfield-block form_field" v-model="code" @input="handleInput" type="number" :max-length="length"></ui-input>
      <ui-button color="primary" style="width: 100%" ref="submit" type="submit">Ввести</ui-button>
    </form>
    <label style="font-size: 0.9rem;color: #888;">Не пришло SMS?
      <span v-if="!canResend"><br/> Вы сможете переотправить через {{resendCoolDownLabel}}</span>
      <span v-if="canResend" style="cursor: pointer;" @click="resendSMS">Переотправить</span>
    </label>
  </div>
</template>
<script>
  import UiInput from './ui/UiInputField'
  import UiButton from './ui/UiButton'
  export default {
    props: {
      phone: {
        type: String,
        required: true,
      },
      length: {
        type: [Number, String],
        default: 4,
      },
      coolDownDelay: {
        type: [String, Number],
        default: 1000*60
      }
    },
    components: {UiButton, UiInput},
    data() {
      return {
        code: '',
        startTime: new Date(),
        coolDownEnd: new Date(new Date().getTime() + (this.coolDownDelay-0)),
        resendCoolDownLabel: '00:00',
        interval: null,
        canResend: false,
      }
    },
    computed: {
      maskPhone() {
        return this.phone.substr(0,7)+' - ... - '+this.phone.substr(this.phone.length - 2, 2);
      },
    },
    methods: {
      resendSMS() {
        console.log('resend in Form');
        this.$emit('resendSMS');
      },
      coolDownTime() {
        return new Date(this.coolDownEnd - (new Date()).getTime());
      },
      getCoolDownLabel() {
        return this.$moment(this.coolDownTime()).format('mm:ss');
      },
      handleInput() {
        if(this.code.length === this.length) {
          this.$refs['submit'].$el.click();
        }
      },
      handleSubmit() {
        if (this.length === this.code.length) {
          this.$emit('submit', this.code)
        }
      },
      startInterval() {
        this.canResend = false;
        this.interval = setInterval(() => {
          if (this.coolDownTime().getTime() > 0) {
            this.resendCoolDownLabel = this.getCoolDownLabel();
          } else {
            this.canResend = true;
            this.stopInterval();
          }
        }, 1000);
      },
      stopInterval() {
        clearInterval(this.interval);
      }
    },
    mounted() {
      this.startInterval();
    },
    beforeDestroy() {
      this.stopInterval();
    }

  }
</script>