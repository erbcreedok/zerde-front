<template>
    <router-link :to="{name: 'article', params: {slug: id}}" class="blogcard" :class="{'blogcard-wide': wide,  'blogcard-inverse': inverse, 'blogcard-h': horizontal, 'blogcard-hl': highlight, 'blogcard-stackedMobile': stacked}">
        <div class="blogcard_cover">
            <img :src="cover" alt="">
        </div>

        <div class="blogcard_wrap">
            <div class="blogcard_type">{{type==='text' ? 'Статья' : 'Видео'}}</div>
            <div class="blogcard_category" v-if="category && category!==''">{{category}}</div>
            <router-link :to="{name: 'article', params: {slug: id}}" class="blogcard_title">{{title}}</router-link>

            <ul class="blog_stats blogcard_stats" v-if="fav_count!==null || rating!==null || comments_count!==null">
                <li class="blog_stat blog_stat-rating" v-if="rating!==null">{{rating}}</li>
                <li class="blog_stat blog_stat-comments" v-if="comments_count!==null">{{comments_count}}</li>
                <li class="blog_stat blog_stat-bookmarks" v-if="fav_count!==null">{{fav_count}}</li>
            </ul>
        </div>
    </router-link>
</template>

<script>
    export default {
      props: {
        id: [Number, String],
        rating: Number,
        comments_count: Number,
        fav_count: Number,
        type: String,
        category: String,
        themes: Array,
        title: String,
        cover: String,
        wide: Boolean,
        inverse: Boolean,
        horizontal: Boolean,
        highlight: Boolean,
        stacked: Boolean,
      },
    }
</script>
