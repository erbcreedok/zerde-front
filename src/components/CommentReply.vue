<template>
    <div class="comment_reply_form" v-loading="status==='loading'">
        <template v-if="authorised">
            <form class="comment_form form" data-action="add_comment" @submit.prevent="handleSubmit">
                <input type="hidden" name="post_id" :value="comment.question_id">
                <input type="hidden" name="parent" :value="comment.id">
                <ui-textarea ref="input" autofocus class="textfield-block" label="Напишите свой комментарий" v-model="replyText" name="text" required rows="2"/>
                <div class="comment_form_controls">
                    <div class="comment_form_user avatar">
                        <img src="http://2.gravatar.com/avatar/27ae0d93a82a7ebe577bac396da1560d?s=96&amp;d=mm&amp;r=g" alt="">
                    </div>

                    <div class="comment_form_buttons">
                        <button type="submit" class="button button-small button-primary" :disabled="!isValid">Комментировать</button>
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
    import UiTextarea from "./ui/UiTextarea";
    import ActionForAuthorised from './ui/ActionForAuthorised'
    export default {
      name: 'comment-reply',
      components: {ActionForAuthorised, UiTextarea},
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
        }
      },
      methods: {
        createReply() {
          if(!this.replyText) return;
          let message = this.replyText;
          const authorId = this.comment.user_id;
          const authorName = this.username;
          const placeholder = '${{authorName}}';
          if (message.indexOf(authorName)!== -1) {
            message = message.replace(authorName, placeholder)
          }
          while (message.indexOf(placeholder) !== -1) {
            message = message.replace(placeholder, `<a href="#" class="comment_sendto" data-user-id="${authorId}">${authorName}</a>`)
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
