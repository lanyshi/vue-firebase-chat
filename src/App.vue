<template>
  <div id="app">
    <h2 class="title text-primary text-center">Real-Time Chat</h2>
    <h5 class="subtitle text-secondary text-center">Powered by Vue.js & Firebase</h5>
    <router-view/>
    <footer>
      <cookie-law
        storageName="cookieAccepted"
        storageType="cookies"
        buttonClass="btn btn-primary">
        <div slot="message">
          <p> This site uses &#127850; to ensure the best experience. </p>
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
  }
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

.title {
  font-size: 2.6em;
  margin-bottom: 0px;
}
.subtitle {
  margin-top: 0px;
  margin-bottom: 40px;
}
</style>
