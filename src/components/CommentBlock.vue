<template>
    <article class="comment" :class="{'comment-small': isChild}" :data-id="comment.id">
        <div class="comment_body">
            <div class="comment_text" v-html="comment.answerText"></div>

            <div class="comment_details">
                <div class="user comment_author">
                    <div class="user_photo avatar">
                        <img :src="comment.author.avatar_src" alt="">
                    </div>

                    <div class="user_info">
                        <a href="#" class="user_name">{{comment.author.full_name}}</a>
                        <ul class="user_details">
                            <li>{{comment.createdAt | moment('D MMMM')}}</li>

                            <li v-if="isAuthorised"><a @click="startReply" class="comment_reply_link" :data-post-id="comment.postId" :data-parent="comment.id">Комментировать</a></li>
                        </ul>
                    </div>
                </div>

                <ui-rating class="comment_rating" :rate="comment.likes" :rated="comment.liked" @change="putLike"/>
            </div>
        </div>

        <comment-reply v-if="showReply" :comment="comment" :sendReply="replyFunction" @onSend="handleReplySend"/>

        <div class="comment_replies">
            <comment-block v-for="reply in children"
                           :comment="reply"
                           is-child
                           :key="reply.id"
                           :reply-function="replyFunction"
                           :put-like-function="putLikeFunction"
                           @change="handleChange"/>
        </div>

    </article>
</template>

<script>
    import UiRating from "./ui/UIRating";
    import {COMMENTS, SET} from "../_types/store-types";
    import CommentReply from "./CommentReply";
    export default {
      name: 'comment-block',
      components: {CommentReply, UiRating},
      props: {
        comment: {
          type: Object,
          required: true,
        },
        isChild: Boolean,
        replyFunction: Function,
        putLikeFunction: Function,
      },
      data() {
        return {
          newAnswers: []
        }
      },
      computed: {
        children() {
          return [...this.newAnswers, ...this.comment.children];
        },
        isAuthorised() {
          return this.$store.state.auth.authorized;
        },
        showReply() {
          return this.$store.state.comments.activeCommentReply === this.comment.id;
        }
      },
      methods: {
        startReply() {
          if (this.isAuthorised) {
            this.$store.commit(COMMENTS + SET, this.comment.id);
          }
        },
        hideReply() {
            this.$store.commit(COMMENTS + SET);
        },
        handleReplySend(answer) {
          this.newAnswers = [answer, ...this.newAnswers];
          this.hideReply();
        },
        putLike(value) {
          this.putLikeFunction(this.comment.id, value).then(comment => {
            this.$emit('change', comment);
          });
        },
        handleChange(child) {
          const comment = this.comment;
          comment.children = comment.children.map(c => {
            if (c.id !== child.id) return c;
            return child;
          });
          this.$emit('change', comment);
        },
      }
    }
</script>
