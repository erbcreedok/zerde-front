<template>
  <div class="textfield"
       :class="{'textfield-required': required && showRequired, 'textfield-error': error}">
    <textarea class="textfield_input"
              ref="input"
              :title="name"
              :name="name"
              :type="type"
              :value="value"
              :placeholder="placeholderValue"
              :autocomplete="autocomplete"
              :required="required"
              :rows="rows"
              :autofocus="autofocus"
              :maxlength="maxLength"
              v-mask="mask"
              @input="updateInput"
              @focus="handleFocus"
              @blur="handleBlur"></textarea>
    <label v-if="label" class="textfield_label">{{labelValue}}</label>
    <p v-if="error" v-html="error" class="textfield_subtitle textfield_subtitle-error"></p>
    <p v-if="notification && focused" v-html="notification" class="textfield_subtitle"></p>
  </div>
</template>

<script>
  import {capitalize} from '../../_filters/capitalize'

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
      rows: {
        type: [String, Number],
        default: 1,
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
      autofocus: {
        type: Boolean,
        default: false,
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
      maxLength: {
        type: [String, Number],
      },
      translate: Boolean,
      capitalize: Boolean,
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
      labelValue() {
        let value = this.label;
        if (this.translate) {
          value = this.$t(value);
        }
        if (this.capitalize) {
          value = capitalize(value);
        }
        return value
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
      },
      focus() {
        this.$refs.input.focus();
      },
    },
  }
</script>
