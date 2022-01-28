<template>
<div class="container">
  <div class="row">
    <div class="col-xl-2 col-md-3 px-2">
      <SideNavigation :mode="'unlocked-'+channel" />
    </div> 
    <div class="col-xl-10 col-md-9 px-2">
      <div class="card">
        <div class="card-header">
          <div class="row">
          <div class="col">
            <BootstrapIcon class="mr-2" icon="lock"/>{{ channel }}
          </div>
          <div class="col text-right">Pin: {{ pin }}</div>
          </div>
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
          <CreateMessage :name="$cookies.get('user')" :mode="mode" />
        </div>
      </div>
    </div>
  </div>
</div>
  
</template>
<script>
import SideNavigation from "@/components/SideNavigation";
import CreateMessage from "@/components/CreateMessage";
import fb from "@/firebase/init";
import moment from "moment";

export default {
  name: "PrivateChat",
  components: {
    SideNavigation,
    CreateMessage
  },
  data() {
    return {
      mode: "private",
      channel: this.$route.params.channel,
      messages: [],
      enteredRooms: {},
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
    this.enteredRooms = $cookies.get('previous-chats');
    this.pin = this.enteredRooms[this.channel];
  }
}
</script>