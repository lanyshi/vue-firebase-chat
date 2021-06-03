<template>
  <div class="container chat">
    <div class="card">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs">
          <li class="nav-item">
            <a class="nav-link active" v-if="$route.params.channel == 1">Room 1</a>
            <a class="nav-link" v-else="$route.params.channel == 1" v-on:click="switchTo(1)">Room 1</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" v-if="$route.params.channel == 2">Room 2</a>
            <a class="nav-link" v-else="$route.params.channel == 2" v-on:click="switchTo(2)">Room 2</a>
          </li>
        </ul>
      </div>
      <div class="card-body text-left">
        <p class="text-secondary nomessages" v-if="messages.length == 0">
          [No messages yet!]
        </p>
        <div class="messages" v-chat-scroll="{always: false, smooth: true}">
          <div v-for="message in messages" :key="message.id">
            <span class="text-info">[{{ message.name }}]: </span>
            <span>{{ message.message }}</span>
            <span class="text-secondary time">{{ message.timestamp }}</span>
          </div>
        </div>
      </div>
      <div class="card-action text-left">
        <CreateMessage :name="name" :channel="$route.params.channel"/>
      </div>
    </div>
  </div>
</template>

<script>
import CreateMessage from "@/components/CreateMessage";
import fb from "@/firebase/init";
import moment from "moment";
export default {
  name: "Chat",
  props: ["name"],
  components: {
    CreateMessage
  },
  data() {
    return {
      messages: []
    }
  },
  created() {
    let ref = fb.collection("channel-" + this.$route.params.channel).orderBy("timestamp");
    ref.onSnapshot(snapshot => {
      snapshot.docChanges().forEach(change => {
        if (change.type == "added") {
          let doc = change.doc;
          this.messages.push({
            id: doc.id,
            name: doc.data().name,
            message: doc.data().message,
            timestamp: moment(doc.data().timestamp).format("LLL")
          });
        }
      });
    });
  },
  methods: {
    switchTo(room) {
      this.$router.push({path: `/chat/${room}`, params: {name: this.name}});
      window.location.reload()
    }
  }
}
</script>

<style scoped>
.chat span{
  font-size: 1.2em;
}
.chat .time{
  display: block;
  font-size: 0.7em;
}
.messages{
  max-height: 300px;
  overflow: auto;
}
.nav-item{
  cursor: pointer;
}
</style>
