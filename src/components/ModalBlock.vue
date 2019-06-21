<template>
  <div class="modal-wrapper">
    <div class="modal" :class="{'modal-visible': visible}" :style="{width: width ? width : 'auto', maxWidth}">
      <slot name="header"></slot>
      <div class="modal_header" v-if="withHeader">
        <div class="modal_title">{{title}}</div>
        <button class="modal_close" @click="hideModal"></button>
      </div>

      <div class="modal_wrap">
        <div class="modal_body">
          <slot></slot>
        </div>
      </div>
    </div>
    <div class="overlay" @click="hideModal"></div>
  </div>
</template>

<script>
  export default {
    props: {
      visible: Boolean,
      withHeader: Boolean,
      title: String,
      width: [String, Number],
      maxWidth: [String, Number],
    },
    methods: {
      hideModal() {
        this.$emit('update:visible', false);
      },
      switchOverflow() {
        if (this.visible) {
          window.document.body.style.overflow = 'hidden';
        } else {
          window.document.body.style.overflow = null;
        }
      },
    },
    mounted() {
      this.switchOverflow();
    },
    watch: {
      visible() {
        this.switchOverflow();
      }
    }

  }
</script>