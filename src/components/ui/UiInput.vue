<template>
  <div class="textfield" :class="{'textfield-required': required}">
    <input class="textfield_input"
           :title="name"
           :name="name"
           :type="type"
           :value="value"
           :placeholder="placeholderValue"
           :autocomplete="autocomplete"
           :required="required"
           @input="updateInput"
           @focus="focused = true"
           @blur="focused = false">
    <div v-if="label" class="textfield_label">{{label}}</div>
  </div>
</template>

<script>
  export default {
    props: {
      name: {
        type: String,
      },
      label: {
        type: String,
      },
      placeholder: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: 'text'
      },
      value: {
        type: String
      },
      required: {
        type: Boolean,
        default: false
      },
      autocomplete: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        focused: false,
      }
    },
    computed: {
      placeholderValue() {
        if (!this.label) return this.placeholder;
        return this.placeholder && this.focused ? this.placeholder : ' ';
      }
    },
    methods: {
      updateInput(e) {
        this.$emit('input', e.target.value)
      }
    }
  }
</script>