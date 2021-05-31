<template>
  <div class="container">
    <h2 class="header2 text-primary text-center">Real-Time Chat</h2>
    <h5 class="text-secondary text-center">Powered by Vue.js & Firebase</h5>
    <div class="card login">
      <div class="card-body">
        <h2 class="card-title text-center">Login</h2>
        <form @submit.prevent="login" class="text-center">
          <div class="form-group">
            <input type="text" class="form-control" placeholder="Username" name="name" v-model="name">
          </div>
          <div class="form-group">
            <input type="password" class="form-control" placeholder="Password" name="password" v-model="password">
            <p v-if="errorText" class="text-danger">{{ errorText }}</p>
          </div>
          <button class="btn btn-primary">Enter Chat</button>
        </form>
      </div>
    </div>
    <div class="alert alert-light" role="alert">
      First-timer? Enter chat with a new username and password!
    </div>
  </div>
</template>

<script>
import fb from "@/firebase/init";
export default {
  name: 'Login',
  data () {
    return {
      name: "",
      password: "",
      errorText: null
    }
  },
  methods: {
    login() {
      if (this.name) {
        if (this.password) {
          fb.collection('users').doc(this.name).get().then(doc => {
            if (doc.exists) {
              if (doc.data().password == this.password) {
                this.$router.push({name: 'Chat', params: {name: this.name}});
                $cookies.set('user', this.name)
              } else {
                this.errorText = "Error: Username taken or password incorrect."
              }
            } else {
              fb.collection('users').doc(this.name).set({
                username: this.name,
                password: this.password
              }).catch(err => {
                console.log(err)
              });
              this.$router.push({name: 'Chat', params: {name: this.name}});
              $cookies.set('user', this.name)
            }
          });
        } else {
          this.errorText = "Please enter password."
        }
      } else {
        this.errorText = "Please enter username."
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
