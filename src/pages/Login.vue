<template>
    <div class="row">
        <div class="card">
            <header class="card-header">
                <div class="card-header-title">
                    <h3> Login </h3>
                </div>
            </header>
            <div class="card-content">
                <div class="field">
                    <label class="label">Username</label>
                    <input class="input" type="text" v-model="email">
                </div>

                <div class="field">
                    <label class="label">Password</label>
                    <input class="input" type="password" v-model="password">
                </div>

                <div>
                    <a href="#" class="button is-success" @click="login">Login</a>
                </div>

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
                        // location.reload();

                    })

                    .catch((error) => console.log(error));

            }
        }
    }
</script>

<style>

</style>
