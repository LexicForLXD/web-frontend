<template>
    <div>
        <v-alert v-model="showHint" type="info" :dismissible="true">
            sftp is prefered over scp. See duplicity documentation.
        </v-alert>
        <v-form v-model="valid" @submit="onSubmit">
            <v-text-field 
              label="Name" 
              v-model="name" 
              :rules="[v => !!v || 'Name is required']" 
              required 
              :error-messages="error.name" 
              @input="error.name = []"
              />

            <v-text-field 
              label="Protocol" 
              v-model="protocol" 
              :rules="[v => !!v || 'Protocol is required']" 
              required 
              :error-messages="error.protocol" 
              persistent-hint hint="What protocol should be used for backup? See duplicity manual for all options." 
              @input="error.protocol = []"
              />

            <v-text-field 
              label="Path" v-model="path" 
              :rules="[v => !!v || 'Path is required']" 
              required 
              :error-messages="error.path" 
              persistent-hint 
              hint="Where should be the backups stored? The folder must exist. Preferable absolute path." 
              @input="error.path = []"
              />

            <v-text-field 
              label="Hostname" 
              v-model="hostname" 
              :error-messages="error.hostname" 
              persistent-hint 
              hint="Hostname if you use a remote host. Depends on choosen protocol." 
              @input="error.hostname = []"
              />

            <v-text-field 
              label="username" 
              v-model="username" 
              :error-messages="error.username" 
              persistent-hint hint="Username if you use a remote host. Depends on choosen protocol." 
              @input="error.username = []"
              />

            <v-text-field 
              label="Password" 
              v-model="password" 
              :type="e1 ? 'password' : 'text'" 
              :append-icon="e1 ? 'visibility' : 'visibility_off'" 
              :append-icon-cb="() => (e1 = !e1)" 
              persistent-hint 
              hint="Password if you use a remote host. Depends on choosen protocol." 
              />

            <v-btn @click="onSubmit" :disabled="!valid">
                Submit
            </v-btn>
        </v-form>

        <v-alert :value="error.general" type="error">
            {{ error }}
        </v-alert>
        <ssh-pub title="destination" message="This should be used if you want to use scp or sftp." />
    </div>
</template>

<script>
import SshPub from "../ssh/PubSSH";

export default {
  computed: {
    showHint: {
      get: function() {
        if (this.$cookies.isKey("scp-hint")) {
          return this.$cookies.get("scp-hint") !== "false";
        }
        return true;
      },

      set: function(newVal) {
        this.$cookies.set("scp-hint", false, "1m");
      }
    }
  },

  components: {
    SshPub
  },

  data() {
    return {
      valid: false,
      e1: true,

      name: "",
      protocol: "",
      path: "",
      hostname: "",
      username: "",
      password: "",

      error: ""
    };
  },

  methods: {
    onSubmit() {
      let body = {
        name: this.name,
        protocol: this.protocol,
        path: this.path,
        hostname: this.hostname,
        username: this.username,
        password: this.password
      };

      Object.keys(body).forEach(
        key =>
          (body[key] === null ||
            body[key] === undefined ||
            body[key].length) === 0 && delete body[key]
      );

      this.$store
        .dispatch("createBackupDestination", body)
        .then(() => {
          this.$router.push({ name: "destinationOverview" });
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
