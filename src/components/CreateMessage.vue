<template>
  <div class="container" style="margin-bottom: 30px">
    <form @submit.prevent="createMessage">
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text">{{ name }}:</span>
          </div>
          <input type="text" class="form-control" name="message" placeholder="Enter message here..." v-model="newMessage">
          <div class="input-group-append">
            <button type="submit" class="btn btn-primary" name="action">Send</button>
          </div>
        </div>
        <small v-if="errorText" class="text-danger" id="errorText">{{ errorText }}</small>
      </div>
    </form>
  </div>
</template>

<script>
import fb from "@/firebase/init";

export default {
  name: "CreateMessage",
  props: ["name", "mode"],
  data() {
    return {
      channel: this.$route.params.channel,
      newMessage: null,
      errorText: null,
      oldMessages: []
    }
  },
  methods: {
    createMessage() {
      if (this.newMessage) {
        var user = this.name;;
        if (this.mode == "public") {
          fb.collection('public-channels').doc(this.channel).collection('chat-history').add({
            message: this.newMessage,
            name: user,
            timestamp: Date.now()
          }).catch(err => {
            console.log(err)
          });
          this.newMessage = null;
          this.errorText = null;
        } else {
          fb.collection('private-channels').doc(this.channel).collection('chat-history').add({
            message: this.newMessage,
            name: user,
            timestamp: Date.now()
          }).catch(err => {
            console.log(err)
          });
          this.newMessage = null;
          this.errorText = null;
        }
      } else {
        this.errorText = "A message must be entered first.";
      }
    }
  }
}
</script>
