<template>
    <article :id="blockId" class="comment" :class="{'comment-small': isChild}" :data-id="comment.id">
      <template v-if="showLink">
        <router-link v-if="question" :to="{name: 'qa-single', params: {slug: question.id}}" v-scroll-to="'#answer-block-'+comment.id" class="comment_post">{{question.title}}</router-link>
      </template>
      <div class="comment_body" :class="{'comment-verified': isCorrect}">
        <div class="comment_text" v-html="comment.body"></div>
        <div class="comment_details">
          <div class="user comment_author">
            <div class="user_photo avatar" v-if="author">
              <img :src="author.avatar_src" alt="">
            </div>
            <div class="user_info" id="#info">
              <router-link :to="{name: 'user', params: {userId: author.id}}" class="user_name" v-if="author">{{author.firstname}} {{author.lastname}}</router-link>
              <ul class="user_details">
                <li>{{comment.created_at | moment('D MMMM')}}</li>
                <li v-if="!disableComment"><a @click="startReply()" class="comment_reply_link" :data-post-id="comment.question_id" :data-parent="comment.id">Комментировать</a></li>
                <template v-if="isOwnQuestion && !isChild">
                  <li v-if="!isCorrect"> <a @click="setAsCorrect(true)" class="comment_correct_link" :data-post-id="comment.question_id">Это правильный ответ</a></li>
                  <li v-if="isCorrect"> <a @click="setAsCorrect(false)" class="comment_correct_link" :data-post-id="comment.question_id">Это неправильный ответ</a></li>
                </template>
              </ul>
            </div>
          </div>
          <ui-rating :loading="ratingStatus==='loading'" class="comment_rating" :rate="rating" :rated="rated" @change="putLike"/>
        </div>
      </div>

        <div class="comment_replies" v-if="children.length">
            <comment-block v-for="reply in children"
                           :comment="reply"
                           is-child
                           :max-level="maxLevel - 1"
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
  import UiRating from '../ui/UIRating'
  import {COMMENTS, SET} from '../../_types/store-types'
  import CommentReply from './CommentReply'
  import {capitalize} from '../../_filters/capitalize'
  import userService from '../../_services/user.service'
  import qaService from '../../_services/qa.service'

  export default {
      name: 'comment-block',
      components: {CommentReply, UiRating},
      props: {
        comment: {
          type: Object,
          required: true,
        },
        maxLevel: [Number, String],
        disableComment: Boolean,
        isOwnQuestion: Boolean,
        isChild: Boolean,
        replyFunction: {
          type: Function,
          default: () => new Promise(() => {})
        },
        putLikeFunction: {
          type: Function,
          default: () => new Promise(() => {})
        },
        putLikeToChildFunction: {
          type: Function,
          default: () => new Promise(() => {})
        },
        showLink: Boolean,
      },
      data() {
        return {
          question: null,
          author: null,
          rating: this.comment.rating,
          rated: this.comment.user_rate,
          ratingStatus: 'clean',
          isCorrect: (this.comment.is_correct - 0 === 1),
          correctStatus: 'clean',
          newAnswers: [],
          username: (this.comment.author ? this.comment.author.fullname.trim() + ', ' : ''),
          baseText: (this.comment.author ? this.comment.author.fullname.trim() + ', ' : ''),
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
        blockId() {
          if (this.isChild) {
            return 'comment-block-' + this.comment.answer_id + '-' + this.comment.id;
          }
          return 'answer-block-' + this.comment.id;
        }
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
            this.rated = value;
            this.ratingStatus = 'success';
          }).catch(() => {
            this.ratingStatus = 'error';
          });
        },
        setAsCorrect(value) {
          this.correctStatus = 'loading';
          qaService.setCorrectAnswer(this.comment.question_id, this.comment.id, value).then(val => {
            this.isCorrect = val-0 === 1;
            this.correctStatus = 'success';
          }).catch(() => {
            this.correctStatus = 'error';
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
            this.author = user;
            this.username = user.fullname ? user.fullname.trim() : '';
            this.baseText = user.fullname ? user.fullname.trim() : '';
          });
        },
        loadQuestion(question_id = this.comment.question_id) {
          qaService.getQuestion(question_id).then(question => {
            this.question = question;
          });
        }
      },
      mounted() {
        this.loadAuthor();
        if (this.showLink && this.comment.question_id) {
          this.loadQuestion();
        }
      }
    }
</script>
