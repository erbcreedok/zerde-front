<template>
  <div class="textfield"
       :class="{'textfield-required': required && showRequired, 'textfield-error': error}">
    <input class="textfield_input"
           :title="name"
           :name="name"
           :type="type"
           v-model="text"
           :placeholder="placeholderValue"
           :autocomplete="autocomplete"
           :required="required"
           v-mask="mask"
           :maxlength="maxLength"
           :minlength="minLength"
           :min="min"
           :max="max"
           :disabled="disabled"
           @focus="handleFocus"
           @blur="handleBlur">
    <label v-if="label" class="textfield_label">{{labelValue}}</label>
    <div class="textfield_suggestions" :class="{'textfield_suggestions-visible': text.trim()!==''}">
      <div class="textfield_suggestions_wrap">
        <div class="textfield_suggestions_item" v-for="option in filteredOptions" :key="option.id"  :class="{'textfield_suggestions_item-inactive': option.disabled}" @click="handleSelect(option)">{{option.name}}</div>
        <template v-if="!filteredOptions.length">
          <div class="textfield_suggestions_item textfield_suggestions_item-inactive">Не найдено "{{text}}"</div>
          <div class="textfield_suggestions_item" v-for="option in options" :key="option.id" :class="{'textfield_suggestions_item-inactive': option.disabled}" @click="handleSelect(option)">{{option.name}}</div>
        </template>
      </div>
    </div>
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
        type: Object
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
        text: this.value ? this.value.name : '',
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
      filteredOptions() {
        return this.options.filter(v => this.getIndex(v.name, this.text) !== -1)
          .sort((a,b) =>
            this.getIndex(a.name, this.text) - this.getIndex(b.name, this.text)
          );
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
      handleSelect(option) {
        this.$emit('input', option)
      },
      getIndex(a, b) {
        return a.toLowerCase().indexOf(b.trim().toLowerCase());
      }
    },
    watch: {
      value(to) {
        this.text = to ? to.name : '';
      }
    }
  }
</script>
