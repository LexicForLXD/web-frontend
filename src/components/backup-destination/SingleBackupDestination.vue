<template>
    <div>
        <v-card v-if="backupDest">
            <v-toolbar>
                <v-toolbar-title>
                    Name: {{backupDest.name}}
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text v-if="!editing">
                <p v-if="backupDest.protocol">
                    <b>Protocol:</b> {{backupDest.protocol}}</p>
                <p v-if="backupDest.path">
                    <b>Path:</b> {{backupDest.path}}</p>
                <p v-if="backupDest.hostname">
                    <b>Hostname:</b> {{backupDest.hostname}}</p>
                <p v-if="backupDest.username">
                    <b>Username:</b> {{backupDest.username}}</p>
            </v-card-text>
            <v-card-text v-else>
                <v-form v-model="valid">
                    <v-text-field label="Name" v-model="editName" :rules="[v => !!v || 'Name is required']" required />

                    <v-text-field label="Protocol" v-model="editProtocol" :rules="[v => !!v || 'Protocol is required']" required />

                    <v-text-field label="Path" v-model="editPath" :rules="[v => !!v || 'Path is required']" required />

                    <v-text-field label="Hostname" v-model="editHostname" />

                    <v-text-field label="username" v-model="editUsername" />

                    <v-text-field label="Password" v-model="editPassword" :type="e1 ? 'password' : 'text'" :append-icon="e1 ? 'visibility' : 'visibility_off'" :append-icon-cb="() => (e1 = !e1)" />

                    <v-btn @click="onUpdate" :disabled="!valid">
                        Submit
                    </v-btn>
                </v-form>
                <v-alert :value="error" type="error">
                    {{ error }}
                </v-alert>

            </v-card-text>

            <v-card-actions v-if="!editing">
                <v-btn flat @click="onEdit">Edit</v-btn>
                <v-btn flat @click="onDelete">Delete</v-btn>
            </v-card-actions>

            <v-card-actions v-else>
                <v-btn flat @click="onCancel">Abort</v-btn>
            </v-card-actions>

        </v-card>
        <ssh-pub title="destination" message="This should be used if you want to use scp or sftp." />
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import SshPub from "../ssh/PubSSH";

export default {
  computed: {
    ...mapGetters({
      backupDests: "getBackupDestinations",
      backupDestErrors: "getBackupDestinationErrors"
    }),

    backupDest() {
      return this.backupDests[this.index];
    }
  },
  components: {
    SshPub
  },
  data() {
    return {
      valid: false,
      e1: true,
      editing: false,
      editName: "",
      editProtocol: "",
      editPath: "",
      editHostname: "",
      editUsername: "",
      editPassword: "",

      index: this.$route.params.index,

      error: ""
    };
  },
  methods: {
    onDelete() {
      this.$store.dispatch("deleteBackupDestination", this.backupDest.id);
      this.$router.push({ name: "destinationOverview" });
    },
    onEdit() {
      this.editName = this.backupDest.name;
      this.editProtocol = this.backupDest.protocol;
      this.editPath = this.backupDest.path;
      this.editHostname = this.backupDest.hostname;
      this.editUsername = this.backupDest.username;
      this.editPassword = this.backupDest.password;
      this.editing = true;
    },
    onCancel() {
      this.editing = false;
    },
    onUpdate() {
      this.$store
        .dispatch("updateBackupDestination", {
          backupDestination_id: this.backupDest.id,
          backupDestination: {
            name: this.editName,
            protocol: this.editProtocol,
            path: this.editPath,
            hostname: this.editHostname,
            username: this.editUsername,
            password: this.editPassword
          }
        })
        .then(() => {
          this.editing = false;
          this.error = "";
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