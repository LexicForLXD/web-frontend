<template>
  <div class="loginform">
    <div class="card">
      <header class="card-header">
        <div class="card-header-title">
          <h3> Login </h3>
        </div>
      </header>
      <div class="card-content">
        <form 
          @submit="login"
          @submit.prevent>
          <div class="field">
            <label class="label">Username</label>
            <div class="control">
              <input
                class="input"
                type="text"
                v-model="email"
                required>
            </div>
          </div>

          <div class="field">
            <label class="label">Password</label>
            <div class="control">
              <input
                class="input"
                type="password"
                v-model="password"
                required>
            </div>
          </div>

          <div
            v-if="error.length > 0"
            class="message is-danger">
            <div class="message-body">
              {{ error }}
            </div>
          </div>

          <div>
            <button
              type="submit"
              class="button is-success"
              @click="login">Login</button>
          </div>
        </form>

      </div>


      <!--<router-link to="/forget-password">Password vergessen?</router-link>-->

    </div>
  </div>
</template>

<script>
    import authApi from '../api/auth/auth'

    export default {
        data() {
            return {
                email: '',
                password: '',
                error: "",
            }
        },


        methods: {
            login() {
                const data = {
                    email: this.email,
                    password: this.password
                };
                this.$store.commit("LOADING_BEGIN");
                authApi.login(data)
                    .then(res => {
                        this.error = "";
                        const expiration = (res.data.expires_in * 1000) + Date.now();
                        localStorage.setItem('access_token', res.data.access_token);
                        localStorage.setItem('expiration', expiration);
                        this.$store.dispatch('initShared');
                        this.$store.commit("LOADING_FINISH");
                        this.$router.push("/")
                    })

                    .catch((error) => {
                        if (error.response.data.error_description) {
                            this.error = error.response.data.error_description;
                        }
                        this.$store.commit("LOADING_FAIL");
                    });

            }
        }
    }
</script>

<style scoped>

    .loginform {
        padding: 20px;
    }

</style>
