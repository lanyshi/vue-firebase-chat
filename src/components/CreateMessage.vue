<template>
  <div class="container" style="margin-bottom: 30px">
    <form @submit.prevent="createMessage">
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" v-if="name">{{ name }}:</span>
            <span class="input-group-text" v-else>{{ $cookies.get('user') }}:</span>
          </div>
          <input type="text" class="form-control" name="message" placeholder="Enter message here..." v-model="newMessage">
        </div>
        <p class="text-danger" v-if="errorText">{{ errorText }}</p>
      </div>
      <button type="submit" class="btn btn-primary" name="action">Submit</button>
      <button type="button" class="btn btn-secondary float-right" v-on:click="logout">Log Out</button>
    </form>
  </div>
</template>

<script>
import fb from "@/firebase/init";
export default {
  name: "CreateMessage",
  props: ["name"],
  data() {
    return {
      newMessage: null,
      errorText: null
    }
  },
  methods: {
    createMessage() {
      if (this.newMessage) {
        var user = this.name;;
        if (!this.name) {
          user = $cookies.get('user');
        }
        fb.collection("channel-"+this.$route.params.channel).add({
          message: this.newMessage,
          name: user,
          timestamp: Date.now()
        }).catch(err => {
          console.log(err)
        });
        this.newMessage = null;
        this.errorText = null;
      } else {
        this.errorText = "A message must be entered first.";
      }
    },
    logout() {
      this.$router.push({name: 'Login'});
    }
  }
}
</script>
