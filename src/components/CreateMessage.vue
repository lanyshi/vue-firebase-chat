<template>
  <div class="container" style="margin-bottom: 30px">
    <form @submit.prevent="createMessage">
      <div class="form-group">
        <div class="input-group">
          <div class="input-group-prepend">
            <span class="input-group-text" id="basic-addon1">{{ name }}:</span>
          </div>
          <input type="text" class="form-control" name="message" placeholder="Enter message here..." v-model="newMessage">
        </div>
        <p class="text-danger" v-if="errorText">{{ errorText }}</p>
      </div>
      <button type="submit" class="btn btn-primary" name="action">Submit</button>
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
        fb.collection("messages").add({
          message: this.newMessage,
          name: this.name,
          timestamp: Date.now()
        }).catch(err => {
          console.log(err)
        });
        this.newMessage = null;
        this.errorText = null;
      } else {
        this.errorText = "A message must be entered first.";
      }
    }
  }
}
</script>
