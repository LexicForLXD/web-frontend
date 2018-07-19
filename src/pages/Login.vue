<template>
    <v-card class="elevation-12">
        <v-toolbar>
            <v-toolbar-title>
                Login
            </v-toolbar-title>
        </v-toolbar>

        <v-card-text>
            <v-form v-model="valid" @submit="submit">
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
                    type="submit"
                        @click="submit"
                        :disabled="!valid"
                >
                    Submit
                </v-btn>

            </v-form>
            <v-alert :value="error" type="error">
                {{ error }}
            </v-alert>
            <v-alert :value="message" type="success">
                {{ message }}
            </v-alert>
        </v-card-text>
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
                message: "",
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
                        this.message = "Login successful. Loading Application.";
                        localStorage.setItem('access_token', res.data.access_token);
                        localStorage.setItem('expiration', (res.data.expires_in) + (Date.now() / 1000));
                        localStorage.setItem('refresh_token', res.data.refresh_token);
                        this.$store.commit("LOADING_FINISH");
                        this.$store.dispatch('initShared').then(res => {
                            this.$router.push("/");
                        });


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


</style>
