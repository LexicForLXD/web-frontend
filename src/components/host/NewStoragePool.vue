<template>
    <v-form v-model="valid">
        <v-text-field
            label="Name"
            v-model="name"
            :rules="[v => !!v || 'Name is required']"
            required
            :error-messages="error.name"
            @input="error.name = []"
            />
        
        <v-text-field
            label="Source"
            v-model="source"
            :rules="[v => !!v || 'Source is required']"
            required
            :error-messages="error.source"
            @input="error.source = []"
            />

        <v-select
                    :items="drivers"
                    v-model="selectedDriver"
                    label="Driver"
                    required
                    item-value="name"
                    item-text="name"
                    :error-messages="error.driver"
                    @input="error.driver = []"
                    :rules="[v => !!v || 'Driver is required']"
            />

        <v-btn
                @click="onCreate"
                :disabled="!valid"
        >
            Save
        </v-btn>

    </v-form>
</template>

<script>
import { mapGetters } from "vuex";
import storageApi from "../../api/storage/storage.js";

export default {
  computed: {
    ...mapGetters({
      hosts: "getHosts"
    })
  },

  data() {
    return {
      valid: false,
      e1: true,
      name: "",
      source: "",
      drivers: [
        {
          name: "dir"
        },
        {
          name: "btrfs"
        },
        {
          name: "zfs"
        }
      ],
      selectedDriver: "",
      error: "",
      index: this.$route.params.index
    };
  },

  methods: {
    onCreate() {
      const data = {
        name: this.name,
        driver: this.selectedDriver,
        config: {
          source: this.source
        }
      };
      storageApi
        .create(this.hosts[this.index].id, data)
        .then(res => {
          this.$router.push({
            name: "hostSingle",
            params: { index: this.index }
          });
        })
        .catch(error => {
          this.errors = error.response.data.error.message;
        });
    }
  }
};
</script>

<style>
</style>
