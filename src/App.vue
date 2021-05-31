<template>
  <div id="app">
    <router-view/>
    <footer>
      <cookie-law buttonClass="btn btn-primary">
        <div slot="message">
          <p> This site uses 🍪 to ensure the best experience. </p>
        </div>
      </cookie-law>
    </footer>
  </div>
</template>

<script>
import CookieLaw from 'vue-cookie-law';
export default {
  name: 'App',
  components: {
    CookieLaw
  },
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.Cookie {
  flex-flow: column;
}
</style>
