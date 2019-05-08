<template>
  <button class="button"
  :class="allClasses">
    <slot></slot>
  </button>
</template>

<script>
  export default {
    props: {
      color: {
        type: String,
        default: 'default'
      },
      icon: {
        type: String
      },
      iconPosition: {
        type: String,
        default: 'left'
      },
      outline: {
        type: Boolean,
        default: false
      }
    },
    computed: {
      colorClass() {
        return `button-${this.color}`
      },
      iconClass() {
        if (!this.icon) return '';
        return `button-icon button-icon-${this.icon} button-icon-${this.iconPosition}`
      },
      outlineClass() {
        return this.outline ? 'button-outline' : ''
      },
      allClasses() {
        return `${this.colorClass} ${this.iconClass} ${this.outlineClass}`
      }
    }
  }
</script>