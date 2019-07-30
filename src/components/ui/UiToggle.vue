<template>
    <label>
        <span class="checkbox">
            <input type="checkbox" :value="value" :checked="value" @change="handleChange" :name="name"/>
            <span class="checkbox_toggle"></span>
        </span>
        <span>{{label}}</span>
    </label>
</template>

<script>
    export default {
      props: {
        label: String,
        name: String,
        value: Boolean,
      },
      methods: {
        handleChange(e) {
          this.$emit('input', e.target.checked);
        }
      },
    }
</script>
