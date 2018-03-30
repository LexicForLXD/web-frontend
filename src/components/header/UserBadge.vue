<template>
  <div class="navbar-end" v-show="isAuthenticated">
    <a class="navbar-item">
      Hallo {{firstName}}
    </a>

    <a class="navbar-item" @click="logout">
        Logout
    </a>

  </div>

</template>

<script>
export default {
  name: 'header-user',

  computed: {
    firstName() {
      return this.$store.state.user.currentUser.firstName;
    },
    isAuthenticated() {
      return this.$store.getters.isAuthenticated;
    }
  },

  methods: {
    logout() {
      this.$router.push('/login');
      location.reload();
      localStorage.removeItem('access_token');
      localStorage.removeItem('expiration');
    }
  }
}
</script>

<style scoped>
.right {
  float: right;
}
</style>
