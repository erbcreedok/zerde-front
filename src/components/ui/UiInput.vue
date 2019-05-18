<template>
  <div class="textfield"
       :class="{'textfield-required': required, 'textfield-error': error}">
    <input class="textfield_input"
           :title="name"
           :name="name"
           :type="type"
           :value="value"
           :placeholder="placeholderValue"
           :autocomplete="autocomplete"
           :required="required"
           @input="updateInput"
           v-mask="mask"
           @focus="handleFocus"
           @blur="handleBlur">
    <div v-if="label" class="textfield_label">{{label}}</div>
    <p v-if="error" v-html="error" class="textfield_subtitle textfield_subtitle-error"></p>
    <p v-if="notification && focused" v-html="notification" class="textfield_subtitle"></p>
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
      },
      mask: {
        type: String,
        default: '',
      },
      error: {
        type: String,
      },
      notification: {
        type: String,
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
      },
      handleFocus(e) {
        this.focused = true;
        this.$emit('focus', e);
      },
      handleBlur(e) {
        this.focused = false;
        this.$emit('blur', e);
      }
    },
  }
</script>
