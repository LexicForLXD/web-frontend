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
            label="Source"
            v-model="source"
            :rules="[v => !!v || 'Source is required']"
            required
            :error-messages="errors.name"
            />

        <v-select
                    :items="drivers"
                    v-model="selectedDriver"
                    label="Driver"
                    required
                    item-value="name"
                    item-text="name"
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
import storageApi from "../../api/storage/storage.js"

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
          },
      ],
      selectedDriver: "",
      errors: "",
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
        }
      storageApi.create(this.hosts[this.index].id, data).then(res => {
          this.$router.push({name: 'hostSingle', params: {index: this.index}});
      }).catch(err => {
          console.log(err)
          this.errors = err.data.data
      })
    }
  }
};
</script>

<style>
</style>
