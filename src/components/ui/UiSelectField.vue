<template>
  <div class="textfield"
       :class="{'textfield-required': required && showRequired, 'textfield-error': error}">
    <select class="textfield_input"
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
            @blur="handleBlur"
    >
      <option :value="null">Не выбрано</option>
      <option v-for="option in options" :key="option.id" :value="option.id">{{option.name}}</option>
    </select>
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
      options: {
        type: Array,
        default: () => [],
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
      }
    },
  }
</script>
