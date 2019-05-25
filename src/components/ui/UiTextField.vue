<template>
  <div class="textfield"
       :class="{'textfield-required': required && showRequired, 'textfield-error': error}">
    <slot></slot>
    <label v-if="label" class="textfield_label">{{label}}</label>
    <p v-if="error" v-html="error" class="textfield_subtitle textfield_subtitle-error"></p>
    <p v-if="notification && focused" v-html="notification" class="textfield_subtitle"></p>
  </div>
</template>