import Vue from 'vue';

Vue.mixin({
  methods: {
    go(path) {
      this.$router.push({path: path});
      window.location.reload();
    }
  }
})