<template>
  <div class="card text-left">
    <div class="list-group list-group-flush">
      <a class="list-group-item list-group-item-action dropdown-toggle" data-toggle="collapse" data-target="#public-chats-collapse" role="button" aria-expanded="false"><BootstrapIcon class="mr-2" icon="chat"/>Public Chat</a>
      <ul class="nav flex-column collapse" id="public-chats-collapse">
        <li class="nav-item">
          <a class="nav-link text-secondary" @click="go('/chat/1')">Channel 1</a>
          <a class="nav-link text-secondary border-bottom" @click="go('/chat/2')">Channel 2</a>
        </li>
      </ul>
      <a class="list-group-item list-group-item-action dropdown-toggle" data-toggle="collapse" data-target="#private-chats-collapse" role="button" aria-expanded="false"><BootstrapIcon class="mr-2" icon="lock"/>Private Chat</a>
      <ul class="nav flex-column collapse" id="private-chats-collapse">
        <li class="nav-item">
          <router-link class="nav-link text-secondary" to="/enter/private-chat" @click.native="$router.go()">Enter a private chat room</router-link>
          <div class="past-rooms border-bottom" v-chat-scroll="{always: false, smooth: true}">
            <router-link class="nav-link text-secondary" v-for="(_pin, _id) in enteredRooms" :key="_id" :to="{path: `/private-chat/${_id}`}" @click.native="$router.go()"><BootstrapIcon class="mr-2" icon="unlock"/>{{ _id }}</router-link>
          </div>
          <router-link class="nav-link text-secondary border-bottom" to="/create/private-chat" @click.native="$router.go()">Create a private chat room</router-link>
        </li>
      </ul>
      <a class="list-group-item list-group-item-action text-danger" role="button" @click="logout"><BootstrapIcon class="mr-2" icon="box-arrow-left"/>Log Out</a>
    </div>
  </div>
</template>

<script>
export default {
  name: "SideNavigation",
  data() {
    return {
      enteredRooms: {}
    }
  },
  created() {
    if ($cookies.get('previous-chats')) {
      this.enteredRooms = $cookies.get('previous-chats');
    }
  },
  methods: {
    logout() {
      this.$router.push({name: 'Login'});
      $cookies.remove('previous-chats');
    }
  }
}
</script>
<style scoped>
.dropdown-item{
  white-space: inherit !important;
  color: #495057;
}
.dropdown-item:hover{
  cursor: pointer;
}
.list-group-item{
  color: #007bff
}
.nav-link:hover{
  background-color: #f8f9fa;
}
a{
  white-space: inherit;
}
.past-rooms{
  max-height: 100px;
  overflow: auto;
}
[class~="nav-link"]{
  font-size: 0.93rem;
  cursor: pointer;
}
</style>