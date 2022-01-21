<template>
  <li class="form-inline ml-auto">
    <button type="button" class="btn btn-sm btn-secondary my-2 my-sm-0" v-on:click="logout">Log Out</button>
  </li>
</template>

<script>
export default {
  name: "Logout",
  methods: {
    logout() {
      this.$router.push({name: 'Login'});
      $cookies.remove('previous-chats');
    }
  }
}
</script>
