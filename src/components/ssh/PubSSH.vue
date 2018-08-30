<template>
    <div>
        <v-toolbar>
                        <v-toolbar-title>
        SSH Public Key
        </v-toolbar-title>
                    </v-toolbar>
        <v-card-text v-if="publicKey !== ''">
            <v-alert :value="true" type="info">
                    Please copy this public ssh key to the authorized_keys file on your {{title}}.
            </v-alert>
            {{ publicKey }}
        </v-card-text>
        <v-card-text v-else>
            Waiting for public key.
        </v-card-text>
        <v-alert :value="error" type="error">
                    {{ error }}
        </v-alert>
    </div>
</template>

<script>
import sshApi from "../../api/ssh/ssh.js";

export default {
  name: "SshPub",

  mounted() {
    this.getPubKey();
  },

  data() {
    return {
      publicKey: "",
      error: ""
    };
  },

  props: ["title"],

  methods: {
    getPubKey() {
      this.$store.commit("LOADING_BEGIN");
      sshApi
        .publicKey()
        .then(res => {
          this.$store.commit("LOADING_FINISH");
          this.publicKey = res.data.sshPubKey;
        })
        .catch(err => {
          this.$store.commit("LOADING_FAIL");
          this.error = err.response.data.error.message;
        });
    }
  }
};
</script>

<style>
</style>