<template>
    <div>
        <v-form v-model="valid" @submit="onSubmit">
            <v-text-field
                    label="Name"
                    v-model="name"
                    :rules="[v => !!v || 'Name is required']"
                    required
                    :error-messages="error.name"
                    @input="error.name = []"
            />

            <v-select
                    :items="hosts"
                    v-model="selectedHost"
                    label="Host"
                    required
                    item-value="id"
                    item-text="name"
                    :rules="[v => !!v || 'Host is required']"
                    :error-messages="error.hosts"
                    @input="error.hosts = []"
            />

            <v-select
                    :items="storagePools"
                    v-model="selectedStoragePool"
                    label="Storage Pool"
                    required
                    item-value="id"
                    item-text="name"
                    persistent-hint
                    hint="You could save your container to different storage pools. This will result in different places where your container will be saved."
                    :rules="[v => !!v || 'Storage pool is required']"
                    :error-messages="error.storagePools"
                    @input="error.storagePools = []"
            />

            <v-select
                    :items="profiles"
                    v-model="selectedProfiles"
                    label="Profiles"
                    item-value="id"
                    item-text="name"
                    multiple
                    persistent-hint
                    hint="Profiles will alter the default configuration."
                    :error-messages="error.profiles"
                    @input="error.profiles = []"
            />

            <v-textarea
                    label="Config"
                    v-model="config"
                    multi-line
                    placeholder='{"limits.cpu": "2"}'
                    :error-messages="error.config"
                    @input="error.config = []"
                    persistent-hint
                    hint="You can input your own config."
            />

            <v-textarea
                    label="Devices"
                    v-model="devices"
                    multi-line
                    :error-messages="error.devices"
                    @input="error.devices = []"
                    persistent-hint
                    hint="You can input your own devices. Please don't include the storage device."
            />

            <v-checkbox
                    label="Ephemeral"
                    v-model="ephemeral"
                    persistent-hint
                    hint="A ephemeral container will be completely deleted after you stop the container."
            />

            <v-select
                    :items="sourceTypes"
                    v-model="selectedType"
                    label="Source Type"
                    required
                    :rules="[v => !!v || 'Source type is required']"
                    :error-messages="containerErrors.sourceType"
                    persistent-hint
                    hint="From which source do you want to init your container?"
            />

            <div v-if="selectedType === 'image'">
                <v-layout row>
                    <v-flex xs12 sm5>
                        <v-select
                                :items="images"
                                v-model="selectedFingerprint"
                                label="Fingerprint"
                                item-value="fingerprint"
                                item-text="fingerprint"
                                :error-messages="error.fingerprint"
                                @input="error.fingerprint = []"
                                clearable
                                persistent-hint
                                hint="You can select an fingerprint of an existing image OR"
                                no-data-text="Make sure you have selected the correct host."
                        />
                        <!--:rules="[-->
                        <!--v => this.selectedAlias === '' && !!v || 'One of alias or fingerprint',-->
                        <!--v => this.selectedAlias === '' || 'Either alias or fingerprint',-->
                        <!--]"-->
                    </v-flex>

                    <v-flex xs12 sm2>
                        OR
                    </v-flex>
                    <v-flex xs12 sm5>
                        <v-select
                                :items="imageAliases"
                                v-model="selectedAlias"
                                label="Alias"
                                item-value="aliases[0].name"
                                item-text="aliases[0].name"
                                :error-messages="error.alias"
                                @input="error.alias = []"
                                clearable
                                persistent-hint
                                hint="you can select the alias of an existing image."
                                no-data-text="Make sure you have selected the correct host."
                        />
                        <!--:rules="[-->
                        <!--v => this.selectedFingerprint === '' && !!v || 'One of alias or fingerprint',-->
                        <!--v => this.selectedFingerprint === '' || 'Either alias or fingerprint',-->
                        <!--]"-->
                    </v-flex>
                </v-layout>

            </div>

            <div v-if="selectedType === 'copy' || selectedType === 'migration'">
                <v-select
                        :items="containers"
                        v-model="selectedContainer"
                        label="Containers"
                        item-value="id"
                        item-text="name"
                        required
                        persistent-hint
                        :error-messages="error.containers"
                        @input="error.containers = []"
                        hint="The container you want to copy or migrate."
                />

                <v-checkbox
                        label="Container only"
                        v-model="containerOnly"
                        persistent-hint
                        hint="Container only will ditch all other things like snapshots."
                />


                <div v-if="selectedType === 'migration'">
                    <v-checkbox
                            label="Live"
                            v-model="live"
                            persistent-hint
                            hint="Live migration will reduce the downtime to a minimum."
                    />
                </div>
            </div>


            <v-btn
                    @click="onSubmit"
                    :disabled="!valid"
            >
                Submit
            </v-btn>

        </v-form>

        <p>
            If you get redirected to the container overview, the server accepted your request. Please have a look on the running jobs.
        </p>

        <v-alert :value="error" type="error">
            {{ error }}
        </v-alert>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import storageApi from "../../api/storage/storage.js";

export default {
  computed: {
    ...mapGetters({
      hosts: "getHosts",
      containers: "getContainers",
      profiles: "getProfiles",
      containerErrors: "getContainerErrors"
    }),
    images() {
      return this.$store.getters.getImagesForHost(this.selectedHost);
    },

    imageAliases() {
      return this.$store.getters.getImagesWithAliasesForHost(this.selectedHost);
    }
  },

  watch: {
    selectedHost: function(val) {
      storageApi
        .fetchFromHost(this.selectedHost)
        .then(res => {
          this.storagePools = res.data;
        })
        .catch(err => {
          this.storagePools = [];
        });
    }
  },

  data() {
    return {
      // bool
      fingerprintBool: false,
      aliasBool: false,
      selectedType: "",
      valid: false,

      sourceTypes: ["none", "image", "copy", "migration"],

      nameRules: [v => !!v || "Name is required"],

      imageRules: [() => !!this.selectedHost || "Please select a host"],

      //data
      selectedProfiles: [],
      selectedHost: "",
      selectedStoragePool: "",
      selectedFingerprint: "",
      selectedAlias: "",
      selectedContainer: "",
      containerOnly: true,
      live: false,
      ephemeral: false,
      name: "",
      config: "",
      devices:
        "{\n" +
        '   "root": {\n' +
        '       "path": "/",\n' +
        '       "type": "disk",\n' +
        '       "pool": "default"\n' +
        "    } \n" +
        "}",
      architecture: "",
      error: "",
      storagePools: []
    };
  },

  methods: {
    onSubmit() {
      let bodyConfig = "";
      let bodyDevices = "";

      try {
        bodyConfig = JSON.parse(this.config);
      } catch (err) {
        bodyConfig = "";
      }

      try {
        bodyDevices = JSON.parse(this.devices);
      } catch (err) {
        bodyDevices = "";
      }

      let data = {
        container: {},
        hostId: this.selectedHost,
        type: this.selectedType
      };

      if (this.selectedType === "none") {
        data.container = {
          name: this.name,
          architecture: this.architecture,
          ephemeral: this.ephemeral,
          config: bodyConfig,
          devices: bodyDevices,
          profiles: this.selectedProfiles,
          storagePoolId: this.selectedStoragePool
        };
      } else if (this.selectedType === "image") {
        if (this.selectedFingerprint !== "") {
          data.container = {
            name: this.name,
            architecture: this.architecture,
            ephemeral: this.ephemeral,
            config: bodyConfig,
            devices: bodyDevices,
            profiles: this.selectedProfiles,
            fingerprint: this.selectedFingerprint,
            storagePoolId: this.selectedStoragePool
          };
        }
        if (this.selectedAlias !== "") {
          data.container = {
            name: this.name,
            architecture: this.architecture,
            ephemeral: this.ephemeral,
            config: bodyConfig,
            devices: bodyDevices,
            profiles: this.selectedProfiles,
            alias: this.selectedAlias,
            storagePoolId: this.selectedStoragePool
          };
        }
      } else if (this.selectedType === "copy") {
        data.container = {
          name: this.name,
          architecture: this.architecture,
          ephemeral: this.ephemeral,
          config: bodyConfig,
          devices: bodyDevices,
          profiles: this.selectedProfiles,
          oldContainerId: this.selectedContainer,
          containerOnly: this.containerOnly,
          storagePoolId: this.selectedStoragePool
        };
      } else if (this.selectedType === "migration") {
        data.container = {
          name: this.name,
          architecture: this.architecture,
          ephemeral: this.ephemeral,
          config: bodyConfig,
          devices: bodyDevices,
          profiles: this.selectedProfiles,
          oldContainerId: this.selectedContainer,
          containerOnly: this.containerOnly,
          live: this.live,
          storagePoolId: this.selectedStoragePool
        };
      }

      Object.keys(data.container).forEach(
        key =>
          (data.container[key] === null ||
            data.container[key] === undefined ||
            data.container[key].length) === 0 && delete data.container[key]
      );

      this.$store
        .dispatch("createContainer", data)
        .then(() => {
          this.$router.push({ name: "containerOverview" });
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
