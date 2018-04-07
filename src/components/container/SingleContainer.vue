<template>
  <div>
    <div v-if="!editing">
      <div
        v-if="container"
        class="card">
        <header class="card-header">
          <div class="card-header-title">
            Name: {{ container.name }}
          </div>
        </header>
        <div class="card-content">
          <p v-if="container.architecture">Architecture: {{ container.architecture }}</p>
          <p v-if="container.config">Config: {{ container.config }}</p>
          <p v-if="container.devices">Devices: {{ container.devices }}</p>
          <p v-if="container.state">State: {{ container.state }}</p>
          <p>
            Host:
            <router-link :to="{name: 'hostSingle', params: {index: hostIndex}}">{{ host.name }}
            </router-link>
          </p>

          <a
            :disabled="container.state !== 'stopped'"
            href="#"
            class="button"
            @click="onStart">Start</a>
          <a
            :disabled="container.state === 'stopped'"
            href="#"
            class="button"
            @click="onRestart">Restart</a>
          <a
            :disabled="container.state === 'stopped'"
            href="#"
            class="button"
            @click="onStop">Stop</a>
        </div>
        <footer class="card-footer">
          <a
            href="#"
            class="card-footer-item"
            @click="onEdit">Edit</a>
          <a
            href="#"
            class="card-footer-item"
            @click="onDelete">Delete</a>
          <router-link
            :to="{name: 'containerLogs'}"
            class="card-footer-item">Logs
          </router-link>
        </footer>
      </div>
    </div>
    <div v-if="editing">
      <label class="label">Name</label>
      <input
        class="input"
        type="text"
        v-model="editName">

      <label class="label">DomainName</label>
      <input
        class="input"
        type="text"
        v-model="editDomainName">

      <label class="label">ipv4</label>
      <input
        class="input"
        type="text"
        v-model="editIpv4">

      <label class="label">ipv6</label>
      <input
        class="input"
        type="text"
        v-model="editIpv6">

      <label class="label">Port</label>
      <input
        v-model="editPort"
        class="input"
        type="number"
      >

      <button
        class="button"
        @click="onUpdate">Save
      </button>
      <button
        class="button"
        @click="onCancel">Abort
      </button>
    </div>
  </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import stateApi from "../../api/containers/containerState";

    export default {
        data() {
            return {
                editing: false,
                editIpv4: "",
                editIpv6: "",
                editDomainName: "",
                editName: "",
                editPort: "",
                // editSettings: "",
                // editMac: "",
                index: this.$route.params.index
                // hostIndex: "",
            };
        },

        computed: {
            ...mapGetters({
                containers: "getContainers"
            }),
            host() {
                return this.$store.getters.getHostById(this.container.hostId);
            },

            hostIndex() {
                return this.$store.getters.getHostIndexById(this.container.hostId);
            },

            container() {
                return this.containers[this.index];
            }
        },

        methods: {
            onDelete() {
                this.$store.dispatch("deleteContainer", this.container.id);
                this.$router.push({name: "containerOverview"});
            },
            onEdit() {
                this.editIpv4 = this.containers.ipv4;
                this.editIpv6 = this.containers.ipv6;
                this.editDomainName = this.containers.domainName;
                this.editName = this.containers.name;
                this.editPort = this.containers.port;
                this.editing = true;
            },
            onCancel() {
                this.editing = false;
            },
            onUpdate() {
                this.$store.dispatch("updateImage", {
                    host_id: this.containers[this.index].id,
                    host: {
                        name: this.editName,
                        ipv4: this.editIpv4,
                        ipv6: this.editIpv6,
                        domainName: this.editDomainName,
                        port: this.editPort
                    }
                });
                this.editing = false;
            },

            onStart() {
                stateApi.change(this.container.id, {action: "start"});
            },

            onRestart() {
                stateApi.change(this.container.id, {action: "restart"});
            },

            onStop() {
                stateApi.change(this.container.id, {action: "stop"});
            }
        }
    };
</script>

<style>

</style>