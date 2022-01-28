<template>
  <div class="container">
    <div class="login">
      <h2 class="title text-primary">Login to Chat</h2>
      <div class="alert alert-light px-0" role="alert">
        First-timer? Enter chat with a new username and password!
      </div>
      <form @submit.prevent="login">
        <div class="form-group text-left">
          <input type="text" :class="{'form-control': true, 'is-invalid': errors.usernameError || errors.generalError}" placeholder="Username" name="name" v-model="name" maxlength="20">
          <small v-if="errors.usernameError" class="text-danger" id="errorText">{{ errors.usernameError }}</small>
        </div>
        <div class="form-group text-left">
          <input type="password" :class="{'form-control': true, 'is-invalid': errors.passwordError || errors.generalError}" placeholder="Password" name="password" v-model="password">
          <small v-if="errors.passwordError" class="text-danger" id="errorText">{{ errors.passwordError }}</small>
          <small v-else-if="errors.generalError" class="text-danger" id="errorText">{{ errors.generalError }}</small>
        </div>          
        <div class="form-inline mt-3 mb-4">
          <div class="custom-control custom-radio mr-3">
            <input class="custom-control-input" type="radio" id="chatMode1" value="public" v-model="mode" checked>
            <label class="custom-control-label text-secondary" for="chatMode1">Public Chat</label>
          </div>
          <div class="custom-control custom-radio">
            <input class="custom-control-input" type="radio" id="chatMode2" value="private" v-model="mode">
            <label class="custom-control-label text-secondary" for="chatMode2">Private Chat</label>
          </div>
        </div>
        <button class="btn btn-primary">Enter</button>
      </form>
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
    validateForm() {
      this.errors.usernameError = null
      this.errors.passwordError = null
      this.errors.generalError = null

      let is_valid = true;
      if(!this.name || !this.password) {
        is_valid = false;
        if (!this.name) {
          this.errors.usernameError = "Please enter a username.";
        }
        if (!this.password) {
          this.errors.passwordError = "Please enter password."
        }
      }
      return is_valid;
    },
    login() {
      if (this.validateForm()) {
        fb.collection('users').doc(this.name).get().then(doc => {
          if (doc.exists) {
            if (doc.data().password == this.password) {
              this.enter()
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
            this.enter()
          }
        });
      }
    },
    enter() {
      $cookies.set('user', this.name)
      if (this.mode == 'public') {
        this.$router.push({path: 'public-chat/1'});
      } else {
        this.$router.push({path: 'enter/private-chat/'});
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
.container {
  margin-top: 150px;
}
.login, button {
  width: 350px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>
