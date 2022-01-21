<template>
  <li class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle"
      data-toggle="dropdown"
      role="button"
      aria-haspopup="true"
      aria-expanded="false"><BootstrapIcon class="mr-1" icon="lock"/>Private Chat</a>
    <div class="dropdown-menu">
      <router-link class="dropdown-item" to="/enter/private-chat">Enter Private Chat</router-link>
      <div class="dropdown-divider"></div>
      <router-link class="dropdown-item" to="/create/private-chat">Create Private Chat</router-link>
    </div>
  </li>
</template>
<script>
export default {
  name: "PrivateChatDropdown"
}
</script>