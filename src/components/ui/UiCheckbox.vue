<template>
    <label class="checkbox" :class="{'checkbox-block': block, 'checkbox-nowrap': nowrap}">
        <input :type="type" :value="data" :checked="shouldBeChecked" @change="handleChange" :name="name"/>
        <span class="checkbox_icon"></span>
        <span class="checkbox_label">{{label}}</span>
    </label>
</template>

<script>
    export default {
      props: {
        label: String,
        data: [String, Number, Array],
        value: [String, Number, Array],
        name: String,
        block: Boolean,
        nowrap: Boolean,
        type: {
          type: String,
          default: 'checkbox',
          validator: (val) => ['checkbox', 'radio'].includes(val),
        },
        toggle: Boolean,
      },
      computed: {
        shouldBeChecked() {
          if (this.type==='checkbox') {
            return this.value ? this.value.includes(this.data) : false;
          } else {
            return this.value === this.data;
          }
        },
      },
      methods: {
        handleChange(e) {
          console.log({v: e.target.checked});
          if (this.type === 'checkbox') {
            if (e.target.checked) {
              this.$emit('input', [...this.value, this.data]);
            } else {
              const data = [...this.value];
              const index = data.indexOf(this.data);
              data.splice(index, 1);
              this.$emit('input', data);
            }
          } else {
            this.$emit('input', this.data);
          }
        },
      },
    }
</script>
