<template>
<div class="container">
  <div class="card">
    <div class="card-header">
      <ul class="nav nav-tabs card-header-tabs" role="tablist">
        <PublicChatDropdown />
        <PrivateChatDropdown />
        <li class="nav-item" v-for="(_pin, _id) in previousRooms" :key="_id">
          <a class="nav-link active" v-if="channel == _id"><BootstrapIcon class="mr-1" icon="lock"/>{{ channel }}</a>
          <a class="nav-link" v-else @click="go(`/private-chat/${_id}`)"><BootstrapIcon class="mr-1" icon="lock"/>{{ _id }}</a>
        </li>
        <Logout />
      </ul>
    </div>
    <div class="card-body text-left">
      <h6 class="text-secondary text-right">Pin: {{ pin }}</h6>
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
      <CreateMessage :name="$cookies.get('user')" :mode="mode" />
    </div>
  </div>
</div>
  
</template>
<script>
import CreateMessage from "@/components/CreateMessage";
import PublicChatDropdown from "@/components/PublicChatDropdown";
import PrivateChatDropdown from "@/components/PrivateChatDropdown";
import Logout from '@/components/Logout';
import fb from "@/firebase/init";
import moment from "moment";

export default {
  name: "PrivateChat",
  components: {
    CreateMessage,
    PublicChatDropdown,
    PrivateChatDropdown,
    Logout
  },
  data() {
    return {
      mode: "private",
      channel: this.$route.params.channel,
      messages: [],
      previousRooms: {},
      pin: 1111
    }
  },
  created() {
    let ref = fb.collection('private-channels').doc(this.channel).collection('chat-history').orderBy('timestamp');
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
    this.previousRooms = $cookies.get('previous-chats');
    this.pin = this.previousRooms[this.channel];
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
h6{
  height: 0px;
}
</style>