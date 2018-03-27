<template>
  <div class="right" v-show="isAuthenticated">
    Hallo {{firstName}}
    <button class="button is-small" @click="logout">
    Logout</button>
  </div>

</template>

<script>
export default {
  name: 'header-user',

  computed: {
    firstName() {
      return this.$store.state.user.currentUser.first_name;
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
