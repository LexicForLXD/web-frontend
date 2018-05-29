<template>
    <v-card class="elevation-12">
        <v-toolbar>
            <v-toolbar-title>
                Login
            </v-toolbar-title>
        </v-toolbar>

        <v-card-text>
            <v-form v-model="valid">
                <v-text-field
                        label="Email or username"
                        v-model="email"
                        :rules="[v => !!v || 'Email or username is required']"
                        required
                />

                <v-text-field
                        label="Password"
                        v-model="password"
                        :type="e1 ? 'password' : 'text'"
                        :append-icon="e1 ? 'visibility' : 'visibility_off'"
                        :append-icon-cb="() => (e1 = !e1)"
                        :rules="[v => !!v || 'Password is required']"
                        required
                ></v-text-field>

                <v-btn
                        @click="submit"
                        :disabled="!valid"
                >
                    Submit
                </v-btn>

            </v-form>
        </v-card-text>

        <div
                v-if="error.length > 0"
                class="message is-danger">
            <div class="message-body">
                {{ error }}
            </div>
        </div>

    </v-card>

</template>

<script>
    import authApi from '../api/auth/auth'

    export default {
        data() {
            return {
                email: '',
                password: '',
                error: "",
                valid: false,
                e1: true
            }
        },


        methods: {
            submit() {
                const data = {
                    email: this.email,
                    password: this.password
                };
                this.$store.commit("LOADING_BEGIN");
                authApi.login(data)
                    .then(res => {
                        this.error = "";
                        localStorage.setItem('access_token', res.data.access_token);
                        localStorage.setItem('expiration', (res.data.expires_in) + (Date.now() / 1000));
                        localStorage.setItem('refresh_token', res.data.refresh_token);
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
