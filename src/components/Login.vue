<template>
  <div class="container">
    <div class="card login">
      <div class="card-body">
        <h2 class="card-title text-center">Login</h2>
        <form @submit.prevent="login">
          <div v-if="errors.generalError" class="alert alert-danger" role="alert">
            {{ errors.generalError }}
          </div>
          <div class="form-group">
            <input v-if="!$cookies.get('user')" type="text" class="form-control" placeholder="Username" name="name" v-model="name">
            <input v-else type="text" class="form-control" name="name" v-model="name">
            <div v-if="errors.usernameError" class="text-danger" id="errorText">
              <small>{{ errors.usernameError }}</small>
            </div>
          </div>
          <div class="form-group">
            <input type="password" class="form-control" placeholder="Password" name="password" v-model="password">
            <div v-if="errors.passwordError" class="text-danger" id="errorText"><small>{{ errors.passwordError }}</small></div>
          </div>
          <div class="form-group text-center">
            <input type="radio" value="1" id="One" name="channel" v-model="channel">
            <label for="One">Room 1</label>
            <input type="radio" value="2" id="Two" name="channel" v-model="channel">
            <label for="Two">Room 2</label>
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
      name: $cookies.get('user'),
      password: "",
      channel: "1",
      errors: {
        usernameError: null,
        passwordError: null,
        generalError: null
      }
    }
  },
  methods: {
    login() {
      this.errors.usernameError = null
      this.errors.passwordError = null
      this.errors.generalError = null
      if (this.name) {
        if (this.name.length > 20) {
          this.errors.usernameError = "Username can't be longer than 20 characters."
        } else {
          if (this.password) {
            fb.collection('users').doc(this.name).get().then(doc => {
              if (doc.exists) {
                if (doc.data().password == this.password) {
                  $cookies.set('user', this.name)
                  this.$router.push({path: `chat/${this.channel}`});
                } else {
                  this.errors.generalError = "Username taken or password incorrect."
                }
              } else {
                fb.collection('users').doc(this.name).set({
                  username: this.name,
                  password: this.password
                }).catch(err => {
                  console.log(err)
                });
                $cookies.set('user', this.name)
                this.$router.push({path: `chat/${this.channel}`});
              }
            });
          } else {
            this.errors.passwordError = "Please enter password."
          }
        }        
      } else {
        this.errors.usernameError = "Please enter username."
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
</style>
