<template>
    <div class="rating">
        <button :disabled="loading || disabled" class="rating_control rating_control-decrease" :class="{'rating_control-selected': rated<0}" @click="putLike(rated-1)"></button>
        <div v-if="!loading" class="rating_counter" :class="{'rating_counter-positive': rate>0, 'rating_counter-negative': rate<0}">{{rate}}</div>
        <clip-loader v-if="loading" :loading="loading" color="rgba(48, 78, 254, .7)" size="29px"/>
        <button :disabled="loading || disabled" class="rating_control rating_control-increase" :class="{'rating_control-selected': rated>0}" @click="putLike(rated+1)"></button>
    </div>
</template>

<script>
    import ClipLoader from 'vue-spinner/src/ClipLoader'
    export default {
      name: 'ui-rating',
      components: {ClipLoader},
      props: {
        rated: {
          type: [String, Number],
          default: 0
        },
        rate: {
          type: [String, Number],
          default: 0
        },
        loading: Boolean,
        disabled: Boolean,
      },
      methods: {
        putLike(rate) {
          this.$emit('change', rate);
        }
      }
    }
</script>
