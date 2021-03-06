<template>
    <div>
        <v-card v-if="host" class="my-2">
            <v-toolbar>
                <v-toolbar-title>
                    Name: {{host.name}}
                </v-toolbar-title>
            </v-toolbar>

            <v-card-text v-if="!editing">
                <p v-if="host.domainName">
                    <b>DomainName:</b> {{host.domainName}}</p>
                <p v-if="host.ipv4">
                    <b>ipv4:</b> {{host.ipv4}}</p>
                <p v-if="host.ipv6">
                    <b>ipv6:</b> {{host.ipv6}}</p>
                <p v-if="host.port">
                    <b>Port:</b> {{host.port}}</p>
                <div v-if="host.containerId">
                    <b>Containers:</b>
                    <v-list>
                        <v-list-tile v-for="container in containersForHost" :key="container.id">
                            <v-list-tile-content>
                                <router-link :to="{name: 'containerSingle', params: {index: getContainerIndex(container.id)}}">
                                    {{container.name}}
                                </router-link>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </div>
                <div v-if="host.storagePoolIds">
                    <b>Storage Pools:</b>
                    <v-list>
                        <v-list-tile v-for="storagePool in storagePools" :key="storagePool.id">
                            <v-list-tile-content>
                                <li>
                                    Name: {{storagePool.name}}, Driver: {{storagePool.driver}}
                                    <v-btn small icon color="red" @click="onDeleteStoragePool(storagePool.id)">
                                        <v-icon>delete</v-icon>
                                    </v-btn>
                                </li>
                            </v-list-tile-content>
                        </v-list-tile>
                    </v-list>
                </div>
            </v-card-text>

            <v-card-text v-if="editing">
                <v-form v-model="valid">
                    <v-text-field label="Name" v-model="editName" :rules="[v => !!v || 'Name is required']" required>
                    </v-text-field>
                    <v-text-field label="ipv4" v-model="editIpv4">
                    </v-text-field>
                    <v-text-field label="ipv6" v-model="editIpv6">
                    </v-text-field>
                    <v-text-field label="Domainname" v-model="editDomainName">
                    </v-text-field>
                    <v-text-field label="Port" v-model="editPort" :rules="[v => (v>=0 && v<=65555) || 'Port must be valid port number']"></v-text-field>

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
                <v-btn flat color="red" @click="onDelete">Delete</v-btn>
                <v-btn flat :to="{name: 'hostAuth', params: {index: index}}">Authenticate</v-btn>
                <v-btn flat :to="{name: 'hostNewStoragePool', params: {index: index}}">New Storage Pool</v-btn>
            </v-card-actions>
            <v-card-actions v-else>
                <v-btn flat @click="onCancel">Abort</v-btn>
            </v-card-actions>

        </v-card>

        <v-alert :value="error" type="error">
            {{ error }}
        </v-alert>

        <v-alert :value="message" type="success">
            {{ message }}
        </v-alert>

        <v-card class="my-2">
            <v-toolbar>
                <v-toolbar-title>
                    Monitoring
                </v-toolbar-title>
            </v-toolbar>
            <v-card-text>
                <v-tabs v-model="active" fixed-tabs grow>
                    <v-tab key="logs">Logs</v-tab>
                    <v-tab key="nagios">Nagios</v-tab>

                    <v-tab-item key="logs">
                        <log-host v-if="host" :hostId="host.id" />
                    </v-tab-item>

                    <v-tab-item key="nagios">
                        <!--<nagios-host v-if="host" :containerId="host.id"/>-->
                    </v-tab-item>
                </v-tabs>
            </v-card-text>
        </v-card>

        <ssh-pub title="lxc host" />
    </div>
</template>

<script>
import { mapGetters } from "vuex";

import SshPub from "../ssh/PubSSH";
import LogHost from "./LogHost";
import storageApi from "../../api/storage/storage.js";

export default {
  name: "SingleHost",

  components: {
    SshPub,
    LogHost
  },

  computed: {
    ...mapGetters({
      hosts: "getHosts"
    }),
    containersForHost() {
      return this.$store.getters.getContainersByIds(this.host.containerId);
    },

    host() {
      return this.hosts[this.index];
    }
  },

  mounted() {
    this.getStoragePools();
  },

  data() {
    return {
      valid: false,
      editing: false,
      editIpv4: "",
      editIpv6: "",
      editDomainName: "",
      editName: "",
      editPort: "",
      index: this.$route.params.index,
      active: null,
      error: "",
      message: "",
      storagePools: []
    };
  },
  methods: {
    onDelete() {
      this.$store
        .dispatch("deleteHost", this.hosts[this.index].id)
        .then(() => {
          this.$router.push({ name: "hostOverview" });
        })
        .catch(error => {
          this.error = error.response.data.error.message;
        });
    },
    onEdit() {
      this.editIpv4 = this.host.ipv4;
      this.editIpv6 = this.host.ipv6;
      this.editDomainName = this.host.domainName;
      this.editName = this.host.name;
      this.editPort = this.host.port;
      this.editing = true;
    },
    onCancel() {
      this.editing = false;
    },
    onUpdate() {
      this.$store
        .dispatch("updateHost", {
          host_id: this.host.id,
          host: {
            name: this.editName,
            ipv4: this.editIpv4,
            ipv6: this.editIpv6,
            domainName: this.editDomainName,
            port: this.editPort
          }
        })
        .then(() => {
          this.editing = false;
          this.error = "";
        })
        .catch(error => {
          this.error = error.response.data.error.message;
        });
    },
    getContainerIndex(id) {
      return this.$store.getters.getContainerIndexById(id);
    },
    getStoragePools() {
      this.$store.commit("LOADING_BEGIN");
      storageApi
        .fetchFromHost(this.host.id)
        .then(res => {
          this.$store.commit("LOADING_FINISH");
          this.storagePools = res.data;
        })
        .catch(err => {
          this.$store.commit("LOADING_FAIL");
        });
    },
    onDeleteStoragePool(id) {
      this.$store.commit("LOADING_BEGIN");
      storageApi
        .delete(id)
        .then(res => {
          this.error = "";
          this.$store.commit("LOADING_FINISH");
          this.getStoragePools();
        })
        .catch(err => {
          if (err.response.data) {
            this.error = err.response.data;
          }
          this.message = "";
          this.$store.commit("LOADING_FAIL");
        });
    }
  }
};
</script>

<style>
</style>