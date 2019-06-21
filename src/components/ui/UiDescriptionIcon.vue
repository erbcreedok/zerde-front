<template>
  <span style="font-weight: normal; color: #212121; font-size: 16px">
    <span data-modal="skillsDescription" class="help-icon" @click="modalVisible=true"></span>
    <modal-block :visible.sync="modalVisible" :with-header="!!title" :title="title" maxWidth="552px">
      <p v-html="body"></p>
    </modal-block>
  </span>
</template>
<script>
  import ModalBlock from '../ModalBlock'
  export default {
    props: {
      title: String,
      body: String,
    },
    data() {
      return {
        modalVisible: false,
      }
    },
    components: {ModalBlock},
  }
</script>