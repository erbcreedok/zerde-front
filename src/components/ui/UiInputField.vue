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
           v-mask="maskValue"
           :maxlength="maxLength"
           :minlength="minLength"
           :min="min"
           :max="max"
           :disabled="disabled"
           @focus="handleFocus"
           @blur="handleBlur">
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
      translate: Boolean,
      capitalize: Boolean,
      isPhone: Boolean,
    },
    data() {
      return {
        focused: false,
      }
    },
    computed: {
      maskValue() {
        if (this.mask) {
          return this.mask;
        }
        if (this.isPhone) {
          return '+#(###)###-##-##'
        }
        return '';
      },
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
        if (this.isPhone) {
          this.handlePhoneFocus();
        }
        this.$emit('focus', e);
      },
      handleBlur(e) {
        this.focused = false;
        if (this.isPhone) {
          this.handlePhoneBlur();
        }
        this.$emit('blur', e);
      },
      handlePhoneFocus() {
        if(this.value === '') {
          console.log('123123');
          this.$emit('input', '+7(7');
        }
      },
      handlePhoneBlur() {
        if(this.value.length < 5) {
          console.log('remove phone val')
          this.$emit('input', '');
        }
      },
    },
  }
</script>
