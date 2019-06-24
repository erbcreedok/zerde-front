<template>
    <nav class="blog_tags tags" :class="navPositionClass">
        <swiper class="swiper-wrapper" ref="mySwiper" :options="sliderOptions">
            <swiper-slide v-for="tag in tags" :key="tag.id" class="blog_tags_item">
                <template v-if="tag.link">
                    <router-link :to="tag.link" class="tag" @click="handleClick(tag)">{{tag.name}}</router-link>
                </template>
                <template v-else>
                    <a class="tag" @click="handleClick(tag)">{{tag.name}}</a>
                </template>

            </swiper-slide>
        </swiper>
    </nav>
</template>

<script>
    export default {
      name: 'kb-tags',
      props: {
        tags: {
          type: Array,
          default: () => [],
        }
      },
      data() {
        return {
          sliderOptions: {
            slidesPerView: 'auto',
          },
          sliderPositions: {
            beginning: true,
            end: false,
          },
          navPositionClass: 'beginning',
        }
      },
      computed: {
        swiper() {
          if (this.$refs.mySwiper) {
            return this.$refs.mySwiper.swiper
          }
          return null;
        },
      },
      methods: {
        handleClick(tag) {
          this.$emit('click', tag);
        },
      },
      mounted() {
        if (this.swiper) {
          this.swiper.slideTo(0, 1000, false);
          this.swiper.on('reachBeginning', () => {
            this.sliderPositions.beginning = true;
          });
          this.swiper.on('reachEnd', () => {
            this.sliderPositions.end = true;
          });
          this.swiper.on('fromEdge', () => {
            this.sliderPositions.beginning = false;
            this.sliderPositions.end = false;
          });
          this.swiper.on('slideChange', () => {
            let className = '';
            if (this.sliderPositions.beginning) {
              className += ' beginning'
            }
            if (this.sliderPositions.end) {
              className += ' end'
            }
            this.navPositionClass = className
          });
        }
      }
    }
</script>
