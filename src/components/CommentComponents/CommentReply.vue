<template>
    <div class="comment_reply_form">
        <template v-if="authorised">
            <form class="comment_form form" data-action="add_comment" @submit.prevent="handleSubmit">
                <input type="hidden" name="post_id" :value="comment.question_id">
                <input type="hidden" name="parent" :value="comment.id">
                <ui-textarea ref="input" autofocus class="textfield-block" label="Напишите свой комментарий" v-model="replyText" name="text" required rows="2"/>
                <div class="comment_form_controls">
                    <div class="comment_form_user avatar">
                        <img :src="avatar_src" alt="">
                    </div>

                    <div class="comment_form_buttons">
                        <button type="submit" class="button button-small button-primary" :disabled="!isValid">
                            <pulse-loader v-if="status==='loading'" color="white" size="10px" style="margin-top: 2px; width: 130px"/>
                            <span v-else>Комментировать</span>
                        </button>
                    </div>
                </div>
            </form>
        </template>
        <template v-if="!authorised">
            <action-for-authorised style="margin-top: 0.4rem;" action="leave comments" ref="input"/>
        </template>
    </div>
</template>

<script>
    import UiTextarea from "../ui/UiTextarea";
    import ActionForAuthorised from '../ui/ActionForAuthorised'
    import {USER} from '../../_types/store-types'
    import i18nService from '../../_services/i18n.service'
    import PulseLoader from "vue-spinner/src/PulseLoader";
    export default {
      name: 'comment-reply',
      components: {PulseLoader, ActionForAuthorised, UiTextarea},
      props: {
        comment: {
          type: Object,
          required: true
        },
        username: {
          type: String,
          default: '',
        },
        sendReply: Function,
      },
      data() {
        return {
          status:'clean',
          baseText: this.username.length ? this.username.trim() + ', ' : '',
          replyText: this.username.length ? this.username.trim() + ', ' : '',
        }
      },
      computed: {
        isValid() {
          const text = this.replyText.trim();
          const invalids = [this.baseText, ''];
          return invalids.find(i => i.trim() === text) === undefined;
        },
        authorised() {
          return this.$store.state.auth.authorized;
        },
        avatar_src() {
          return this.$store.getters[USER + 'getUserAvatarSrc'];
        },
      },
      methods: {
        createReply() {
          if(!this.replyText) return;
          let message = this.replyText;
          const authorId = this.comment.user_id;
          const authorName = this.username;
          const placeholder = '${{authorName}}';
          const locale = i18nService.getCurrentLocale();
          if (message.indexOf(authorName)!== -1) {
            message = message.replace(authorName, placeholder)
          }
          while (message.indexOf(placeholder) !== -1) {
            message = message.replace(placeholder, `<a href="/${locale}/user/${authorId}" class="comment_sendto" data-user-id="${authorId}">${authorName}</a>`)
          }
          return {message, replyTo: this.comment.id};
        },
        handleSubmit() {
          const reply = this.createReply();
          this.$emit('submit', reply);
          if (this.sendReply) {
            this.status = 'loading';
            this.sendReply(reply.replyTo, reply.message).then(answer => {
              this.status = 'success';
              this.$emit('onSend', answer);
            });
          }
        },
      },
      watch: {
        username(to) {
          this.baseText = to.length ? to.trim() + ', ' : '';
          this.replyText = to.length ? to.trim() + ', ' : '';
          this.$refs.input.focus();
        }
      },
      mounted() {
        console.log(this.$refs);
        // this.$refs.input.focus();
      }
    }
</script>
