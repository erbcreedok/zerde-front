<template>
    <article class="blogcard" :class="{'blogcard-wide': size==='wide',  'blogcard-inverse': inverse}">
        <div class="blogcard_cover">
            <img :src="cover" alt="">
        </div>

        <div class="blogcard_wrap">
            <div class="blogcard_type">Статья</div>
            <div class="blogcard_category" v-if="category && category!==''">{{category}}</div>
            <a href="#" class="blogcard_title">{{title}}</a>

            <ul class="blog_stats blogcard_stats" v-if="bookmarksCount!==null || ratingCount!==null || commentsCount!==null">
                <li class="blog_stat blog_stat-rating" v-if="ratingCount!==null">{{ratingCount}}</li>
                <li class="blog_stat blog_stat-comments" v-if="commentsCount!==null">{{commentsCount}}</li>
                <li class="blog_stat blog_stat-bookmarks" v-if="bookmarksCount!==null">{{bookmarksCount}}</li>
            </ul>
        </div>
    </article>
</template>

<script>
    export default {
      props: {
        ratingCount: Number,
        commentsCount: Number,
        bookmarksCount: Number,
        type: String,
        category: String,
        title: String,
        cover: String,
        size: String,
        inverse: Boolean,
      }
    }
</script>
