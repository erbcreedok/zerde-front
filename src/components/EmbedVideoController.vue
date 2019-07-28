<template>
  <iframe :src="video_link" frameborder="0" allowfullscreen></iframe>
</template>

<script>
  import {VIMEO_PRE, YOUTUBE_PRE} from '../_types'

  export default {
    props: {
      link: String,
      type: String,
    },
    data() {
      return {
        time: null,
        autoPlay: false,
      }
    },
    computed: {
      playerType() {
        const link = this.link.toString();
        if (link.indexOf(YOUTUBE_PRE)!==-1) {
          return 'youtube'
        }
        if (link.indexOf(VIMEO_PRE)!==-1) {
          return 'vimeo'
        }
        return null;
      },
      video_link() {
        let link = this.link;
        if (this.playerType === 'youtube') {
          if (this.time!==null) {
            link += '?start=' + this.time;
            if (this.autoPlay) {
              link += '&autoplay=1';
            }
          }
        }
        if (this.playerType === 'vimeo') {
          if (this.autoPlay) {
            link += '?autoplay=1';
          }
          if (this.time!==null) {
            link += '#t=' + this.time + 's';
          }
        }
        return link;
      }
    },
    methods: {
      seekTo(time) {
        this.time = time;
        this.autoPlay = true;
      }
    }
  }
</script>