<template>
  <nav class="navigation pagination" role="navigation">
    <div class="nav-links">
      <router-link v-if="activePage > 1" :to="{...route, query: {...route.query, page: activePage - 1}}" class="prev page-numbers" @click="setPage(activePage - 1)">Назад</router-link>
      <component v-for="(page, index) in pages"
                 :is="page.isPage ? 'router-link' : 'span'"
                 :style="{'cursor': (page.isPage ? 'pointer' : 'default')}"
                 :key="index"
                 :aria-current="(page.isCurrent ? 'page' : 'false')"
                 class="page-numbers"
                 :class="page.class"
                 @click="setPage(page)"
                 :to="(page.isPage && route) ? ({...route, query: {...route.query, page: page.value}}) : ''"
      >{{page.value}}</component>
      <router-link v-if="activePage < pageCount" :to="{...route, query: {...route.query, page: activePage + 1}}"  class="next page-numbers" @click="setPage(activePage + 1)">Далее</router-link>
    </div>
  </nav>
</template>

<script>
  export default {
    props: {
      activePage: {
        required: true,
        type: Number,
      },
      route: {
        type: Object,
      },
      total: {
        required: true,
        type: Number,
      },
      limit: {
        required: true,
        type: Number,
      },
    },
    computed: {
      pageCount() {
        return Math.ceil(this.total/this.limit);
      },
      pages() {
        const page = this.activePage;
        const pageCount = this.pageCount;
        let list = [];
        let pageLimit = 5;
        let upperLimit, lowerLimit;
        lowerLimit = upperLimit = Math.min(page, pageCount);
        for (let b = 1; b < pageLimit && b < pageCount;) {
          if (lowerLimit > 1 ) {
            lowerLimit--;b++;
          }
          if (b < pageLimit && upperLimit < pageCount) {
            upperLimit++;b++;
          }
        }

        list.push(this.generatePage(1));

        if (lowerLimit > 2) list.push(this.generatePage('...'));
        if (lowerLimit === 2) list.push(this.generatePage(2));
        for (let i = lowerLimit+1; i < upperLimit; i++) {
          list.push(this.generatePage(i));
        }
        if (upperLimit < pageCount - 1)list.push(this.generatePage('...'));
        if (upperLimit === pageCount - 1 && upperLimit !== 2)list.push(this.generatePage(pageCount - 1));
        if (upperLimit !== 1)list.push(this.generatePage(pageCount));
        return list;
      }
    },
    methods: {
      generatePage(page) {
        return {
          value: page,
          isPage: page!=='...' && page!==this.activePage,
          isCurrent: page===this.activePage,
          class: {'dots': page==='...', current: page===this.activePage},
        };
      },
      setPage(page){
        if (!page.isPage) return;
        this.$emit('update:activePage', page.value);
        this.$emit('pageChanged', page.value);
      },
    },
  }
</script>