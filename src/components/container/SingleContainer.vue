<template>
    <div>
                <v-card v-if="container" class="my-2">
                    <v-toolbar>
                        <v-toolbar-title>
                            Name: {{container.name}}
                        </v-toolbar-title>
                        <v-spacer></v-spacer>
                        <v-btn icon @click="refresh">
                          <v-icon>
                            refresh
                          </v-icon>
                        </v-btn>
                    </v-toolbar>

                    <v-card-text v-if="!editing && !editName">
                      <p v-if="container.state"><b>State:</b> {{container.state}}</p>
                      <v-btn :disabled="container.state !== 'stopped'" :loading="loadingStart" @click="onStart">Start</v-btn>
                        <v-btn :disabled="container.state === 'stopped'" :loading="loadingRestart" @click="onRestart">Restart</v-btn>
                        <v-btn :disabled="container.state === 'stopped'" :loading="loadingStop" @click="onStop">Stop</v-btn>


                        <p v-if="container.architecture" >
                          <b>Architecture:</b><br>
                          {{container.architecture}}
                        </p>
                        <p v-if="container.config">
                          <b>Config:</b><br>
                          <span class="long-text">{{container.config}}</span>
                        </p>
                        <p v-if="container.devices">
                          <b>Devices:</b><br>
                          <span class="long-text">{{container.devices}}</span>
                        </p>
                        <p v-if="container.expandedConfig">
                          <b>Expanded Config:</b><br>
                          <span class="long-text">{{container.expandedConfig}}</span>
                        </p>
                        <p v-if="container.expandedDevices">
                          <b>Expanded Devices:</b> <br>
                          <span class="long-text">{{container.expandedDevices}}</span>
                        </p>
                        <p v-if="container.network">
                          <b>Network:</b> <br>
                          <span class="long-text">{{container.network}}</span>
                        </p>
                        
                        <p>
                            <b>Host:</b>
                            <router-link :to="{name: 'hostSingle', params: {index: hostIndex}}">{{host.name}}
                            </router-link>
                        </p>
                        <p>
                            <b>StoragePool:</b>
                            {{container.storagePool.name}}
                        </p>

                        
                    </v-card-text>

                    <v-card-text v-if="editing">
                      <edit-container :container="container" @submitted="onCancel"></edit-container>
                    </v-card-text>

                    <v-card-text v-if="editName">
                      <edit-container-name :container="container" @submitted="onCancel"></edit-container-name>
                    </v-card-text>

                    <v-card-actions>
                        <v-btn flat @click="editing = !editing" v-if="!editing && !editName">Edit</v-btn>
                        <v-btn flat @click="onCancel" v-if="editing || editName">Cancel</v-btn>
                        <v-btn flat @click="onDelete" v-if="!editing && !editName">Delete</v-btn>
                        <v-btn flat @click="onChangeName" v-if="!editing && !editName">Change name</v-btn>
                        
                    </v-card-actions>

                </v-card>
                <v-bottom-sheet v-model="hasError">
                  <v-alert :value="true" type="error">
                            {{ error }}
                        </v-alert>
                </v-bottom-sheet>

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
                                <log-container v-if="container" :containerId="container.id"/>
                            </v-tab-item>

                            <v-tab-item key="nagios">
                                <nagios-container v-if="container" :containerId="container.id"/>
                            </v-tab-item>
                        </v-tabs>
                    </v-card-text>
                </v-card>
          </div>
</template>

<script>
import stateApi from "../../api/containers/containerState";
import LogContainer from "./logs/LogContainer";
import NagiosContainer from "./nagios/NagiosContainer";
import EditContainer from "./EditContainer";
import EditContainerName from "./EditContainerName";

export default {
  components: {
    LogContainer,
    NagiosContainer,
    EditContainer,
    EditContainerName
  },

  mounted: function() {
    this.refresh();
  },

  computed: {
    host() {
      return this.$store.getters.getHostById(this.container.hostId);
    },

    hostIndex() {
      return this.$store.getters.getHostIndexById(this.container.hostId);
    },

    container() {
      return this.$store.getters.getContainerByIndex(this.index);
    },
    hasError: {
      get: function() {
        if (this.error.length > 0) {
          return true;
        } else {
          return false;
        }
      },
      set: function(newValue) {
        this.error = "";
      }
    }
  },
  data() {
    return {
      name: "",
      editing: false,
      editName: false,
      index: this.$route.params.index,
      active: null,
      error: "",
      loadingStart: false,
      loadingRestart: false,
      loadingStop: false
    };
  },
  methods: {
    refresh() {
      this.$store.dispatch("refreshContainer", this.container.id);
      this.loadingStart = false;
      this.loadingStop = false;
      this.loadingRestart = false;
    },

    onDelete() {
      this.$store
        .dispatch("deleteContainer", this.container.id)
        .then(res => {
          this.$router.push({ name: "containerOverview" });
        })
        .catch(err => {
          this.error = err.response.data.error.message;
        });
    },
    onCancel() {
      this.editing = false;
      this.editName = false;
    },

    onChangeName() {
      this.editName = !this.editName;
    },

    onStart() {
      this.loadingStart = true;
      stateApi
        .change(this.container.id, { action: "start" })
        .then(() => {
          setTimeout(this.refresh(), 2000);
        })
        .catch(err => {
          this.error = err.response.data.error.message;
          this.loadingStart = false;
        });
    },

    onRestart() {
      this.loadingRestart = true;
      stateApi
        .change(this.container.id, { action: "restart" })
        .then(() => {
          setTimeout(this.refresh(), 2000);
        })
        .catch(err => {
          this.error = err.response.data.error.message;
          this.loadingRestart = false;
        });
    },

    onStop() {
      this.loadingStop = true;
      stateApi
        .change(this.container.id, { action: "stop" })
        .then(() => {
          setTimeout(this.refresh(), 2000);
        })
        .catch(err => {
          this.error = err.response.data.error.message;
          this.loadingStop = false;
        });
    }
  }
};
</script>

<style>
</style>