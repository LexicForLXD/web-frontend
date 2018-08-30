<template>
    <div>
        <v-form v-model="valid" @submit="onSubmit">
            <v-text-field
              label="Name"
              v-model="name"
              :rules="[v => !!v || 'Name is required']"
              required
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

        <v-alert :value="error" type="error">
            {{ error }}
        </v-alert>
    </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "EditContainerName",

  computed: {
    ...mapGetters({
      containerErrors: "getContainerErrors"
    })
  },

  props: ["container"],

  data: function() {
    return {
      name
    };
  },

  methods: {
    onSubmit() {
      let data = {
        container: {},
        containerId: this.container.id
      };

      data.container = {
        name: this.name
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
