<template>
  <div class="container">
    <div class="card">
      <div class="card-header">
        <ul class="nav nav-tabs card-header-tabs" role="tablist">
          <PublicChatDropdown />
          <li class="nav-item">
            <a class="nav-link active"><BootstrapIcon class="mr-2" icon="lock"/>Private Chat</a>
          </li>
          <li class="nav-item" v-for="(_pin, _id) in previousRooms" :key="_id">
            <router-link class="nav-link" :to="{path: `/private-chat/${_id}`}" @click.native="$router.go()"><BootstrapIcon class="mr-2" icon="lock"/>{{ _id }}</router-link>
          </li>
          <Logout />
        </ul>
      </div>
      <div class="card-body">
        <ul class="nav nav-tabs form justify-content-center">
          <li class="nav-item">
            <a class="nav-link active" v-if="action == 'enter'"><BootstrapIcon class="mr-2" icon="box-arrow-in-right"/>Enter Chat Room</a>
            <a class="nav-link" v-else @click="go('/enter/private-chat')"><BootstrapIcon class="mr-2" icon="box-arrow-in-right"/>Enter Chat Room</a>
          </li>
          <li class="nav-item">
            <a class="nav-link active" v-if="action == 'create'"><BootstrapIcon class="mr-2" icon="plus-circle"/>Create Chat Room</a>
            <a class="nav-link" v-else @click="go('/create/private-chat')"><BootstrapIcon class="mr-2" icon="plus-circle"/>Create Chat Room</a>
          </li>
        </ul>
        <form @submit.prevent>
          <div class="form-group text-left">
            <input type="text" :class="{'form-control': true, 'is-invalid': errors.invalidId}" placeholder="Room ID" name="id" v-model="id" maxlength="20">
          </div>
          <div class="form-group text-left">
            <input type="password" :class="{'form-control': true, 'is-invalid': errors.invalidPin}" placeholder="4-digit Pin" name="pin" v-model="pin" maxlength="4">
            <small v-if="errors.message" class="text-danger" id="errorText">{{ errors.message }}</small>
          </div>
          <button class="btn btn-outline-primary" v-if="action == 'enter'" @click="enter">Go</button>
          <button class="btn btn-outline-primary" v-else @click="create">Go</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import PublicChatDropdown from "@/components/PublicChatDropdown";
import Logout from "@/components/Logout";
import fb from "@/firebase/init";

export default {
  name: "PrivateChatLogin",
  props: ["channel"],
  components: {
    PublicChatDropdown,
    Logout
  },
  data() {
    return {
      action: this.$route.params.action,
      id: "",
      pin: "",
      previousRooms: {},
      errors: {
        invalidId: false,
        invalidPin: false,
        message: null
      }
    }
  },
  created() {
    if ($cookies.get('previous-chats')) {
      this.previousRooms = $cookies.get('previous-chats');
    }
  },
  methods: {
    validateForm() {
      this.errors.invalidId = false
      this.errors.invalidPin = false
      this.errors.message = null

      let is_valid = true;
      if (!this.id || !this.pin || this.pin.length < 4) {
        if (!this.id) {
          this.errors.invalidId = true;
          this.errors.message = "Please fill out required fields.";
        } 
        if (this.pin.length < 4) {
          this.errors.invalidPin = true;
          this.errors.message = "Must be 4 digits.";
        }
        if (!this.pin) {
          this.errors.invalidPin = true;
          this.errors.message = "Please fill out required fields.";
        }
        is_valid = false;
      }
      return is_valid;
    },
    enter() {
      if (this.validateForm()) {
        fb.collection('private-channels').doc(this.id).get().then(doc => {
          if (doc.exists) {
            if (doc.data().pin == this.pin) {
              this.previousRooms[this.id] = this.pin;
              $cookies.set('previous-chats', this.previousRooms);
              this.$router.push({path: `/private-chat/${this.id}`})
            } else {
              this.errors.message = "Incorrect ID and Pin combination.";
              this.errors.invalidId = true;
              this.errors.invalidPin = true;
            }
          } else {
            this.errors.message = "Room doesn't exist.";
            this.errors.invalidId = true;
          }
        });
      }
    },
    create() {
      if (this.validateForm()) {
        fb.collection('private-channels').doc(this.id).get().then(doc => {
          if (doc.exists) {
            this.errors.message = "Room already exists.";
            this.errors.invalidId = true;
          } else {
            fb.collection('private-channels').doc(this.id).set({
            id: this.id,
            pin: this.pin,
            createdAt: Date.now()
            }).catch(err => {
              console.log(err)
            });
            this.previousRooms[this.id] = this.pin;
            $cookies.set('previous-chats', this.previousRooms);
            this.$router.push({path: `/private-chat/${this.id}`})
          }
        });
      }
    }
  }
}
</script>

<style scoped>
form{
  max-width: 300px;
  margin-top: 20px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
[class="nav-link"]:hover{
  cursor: pointer;
}
.form{
  max-width: 400px;
  margin-left: auto;
  margin-right: auto;
}
</style>