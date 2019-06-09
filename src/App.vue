<template>
  <div id="app">
    <auth-provider>
      <router-view>
        <Header class="mb-5"/>
      </router-view>
    </auth-provider>
  </div>
</template>

<script>
  import Header from './components/Header'
  import AuthProvider from './providers/AuthProvider'

  export default {
    components: {AuthProvider, Header},
  }
</script>
