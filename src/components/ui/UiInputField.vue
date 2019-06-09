<template>
  <div class="textfield"
       :class="{'textfield-required': required && showRequired, 'textfield-error': error}">
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
           :maxlength="maxLength"
           :minlength="minLength"
           :min="min"
           :max="max"
           :disabled="disabled"
           @focus="handleFocus"
           @blur="handleBlur">
    <label v-if="label" class="textfield_label">{{label}}</label>
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
      showRequired: Boolean,
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
      },
      maxLength: [String, Number],
      minLength: [String, Number],
      min: [String, Number],
      max: [String, Number],
      disabled: {
        type:Boolean,
        default: false,
      },
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
      },
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
