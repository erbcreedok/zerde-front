<template>
  <div class="lesson_comments">
    <div class="lesson_comments_wrap">
      <div class="post_subtitle caption" v-if="![...comments, ...freshComments].length">
        <span class="muted">Пікірлер жоқ</span>
      </div>
      <div id="comments" v-else>
        <comment-block v-for="comment in visibleComments" :key="comment.id" :comment="comment" :reply-function="replyFunction" :put-like-function="putLike"/>
        <comment-block v-for="comment in freshComments" :key="comment.id" :comment="comment" :reply-function="replyFunction" :put-like-function="putLike"/>
        <button class="post_comments_toggle button button-primary button-outline button-block" v-if="!showAll && comments.length > 3" @click="showAll = true">Показать комментарии</button>
      </div>
      <div class="lesson_comments_form">
        <template v-if="isAuthorised">
          <comment-form :post-id="lesson.id" :send-reply="replyFunction" @onSend="addToComments"/>
        </template>
        <template v-else>
          <action-for-authorised style="margin-top: 0.4rem;" action="leave comments" ref="input"/>
        </template>
      </div>
    </div>
  </div>
</template>
<script>
  import CommentForm from '../../../components/CommentComponents/CommentForm'
  import ActionForAuthorised from '../../../components/ui/ActionForAuthorised'
  import clService from '../../../_services/cl.service'
  import CommentBlock from '../../../components/CommentComponents/CommentBlock'

  export default {
    components: {CommentBlock, ActionForAuthorised, CommentForm},
    props: {
      lesson: Object,
    },
    data() {
      return {
        freshComments: [],
        replyFunction: (comment_id, body) => clService.sendCommentToLesson(this.lesson.id, body),
        putLike: clService.setLikeToLessonComment,
        showAll: false,
      }
    },
    methods: {
      addToComments(comment) {
        console.log(comment);
        this.freshComments.push(comment)
      },
    },
    computed: {
      isAuthorised() {
        return this.$store.state.auth.authorized;
      },
      comments() {
        return this.lesson && this.lesson.comments_list ? this.lesson.comments_list : [];
      },
      visibleComments() {
        return !this.showAll ? this.comments.slice(0, 3) : this.comments;
      }
    }
  }
</script>