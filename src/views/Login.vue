<template>
  <div class="container">
    <h2 class="header2 text-primary text-center">Real-Time Chat</h2>
    <h5 class="text-secondary text-center">Powered by Vue.js & Firebase</h5>
    <div class="card login">
      <div class="card-body">
        <h2 class="card-title text-center">Login</h2>
        <form @submit.prevent="login" class="text-center">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Please enter your name ..." name="name" v-model="name">
            <p v-if="errorText" class="text-danger">{{ errorText }}</p>
          </div>
          <button class="btn btn-primary">Enter Chat</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      name: "",
      errorText: null
    }
  },
  methods: {
    login() {
      if (this.name) {
        this.$router.push({name: 'Chat', params: {name: this.name}})
      } else {
        this.errorText = "Please enter a name first."
      }
    }
  }
}
</script>

<style scoped>
.login{
  max-width: 450px;
  margin-top: 50px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}

.header2 {
  font-size: 2.6em;
  margin-bottom: 0px;
}
h5{
  margin-top: 0px;
  margin-bottom: 40px;
}
</style>
