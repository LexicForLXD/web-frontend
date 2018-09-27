<template>
    <div>
        <v-form v-model="valid" @submit="onSubmit">
            <v-select
                    :items="profiles"
                    v-model="selectedProfiles"
                    label="Profiles"
                    item-value="id"
                    item-text="name"
                    :error-messages="error.profiles"
                    @error="erro.profiles = []"
                    multiple
                    persistent-hint
                    hint="Profiles will alter the default configuration."
            />

            <v-textarea
                    label="Config"
                    v-model="config"
                    multi-line
                    placeholder='{"limits.cpu": "2"}'
                    :error-messages="error.config"
                    @error="erro.config = []"
                    persistent-hint
                    hint="You can input your own config."
            />

            <v-textarea
                    label="Devices"
                    v-model="devices"
                    multi-line
                    :error-messages="error.devices"
                    @error="erro.devices = []"
                    persistent-hint
                    hint="You can input your own devices. Please don't include the storage device."
            />

            <v-btn
                    @click="onSubmit"
                    :disabled="!valid"
            >
                Submit
            </v-btn>

        </v-form>

        <p>
            If you get redirected to the container view, the server accepted your request. Please have a look on the running jobs.
        </p>

        <v-alert :value="error.general" type="error">
            {{ error.general }}
        </v-alert>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "EditContainer",

  computed: {
    ...mapGetters({
      profiles: "getProfiles",
      containerErrors: "getContainerErrors"
    })
  },

  props: ["container"],

  data: function() {
    return {
      config: JSON.stringify(this.container.config),
      devices: JSON.stringify(this.container.devices),
      selectedProfiles: this.container.profileId,
      error: "",
      valid: false
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
        containerId: this.container.id
      };

      data.container = {
        config: bodyConfig,
        devices: bodyDevices,
        profiles: this.selectedProfiles
      };

      Object.keys(data.container).forEach(
        key =>
          (data.container[key] === null ||
            data.container[key] === undefined ||
            data.container[key].length) === 0 && delete data.container[key]
      );

      this.$store
        .dispatch("updateContainer", data)
        .then(() => {
          this.$emit("submitted");
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
