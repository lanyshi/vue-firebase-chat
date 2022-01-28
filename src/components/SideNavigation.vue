<template>
  <ul class="nav flex-column nav-pills">
    <li class="nav-item">
      <a :class="['nav-link', {active: mode.includes('public')}]" role="button" data-toggle="collapse" data-target="#public-chats-collapse">
        <div class="row align-items-center">
          <BootstrapIcon class="col-md-auto px-0" icon="chat"/>
          <div class="col">Public Chat</div>
        </div>
      </a>
      <ul :class="['nav', 'flex-column', 'collapse', {show: mode.includes('public')}]" id="public-chats-collapse">
        <li class="nav-item">
          <a :class="['nav-link', 'text-secondary', {'sub-active': mode == 'public-1'}]" @click="go('/public-chat/1')">Channel 1</a>
          <a :class="['nav-link', 'text-secondary', {'sub-active': mode == 'public-2'}]" @click="go('/public-chat/2')">Channel 2</a>
        </li>
      </ul>
    </li>
    <li class="nav-item">
      <a :class="['nav-link', {active: !mode.includes('public')}]" role="button" data-toggle="collapse" data-target="#private-chats-collapse">
        <div class="row align-items-center">
          <BootstrapIcon class="col-md-auto px-0" icon="lock"/>
          <div class="col">Private Chat</div>
        </div>
      </a>
      <ul :class="['nav', 'flex-column', 'collapse', {show: !mode.includes('public')}]" id="private-chats-collapse">
        <li class="nav-item">
          <a :class="['nav-link', 'text-secondary', {'sub-active': mode == 'private-enter'}]" @click="go('/enter/private-chat')">
            <div class="row align-items-center">
              <BootstrapIcon class="col-md-auto px-0" icon="box-arrow-in-right"/>
              <div class="col">Enter a private chat room</div>
            </div>
          </a>
          <a :class="['nav-link', 'text-secondary', {'sub-active': mode == 'private-create'}]" @click="go('/create/private-chat')">
            <div class="row align-items-center">
              <BootstrapIcon class="col-md-auto px-0" icon="plus-circle"/>
              <div class="col">Create a private chat room</div>
            </div>
          </a>
          <div v-if="Object.keys(enteredRooms).length" class="dropdown-divider"></div>
          <div v-if="mode != 'unlocked'">
            <router-link :class="['nav-link', 'text-secondary', {'sub-active': mode == 'unlocked-'+_id}]" v-for="(_pin, _id) in enteredRooms" :key="_id" :to="{path: `/private-chat/${_id}`}" @click.native="$router.go()">{{ _id }}</router-link>
          </div>
        </li>
      </ul>
    </li>
    <li class="nav-item">
      <a class="nav-link text-danger" role="button" @click="logout">
        <div class="row align-items-center">
          <BootstrapIcon class="col-md-auto px-0" icon="box-arrow-left"/>
          <div class="col">Log Out</div>
        </div>
      </a>
    </li>
  </ul>
</template>

<script>
export default {
  name: "SideNavigation",
  props: ["mode"],
  data() {
    console.log(this.channel == 2)
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
    }
  }
}
</script>
<style scoped>
a{
  cursor: pointer;
}
ul li ul li a{
  font-size: 0.9rem;
  margin: 0.5em 0;
}
.sub-active{
  background-color: #f8f9fa;
  border-radius: 0;
}
</style>