<template>
    <section class="course_section">
        <div class="caption">{{$t('{count} comment ::: {count} comments', {count: comments.length + freshComments.length}, comments.length + freshComments.length) | capitalize }}</div>

        <comment-block v-for="comment in visibleComments" :key="comment.id" :comment="comment" :reply-function="replyFunction" :put-like-function="putLike"/>
        <comment-block v-for="comment in freshComments" :key="comment.id" :comment="comment" :reply-function="replyFunction" :put-like-function="putLike"/>

        <button class="post_comments_toggle button button-primary button-outline button-block" v-if="!showAll && comments.length > 1" @click="showAll = true">Показать комментарии</button>
    </section>
</template>

<script>
  import CommentBlock from '../CommentComponents/CommentBlock'
  import clService from '../../_services/cl.service'

  export default {
    components: {CommentBlock},
    props: {
      course_id: [Number, String],
      maxLevel: [Number, String],
      comments: {
        type: Array,
        default: () => [],
      },
      freshComments: {
        type: Array,
        default: () => [],
      },
    },
    data() {
      return {
        replyFunction: (comment_id, body) => clService.sendComment(this.course_id, body),
        putLike: clService.setLikeToComment,
        showAll: false,
      }
    },
    computed: {
      visibleComments() {
        return !this.showAll ? this.comments.slice(0, 1) : this.comments;
      }
    }
  }
</script>
