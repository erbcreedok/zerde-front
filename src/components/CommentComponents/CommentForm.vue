<template>
    <form class="comment_form form" data-action="add_comment" @submit.prevent="handleSubmit">
        <ui-textarea ref="input" :autofocus="autofocus" class="textfield-block" label="Напишите свой комментарий" v-model="replyText" name="text" required rows="2"/>
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
<script>
  import UiTextarea from "../ui/UiTextarea";
  import PulseLoader from "vue-spinner/src/PulseLoader";
  import {USER} from "../../_types/store-types";
  export default {
    components: {PulseLoader, UiTextarea},
    props: {
      sendReply: Function,
      postId: [Number, String],
      autofocus: Boolean,
    },
    data() {
      return {
        replyText: '',
        status: 'clean',
      }
    },
    computed: {
      avatar_src() {
        return this.$store.getters[USER + 'getUserAvatarSrc'];
      },
      isValid() {
        return this.replyText.trim() !== '';
      }
    },
    methods: {
      handleSubmit() {
        this.$emit('submit', this.replyText);
        if (this.sendReply) {
          this.status = 'loading';
          this.sendReply(this.postId, this.replyText).then(comment => {
            this.status = 'success';
            this.replyText = '';
            this.$notyf.success({
              message: 'Комментарий добавлен'
            });
            this.$emit('onSend', comment);
          });
        }
      }
    },
  }
</script>
