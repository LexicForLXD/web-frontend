<template>
    <div>
        <v-form v-model="valid" @submit="onSubmit">
            <v-text-field
                    label="First name"
                    v-model="firstName"
                    :rules="[v => !!v || 'First name is required']"
                    required
                    :error-messages="error.firstName"
                    @input="error.firstName = []"
            />
            <v-text-field
                    label="Last name"
                    v-model="lastName"
                    :rules="[v => !!v || 'Last name is required']"
                    required
                    :error-messages="error.lastName"
                    @input="error.lastName = []"
            />
            <v-text-field
                    label="Username"
                    v-model="username"
                    :rules="[v => !!v || 'Username is required']"
                    required
                    :error-messages="error.username"
                    @input="error.username = []"
            />
            <v-text-field
                    label="Email"
                    v-model="email"
                    :rules="[v => !!v || 'Email name is required']"
                    required
                    type="email"
                    :error-messages="error.email"
                    @input="error.email = []"
            />
            <v-text-field
                    label="Password"
                    v-model="password"
                    :type="e1 ? 'password' : 'text'"
                    :append-icon="e1 ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (e1 = !e1)"
                    :error-messages="error.password"
                    @input="error.password = []"
            />

            <v-btn
                    @click="onSubmit"
                    :disabled="!valid"
            >
                Submit
            </v-btn>
        </v-form>

        
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      userErrors: "getUserErrors"
    })
  },

  data() {
    return {
      valid: false,
      e1: true,
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      error: ""
    };
  },

  methods: {
    onSubmit() {
      let body = {
        firstName: this.firstName,
        lastName: this.lastName,
        username: this.username,
        email: this.email,
        password: this.password
      };

      Object.keys(body).forEach(
        key =>
          (body[key] === null ||
            body[key] === undefined ||
            body[key].length) === 0 && delete body[key]
      );

      this.$store
        .dispatch("createUser", body)
        .then(() => {
          this.$router.push({ name: "userOverview" });
        })
        .catch(error => {
          this.error = error.response.data.error.message;
        });
    }
  }
};
</script>

<style>
</style>
