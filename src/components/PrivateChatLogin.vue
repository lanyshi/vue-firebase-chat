<template>
  <div class="container">
    <div class="row">
      <div class="col-xl-2 col-md-3 px-2">
        <SideNavigation :mode="'private-'+action" />
      </div> 
      <div class="col-xl-10 col-md-9 px-2">
        <div class="card">
          <div class="card-header">
            <span v-if="action == 'enter'"><BootstrapIcon class="mr-2" icon="box-arrow-in-right"/>Enter Private Chat</span>
            <span v-else><BootstrapIcon class="mr-2" icon="plus-circle"/>Create Private Chat</span>
          </div>
          <div class="card-body">
            <form @submit.prevent="onSubmit" class="text-center">
              <h5 v-if="action == 'enter'" class="mb-4 text-primary">Enter A Private Chat Room</h5>
              <h5 v-else class="mb-4 text-primary">Create A Private Chat Room</h5>
              <div class="form-group text-left mb-1">
                <input type="text" :class="{'form-control': true, 'is-invalid': errors.invalidId}" placeholder="Room ID" name="id" v-model="id" maxlength="20">
                <small class="text-black-50">ID can't be longer than 20 characters.</small>
              </div>
              <div class="form-group text-left">
                <input type="password" :class="{'form-control': true, 'is-invalid': errors.invalidPin}" placeholder="4-digit Pin" name="pin" v-model="pin" maxlength="4">
                <small v-if="errors.message" class="text-danger" id="errorText">{{ errors.message }}</small>
                <small v-else class="text-black-50">(Example: 0123)</small><br>
              </div>
              <button class="btn btn-outline-primary" v-if="action == 'enter'">Go</button>
              <button class="btn btn-outline-primary" v-else>Go</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import SideNavigation from "@/components/SideNavigation";
import fb from "@/firebase/init";

export default {
  name: "PrivateChatLogin",
  components: {
    SideNavigation
  },
  data() {
    return {
      action: this.$route.params.action,
      id: "",
      pin: "",
      errors: {
        invalidId: false,
        invalidPin: false,
        message: null
      },
      enteredRooms: {}
    }
  },
  created() {
    if ($cookies.get('previous-chats')) {
      this.enteredRooms = $cookies.get('previous-chats');
      console.log(this.enteredRooms)
    }
  },
  methods: {
    validateForm() {
      this.errors.invalidId = false
      this.errors.invalidPin = false
      this.errors.message = null

      let is_valid = true;
      if (!this.id || !this.pin || this.pin.length < 4 || !new RegExp(/^\d+$/).test(this.pin)) {
        is_valid = false;
        if (!new RegExp(/^\d+$/).test(this.pin)) {
          this.errors.invalidPin = true;
          this.errors.message = "Must contain only numbers."
        }
        if (this.pin.length < 4) {
          this.errors.invalidPin = true;
          this.errors.message = "Must be 4 digits.";
        }
        if (!this.id) {
          this.errors.invalidId = true;
          this.errors.message = "Please fill out required fields.";
        }
        if (!this.pin) {
          this.errors.invalidPin = true;
          this.errors.message = "Please fill out required fields.";
        }
      }
      return is_valid;
    },
    onSubmit() {
      if(this.action == 'enter') {
        this.enter()
      } else {
        this.create()
      }
    },
    enter() {
      if (this.validateForm()) {
        fb.collection('private-channels').doc(this.id).get().then(doc => {
          if (doc.exists) {
            if (doc.data().pin == this.pin) {
              this.enteredRooms[this.id] = this.pin;
              $cookies.set('previous-chats', this.enteredRooms);
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
            this.enteredRooms[this.id] = this.pin;
            $cookies.set('previous-chats', this.enteredRooms);
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
  margin-top: 10%;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
button{
  width: 300px;
}
</style>