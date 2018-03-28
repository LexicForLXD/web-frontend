<template>
  <div class="row">
    <div class="col-md-8 col-md-offset-2">
      <div class="panel panel-default">
        <div class="panel-heading">
          <h3 class="panel-heading"> Login </h3>
        </div>
        <div class="panel-body">
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon ">
                <i class="fa fa-envelope"></i> Email</span>
              <input v-model="email" type="email" name="email" class="form-control" placeholder="Email Adresse" required>
            </div>
          </div>
          <div class="form-group">
            <div class="input-group">
              <span class="input-group-addon">
                <i class="fa fa-lock"></i> Password</span>
              <input type="password" name="password" class="form-control" placeholder="Passwort" required v-model="password">
            </div>
          </div>
          <div class="form-group">
            <button class="button" @click="login">Login</button>
          </div>
          <router-link to="/forget-password">Password vergessen?</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import authApi from '../api/auth/auth'

export default {
  data() {
    return {
      email: '',
      password: ''
    }
  },


  methods: {
    login() {
      var data = {
        email: this.email,
        password: this.password
      }
      authApi.login(data)
        .then(res => {
          const expiration = (res.data.expires_in * 1000) + Date.now();
          localStorage.setItem('access_token', res.data.access_token)
          localStorage.setItem('expiration', expiration)
          this.$store.dispatch('initShared');

          this.$router.push("/")
            location.reload();

        })

        .catch((error) => console.log(error));

    }
  }
}
</script>

<style>

</style>
