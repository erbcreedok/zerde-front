<template>
    <div class="qa_submit" v-loading="status === 'loading'">
        <div class="qa_subtitle caption">Ваш ответ</div>

        <form class="comment_form" @submit.prevent="handleSubmit" v-if="isAuthorised">
            <ui-textarea class="textfield-block" label="Напишите свой ответ" v-model="message" name="text" required rows="4"/>

            <div class="comment_form_controls">
                <div class="comment_form_user avatar">
                    <img src="https://thispersondoesnotexist.com/image" alt="">
                </div>

                <div class="comment_form_buttons">
                    <button type="submit" class="button button-small button-primary" :disabled="!isValid">Ответить</button>
                </div>
            </div>
        </form>
        <template v-if="!isAuthorised">
            <action-for-authorised action="answer questions"/>
        </template>
    </div>
</template>

<script>
  import UiTextarea from '../ui/UiTextarea'
  import qaService from '../../_services/qa.service'
  import {capitalize} from '../../_filters/capitalize'
  import i18nService from '../../_services/i18n.service'
  import ActionForAuthorised from '../ui/ActionForAuthorised'

  export default {
      name: 'qa-answer-form',
      components: {
        ActionForAuthorised,
        UiTextarea,
      },
      props: {
        questionId: {
          type: [Number, String],
          required: true,
        },
      },
      data() {
        return {
          message: '',
          status: 'clean',
        }
      },
      computed: {
        isAuthorised() {
          return this.$store.state.auth.authorized;
        },
        isValid() {
          return this.message.trim() !== ''
        },
        locale() {
          return i18nService.getCurrentLocale();
        },
        authoriseButton() {
          return `<a href="/${this.locale}/signin" class="button button-small button-outline button-primary">${capitalize(this.$t('authorise'))}</a>`
        }
      },
      methods: {
        capitalize,
        handleSubmit() {
          if (!this.isValid) return;
          this.status = 'loading';
          qaService.sendAnswer(this.questionId, this.message).then(answer => {
            this.message = '';
            this.status = 'success';
            this.$emit('onSend', answer);
          });
        }
      },
    }
</script>
