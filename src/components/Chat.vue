<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs" role="tablist">
          <li class="nav-item">
            <a class="nav-link active" v-if="channel == 1">Channel 1</a>
            <a class="nav-link" v-else @click="go('/chat/1')">Channel 1</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" v-if="channel == 2">Channel 2</a>
            <a class="nav-link" v-else @click="go('/chat/2')">Channel 2</a>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"><BootstrapIcon class="mr-1" icon="lock"/>Private Chat</a>
            <div class="dropdown-menu">
              <router-link class="dropdown-item" to="/enter/private-chat" @click.native="$router.go()">Enter a private chat room</router-link>
              <router-link class="dropdown-item" v-for="(_pin, _id) in previousRooms" :key="_id" :to="{path: `/private-chat/${_id}`}" @click.native="$router.go()"><BootstrapIcon class="mr-1" icon="lock"/>{{ _id }}</router-link>
              <div class="dropdown-divider"></div>
              <router-link class="dropdown-item" to="/create/private-chat" @click.native="$router.go()">Create a private chat room</router-link>
            </div>
          </li>
          <Logout />
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
        <CreateMessage :name="name" :mode="mode" />
      </div>
    </div>
  </div>
</template>

<script>
import CreateMessage from "@/components/CreateMessage";
import Logout from "@/components/Logout";
import fb from "@/firebase/init";
import moment from "moment";

export default {
  name: "Chat",
  components: {
    CreateMessage,
    Logout
  },
  data() {
    return {
      mode: "public",
      messages: [],
      name: this.$cookies.get('user'),
      channel: this.$route.params.channel,
      previousRooms: {}
    }
  },
  created() {
    let ref = fb.collection("public-channels").doc("channel-" + this.channel).collection("chat-history").orderBy("timestamp");
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
    if ($cookies.get('previous-chats')) {
      this.previousRooms = $cookies.get('previous-chats');
    }
  }
}
</script>

<style scoped>
.messages span{
  font-size: 1.2em;
}
.messages .time{
  display: block;
  font-size: 0.7em;
}
.messages{
  max-height: 300px;
  overflow: auto;
}
[class="nav-link"]:hover{
  cursor: pointer;
}
</style>
