<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
  <div id="app">
    <auth-provider>
      <router-view>
        <template v-slot:top>
          <Header class="mb-5"/>
        </template>
        <template v-slot:bottom>
          <Footer/>
        </template>
      </router-view>
    </auth-provider>
  </div>
</template>

<script>
  import Header from './components/Header'
  import Footer from './components/Footer'
  import AuthProvider from './providers/AuthProvider'

  export default {
    components: {Footer, AuthProvider, Header},
  }
</script>
