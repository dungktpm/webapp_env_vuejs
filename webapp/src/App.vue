<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/logo.png">
    <hello msg="Xin chào"/>
  </div>
</template>

<script>
import HelloWorld from './components/HelloWorld.vue'
export default {
  name: 'App',
  components: {
    'hello':HelloWorld
  }
} 
</script>
<style>
@import './assets/lib/ampleadmin/dist/css/style.min.css';
@import './assets/css/site.css';
</style>
