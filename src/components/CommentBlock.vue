<template>
    <article class="comment" :class="{'comment-small': isChild}" :data-id="comment.id">
        <div class="comment_body">
            <div class="comment_text" v-html="comment.body"></div>

            <div class="comment_details">
                <div class="user comment_author">
                    <div class="user_photo avatar">
                        <img v-if="comment.user_avatar_src" :src="comment.user_avatar_src" alt="">
                        <img v-if="!comment.user_avatar_src" src="/assets/img/avatar-placeholder.jpg" alt="">
                    </div>

                    <div class="user_info" v-if="author">
                        <a href="#" class="user_name">{{author.firstname}} {{author.lastname}}</a>
                        <ul class="user_details">
                            <li>{{comment.created_at | moment('D MMMM')}}</li>

                            <li><a @click="startReply()" class="comment_reply_link" :data-post-id="comment.question_id" :data-parent="comment.id">Комментировать</a></li>
                        </ul>
                    </div>
                </div>

                <ui-rating :loading="ratingStatus==='loading'" class="comment_rating" :rate="rating" @change="putLike"/>
            </div>
        </div>

        <div class="comment_replies" v-if="children.length">
            <comment-block v-for="reply in children"
                           :comment="reply"
                           is-child
                           :key="reply.id"
                           :reply-function="replyFunction"
                           :put-like-function="putLikeToChildFunction ? putLikeToChildFunction : putLikeFunction"
                           @onReply="handleChildReply"
                           @change="handleChange"/>
        </div>

        <comment-reply ref="reply" v-if="showReply" :username="baseText" :comment="comment" :sendReply="replyFunction" @onSend="handleReplySend"/>
    </article>
</template>

<script>
    import UiRating from "./ui/UIRating";
    import {COMMENTS, SET} from "../_types/store-types";
    import CommentReply from "./CommentReply";
    import {capitalize} from '../_filters/capitalize'
    import userService from '../_services/user.service'
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
        putLikeToChildFunction: Function,
      },
      data() {
        return {
          author: null,
          rating: this.comment.rating,
          ratingStatus: 'clean',
          newAnswers: [],
          username: (this.comment.user_full_name ? this.comment.user_full_name.trim() + ', ' : ''),
          baseText: (this.comment.user_full_name ? this.comment.user_full_name.trim() + ', ' : ''),
        }
      },
      computed: {
        children() {
          const children = [...this.newAnswers];
          if (this.comment.comments) {
            children.unshift(...this.comment.comments)
          }
          return children;
        },
        isAuthorised() {
          return this.$store.state.auth.authorized;
        },
        showReply() {
          return (!this.isChild && this.$store.state.comments.activeCommentReply === this.comment.id);
        },
        isOwnComment() {
          return this.isAuthorised && this.comment.user_id === this.$store.state.user.user.id
        },
      },
      methods: {
        startReply(baseText = this.username) {
          if (this.isAuthorised) {
            if (!this.isChild) {
              this.baseText = baseText;
              this.$store.commit(COMMENTS + SET, this.comment.id);
            } else {
              this.$emit('onReply', baseText)
            }
          } else {
            this.$notyf.error({
              message: capitalize(this.$t('authorise to {action}', {action: this.$t('leave comments')}))
            })
          }
        },
        handleChildReply(baseText) {
          this.startReply(baseText);
        },
        hideReply() {
            this.$store.commit(COMMENTS + SET);
        },
        handleReplySend(answer) {
          this.newAnswers.push(answer);
          this.hideReply();
        },
        putLike(value) {
          if (this.isOwnComment) {
            this.$notyf.error({
              message: capitalize(this.$t('you can\'t rate own material'))
            });
            return;
          }
          this.ratingStatus = 'loading';
          this.putLikeFunction(this.comment.id, value).then(rating => {
            this.rating = rating;
            this.ratingStatus = 'success';
          }).catch(() => {
            this.ratingStatus = 'error';
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
        loadAuthor() {
          userService.getUserById(this.comment.user_id).then(user => {
            console.log(user);
            this.author = user;
          });
        },
      },
      mounted() {
        this.loadAuthor();
      }
    }
</script>
