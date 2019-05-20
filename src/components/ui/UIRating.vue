<template>
    <div class="rating">
        <button class="rating_control rating_control-decrease" :class="{'rating_control-selected': rated<0}" @click="putLike(rated-1)"></button>
        <div class="rating_counter" :class="{'rating_counter-positive': rated>0, 'rating_counter-negative': rated<0}">{{rate + rated}}</div>
        <button class="rating_control rating_control-increase" :class="{'rating_control-selected': rated>0}" @click="putLike(rated+1)"></button>
    </div>
</template>

<script>
    export default {
      name: 'ui-rating',
      props: {
        rated: {
          type: [String, Number],
          default: 0
        },
        rate: {
          type: [String, Number],
          default: 0
        }
      },
      methods: {
        putLike(rate) {
          this.$emit('change', rate);
        }
      }
    }
</script>
