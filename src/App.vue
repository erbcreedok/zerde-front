<template>
  <div id="app">
    <Header class="mb-5"/>
    <router-view/>
  </div>
</template>

<script>
  import Header from "./components/Header";
  export default {
    components: {Header}
  }
</script>
