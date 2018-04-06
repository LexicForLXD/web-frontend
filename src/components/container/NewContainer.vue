<template>
  <div class="form">
    <form
      @submit.prevent
    >
      <div class="field">
        <label class="label">Name</label>
        <div class="control">
          <input
            class="input"
            type="text"
            v-model="name"
            required>
        </div>
      </div>


      <div class="field">
        <label class="label">Host</label>
        <div class="control">
          <div
            class="select">
            <select
              name="host_select"
              v-model="selectedHost"
              required>
              <option
                value=""
                disabled>Select a host...
              </option>
              <option
                v-for="host in hosts"
                :key="host.id"
                :value="host.id">
                {{ host.name }}
              </option>
            </select>
          </div>
        </div>
      </div>


      <div class="field">
        <label class="label">Profiles</label>
        <div
          class="control"
          v-if="profiles.length > 0">
          <div class="select is-multiple">
            <select
              multiple
              name="profiles_select"
              v-model="selectedProfiles"
              :size="profiles.length">
              <option
                v-for="profile in profiles"
                :key="profile.id"
                :value="profile.id">
                {{ profile.name }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <div class="field">
        <label class="label">Config</label>
        <div class="control">
          <textarea
            class="textarea"
            v-model="config"
            placeholder="{&quot;limits.cpu&quot;: &quot;2&quot;}"/>
        </div>
      </div>

      <div class="field">
        <label class="label">Devices</label>
        <div class="control">
          <textarea
            class="textarea"
            v-model="devices"
            required/>
        </div>
      </div>

      <div class="field">
        <label
          class="label"
          for="ephemeral">Ephemeral</label>
        <div class="control">
          <input
            type="checkbox"
            id="ephemeral"
            v-model="ephemeral">
          <label for="ephemeral">Ephemeral</label>
        </div>
      </div>

      <div class="field">
        <label class="label">Source type</label>
        <div class="control">
          <div class="select">
            <select
              name="type_select"
              v-model="selectedType"
              required>
              <option
                value=""
                disabled>Select a type
              </option>
              <option value="migration">Migration</option>
              <option value="copy">Copy</option>
              <option value="image">Image</option>
              <option value="none">None</option>
            </select>
          </div>
        </div>
      </div>

      <div v-if="selectedType == 'image'">

        <div class="field">
          <label class="label">Fingerprint</label>
          <div
            class="control">
            <div class="select">
              <select
                name="fingerprint_select"
                v-model="selectedFingerprint"
                required>
                <option
                  value=""
                  disabled>Select a fingerprint
                </option>
                <option
                  v-for="image in images"
                  :key="image.id"
                  :value="image.fingerprint">
                  {{ image.fingerprint.substring(0,10) }}...
                </option>
              </select>
            </div>
          </div>
        </div>

        OR

        <div class="field">
          <label class="label">Alias</label>
          <div class="control">
            <div class="select">
              <select
                name="alias_select"
                v-model="selectedAlias"
                :value="{'-1' : selectedFingerprint !== '-1'}">
                <option
                  value="-1"
                  disabled>Select a alias
                </option>
                <option
                  v-for="image in imageAliases"
                  :key="image.aliases[0].id"
                  :value="image.aliases[0].name">
                  {{ image.aliases[0].name }}
                </option>
              </select>
            </div>
          </div>
        </div>

      </div>

      <div v-if="selectedType == 'copy' || selectedType == 'migration'">
        <div class="field">
          <label class="label">Containers</label>
          <div class="control">
            <div class="select">
              <select
                name="container_select"
                v-model="selectedContainer">
                <option
                  v-for="container in containers"
                  :key="container.id"
                  :value="container.id">
                  {{ container.name }}
                </option>
              </select>
            </div>
          </div>
        </div>

        <div class="field">
          <label
            class="label"
            for="containerOnly">Container only</label>
          <div class="control">
            <input
              v-model="containerOnly"
              type="checkbox"
              id="containerOnly"
            >
            <label for="containerOnly">Container only</label>
          </div>
        </div>

        <div
          class="field"
          v-if="selectedType === 'migration'">
          <label
            class="label"
            for="live">Live</label>
          <div class="control">
            <input
              type="checkbox"
              id="live"
              v-model="live">
            <label for="live">Live</label>
          </div>
        </div>

      </div>

      <div class="field">
        <button
          :disabled="selectedHost === '' || name === '' || selectedType ===''"
          class="button"
          type="submit"
          @click="onSubmit"
        >Save
        </button>
      </div>
    </form>

  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      hosts: "getHosts",
      containers: "getContainers",
      profiles: "getProfiles"
    }),
    images() {
      return this.$store.getters.getImagesForHost(this.selectedHost);
    },
    imageAliases() {
      return this.$store.getters.getImagesWithAliasesForHost(this.selectedHost);
    }
  },

  data() {
    return {
      // bool
      fingerprintBool: false,
      aliasBool: false,
      selectedType: "",

      //data
      selectedProfiles: [],
      selectedHost: "",
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
      architecture: ""
    };
  },

  methods: {
    onSubmit() {
      let bodyConfig = {};
      let bodyDevices = {};

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
          profiles: this.selectedProfiles
        };
      } else if (this.selectedType === "image") {
        if (this.selectedFingerprint !== "-1") {
          data.container = {
            name: this.name,
            architecture: this.architecture,
            ephemeral: this.ephemeral,
            config: bodyConfig,
            devices: bodyDevices,
            profiles: this.selectedProfiles,
            fingerprint: this.selectedFingerprint
          };
        }
        if (this.selectedAlias !== "-1") {
          data.container = {
            name: this.name,
            architecture: this.architecture,
            ephemeral: this.ephemeral,
            config: bodyConfig,
            devices: bodyDevices,
            profiles: this.selectedProfiles,
            alias: this.selectedAlias
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
          containerOnly: this.containerOnly
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
          live: this.live
        };
      }

      Object.keys(data).forEach(
        key =>
          (data[key] === null ||
            data[key] === undefined ||
            data[key].length) === 0 && delete data[key]
      );

      this.$store
        .dispatch("createContainer", data)
        .then(() => {
          this.$router.push({ name: "containerOverview" });
        })
        .catch(() => {});
    }
  }
};
</script>

<style>
.form {
  padding: 20px;
}
</style>
