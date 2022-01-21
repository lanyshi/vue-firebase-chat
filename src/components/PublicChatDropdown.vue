<template>
  <li class="nav-item dropdown">
    <a
      class="nav-link dropdown-toggle"
      data-toggle="dropdown"
      role="button"
      aria-haspopup="true"
      aria-expanded="false">Public Chat</a>
    <div class="dropdown-menu">
      <router-link class="dropdown-item" to="/chat/1">Channel 1</router-link>
      <router-link class="dropdown-item" to="/chat/2">Channel 2</router-link>
    </div>
  </li>
</template>
<script>
export default {
  name: "PublicChatDropdown"
}
</script>