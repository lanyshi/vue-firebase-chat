<template>
  <div class="container">
    <div class="card login">
      <div class="card-body">
        <h2 class="card-title text-center">Login</h2>
        <form @submit.prevent="login">
          <div class="form-group text-left">
            <input type="text" :class="{'form-control': true, 'is-invalid': errors.usernameError || errors.generalError}" placeholder="Username" name="name" v-model="name">
            <small v-if="errors.usernameError" class="text-danger" id="errorText">{{ errors.usernameError }}</small>
          </div>
          <div class="form-group text-left">
            <input type="password" :class="{'form-control': true, 'is-invalid': errors.passwordError || errors.generalError}" placeholder="Password" name="password" v-model="password">
            <small v-if="errors.passwordError" class="text-danger" id="errorText">{{ errors.passwordError }}</small>
            <small v-else-if="errors.generalError" class="text-danger" id="errorText">{{ errors.generalError }}</small>
          </div>          
          <div class="form-group text-center">
            <div class="custom-control custom-radio">
              <input class="custom-control-input" type="radio" id="chatMode1" value="public" v-model="mode" checked>
              <label class="custom-control-label" for="chatMode1">Public Chat</label>
            </div>
            <div class="custom-control custom-radio">
              <input class="custom-control-input" type="radio" id="chatMode2" value="private" v-model="mode">
              <label class="custom-control-label" for="chatMode2">Private Chat</label>
            </div>
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
      mode: "public",
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

      let is_valid = true;
      if (!this.name) {
        this.errors.usernameError = "Please enter a username.";
        is_valid = false;
      }
      if (!this.password) {
        this.errors.passwordError = "Please enter password."
        is_valid = false;
      }
      if (this.name.length > 20) {
        this.errors.usernameError = "Username can't be longer than 20 characters."
        is_valid = false;
      }
      if (is_valid) {
        fb.collection('users').doc(this.name).get().then(doc => {
          if (doc.exists) {
            if (doc.data().password == this.password) {
              $cookies.set('user', this.name)
              if (this.mode == 'public') {
                this.$router.push({path: 'chat/1'});
              } else {
                this.$router.push({path: 'enter/private-chat/'});
              }
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
      }
    }
  },
  created() {
    if ($cookies.get('user')) {
      this.name = $cookies.get('user');
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
