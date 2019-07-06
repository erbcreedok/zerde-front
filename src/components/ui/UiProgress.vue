<template>
  <div class="circleProgress" :class="{'circleProgress-success': success, 'circleProgress-danger': danger}" :style="{width: size+'px', height: size+'px'}">
    <div class="circleProgress_value">{{progress}}</div>
    <svg class="circleProgress_ring">
      <circle :stroke="bgColor" :r="r" :cx="c" :cy="c" :stroke-width="strokeWidth" fill="transparent"></circle>
      <circle :stroke="color" class="circleProgress_circle"
              :r="r" :cx="c" :cy="c" :stroke-width="strokeWidth"
              fill="transparent" :style="{strokeDasharray: length, strokeDashoffset: progressLength}"></circle>
    </svg>
  </div>
</template>

<script>
  export default {
    props: {
      color: {
        type: String,
        default: '#304ffe',
      },
      bgColor: {
        type: String,
        default: '#eeeeee',
      },
      size: {
        type: Number,
        default: 56,
      },
      strokeWidth: {
        type: Number,
        default: 4,
      },
      progress: {
        type: Number,
        default: 0,
      },
      success: Boolean,
      danger: Boolean,
    },
    computed: {
      c() { return this.size/2 },
      r() { return this.c - this.strokeWidth},
      length() { return this.r * Math.PI * 2 },
      progressLength() {return this.length - (this.length / 100 * this.progress)},
    },
  }
</script>