<template>
    <div class="comment_reply_form" v-loading="status==='loading'">
        <form class="comment_form form" data-action="add_comment" @submit.prevent="handleSubmit">
            <input type="hidden" name="post_id" :value="comment.postId">
            <input type="hidden" name="parent" :value="comment.id">
            <ui-textarea class="textfield-block" label="Напишите свой комментарий" v-model="replyText" name="text" required rows="2"/>
            <div class="comment_form_controls">
                <div class="comment_form_user avatar">
                    <img src="http://2.gravatar.com/avatar/27ae0d93a82a7ebe577bac396da1560d?s=96&amp;d=mm&amp;r=g" alt="">
                </div>

                <div class="comment_form_buttons">
                    <button type="submit" class="button button-small button-primary" :disabled="!isValid">Комментировать</button>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
    import UiTextarea from "./ui/UiTextarea";
    export default {
      name: 'comment-reply',
      components: {UiTextarea},
      props: {
        comment: {
          type: Object,
          required: true
        },
        sendReply: Function,
      },
      data() {
        return {
          status:'clean',
          baseText: this.comment.author.full_name.trim() + ', ',
          replyText: this.comment.author.full_name.trim() + ', ',
        }
      },
      computed: {
        isValid() {
          const text = this.replyText.trim();
          const invalids = [this.baseText, ''];
          return !invalids.find(i => i.trim() === text)
        }
      },
      methods: {
        createReply() {
          if(!this.replyText) return;
          let message = this.replyText;
          const authorId = this.comment.author.id;
          const authorName = this.comment.author.full_name.trim();
          const placeholder = '${{authorName}}';
          while (message.indexOf(authorName)!== -1) {
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
      }
    }
</script>
