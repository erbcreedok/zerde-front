<template>
  <div>
    <template v-if="requestStatus ==='loading'">
      <div style="margin: 3rem 0">
        <grid-loader loading style="margin: auto" color="#6a89f9"/>
      </div>
    </template>
    <template v-else>
      <template v-if="!comments.length">
        <span class="muted">Пользователь ничего не комментировал</span>
      </template>
      <comment-block v-for="comment in comments" :key="comment.id" :comment="comment" :author="user" disable-comment show-link/>
    </template>
  </div>
</template>
<script>
  import qaService from '../../_services/qa.service'
  import GridLoader from 'vue-spinner/src/GridLoader'
  import CommentBlock from '../../components/CommentComponents/CommentBlock'

  export default {
    components: {CommentBlock, GridLoader},
    props: {
      user: {
        type: Object,
        required: true,
      }
    },
    data() {
      return {
        requestStatus: 'clean',
        comments: [],
        commentsTotal: 0,
      };
    },
    watch: {
      user(to) {
        this.loadComments(to.id);
      },
    },
    methods: {
      loadComments() {
        this.requestStatus = 'loading';
        qaService.getCommentsByUserId(this.user.id).then(({comments=[], totalCount}) => {
          this.requestStatus = 'success';
          this.comments = comments.map(a => {
            delete a.comments;
            return a;
          });
          this.commentsTotal = totalCount;
        });
      },
    },
    mounted() {
      this.loadComments();
    },
  }
</script>
