<template>
    <v-form v-model="valid">
        <v-text-field
            label="Name"
            v-model="name"
            :rules="[v => !!v || 'Name is required']"
            required
            :error-messages="errors.name"
            />
        
        <v-text-field
            label="Description"
            v-model="description"
            :error-messages="errors.description"
            />
            
        <v-textarea
            label="Config"
            v-model="config"
            :rules="[v => !!v || 'Config is required']"
            required
            :error-messages="errors.config"
            />

        <v-select
            :items="types"
            v-model="selectedType"
            label="Type"
            required
            item-value="name"
            item-text="name"
            :rules="[v => !!v || 'Type is required']"
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
import networkApi from "../../api/networks/network.js";

export default {
  computed: {
    ...mapGetters({
      hosts: "getHosts"
    })
  },

  data() {
    return {
      valid: false,
      name: "",
      descritption: "",
      config: "",
      types: [
        {
          name: "bridge"
        },
        {
          name: "btrfs"
        },
        {
          name: "zfs"
        }
      ],
      selectedType: "",
      errors: "",
      index: this.$route.params.index
    };
  },

  methods: {
    onCreate() {
      const data = {
        name: this.name,
        description: this.descritption,
        type: this.selectedType,
        config: this.config
      };
      networkApi
        .create(this.hosts[this.index].id, data)
        .then(res => {
          this.$router.push({
            name: "hostSingle",
            params: { index: this.index }
          });
        })
        .catch(err => {
          console.log(err);
          this.errors = err.data.data.message;
        });
    }
  }
};
</script>

<style>
</style>
