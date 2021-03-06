<template>
    <div>
        <v-select
                :items="hosts"
                v-model="selectedHost"
                label="Host"
                required
                item-value="id"
                item-text="name"
                :rules="[v => !!v || 'Host is required']"
        />
        
            <h2>Import</h2>

            <v-btn @click="importImages" :disabled="selectedHost === ''">Images</v-btn>
            <v-btn @click="importContainers" :disabled="selectedHost === ''">Containers</v-btn>
            <v-btn @click="importStoragePools" :disabled="selectedHost === ''">Storage Pools</v-btn>
            <v-btn @click="importProfiles" :disabled="selectedHost === ''">Profiles</v-btn>
            <v-btn @click="importAll" :disabled="selectedHost === ''">Import All</v-btn>

            {{error}}
            {{message}}
        
                
        <v-divider></v-divider>
        <job-overview
            :running="running" 
            :archived="archived"
            :error="jobError"
            title="Import"
            v-on:getArchivedJobs="getArchivedJobs"
            v-on:getRunningJobs="getRunningJobs"
            />
    </div>
</template>

<script>
import importApi from "../../api/import/import.js";
import jobApi from "../../api/jobs/import.js";
import { mapGetters, mapMutations } from "vuex";
import {
  LOADING_BEGIN,
  LOADING_FAIL,
  LOADING_FINISH
} from "../../store/mutation-types";

export default {
  data() {
    return {
      selectedHost: "",
      error: "",
      message: "",
      running: [],
      archived: [],
      jobError: ""
    };
  },

  mounted: function() {
    this.getArchivedJobs();
    this.getRunningJobs();
  },

  computed: {
    ...mapGetters({
      hosts: "getHosts"
    })
  },

  methods: {
    ...mapMutations({
      startLoading: LOADING_BEGIN,
      stopLoading: LOADING_FINISH,
      failLoading: LOADING_FAIL
    }),
    importImages() {
      this.startLoading();
      importApi
        .images(this.selectedHost)
        .then(res => {
          this.message = res.data.message;
          this.stopLoading();
        })
        .catch(error => {
          this.error = error.response.data.message;
          this.failLoading();
        });
    },
    importProfiles() {
      this.startLoading();
      importApi
        .profiles(this.selectedHost)
        .then(res => {
          this.message = res.data.message;
          this.stopLoading();
        })
        .catch(error => {
          this.error = error.response.data.message;
          this.failLoading();
        });
    },
    importStoragePools() {
      this.startLoading();
      importApi
        .storagePools(this.selectedHost)
        .then(res => {
          this.message = res.data.message;
          this.stopLoading();
        })
        .catch(error => {
          this.error = error.response.data.message;
          this.failLoading();
        });
    },
    importContainers() {
      this.startLoading();
      importApi
        .containers(this.selectedHost)
        .then(res => {
          this.message = res.data.message;
          this.stopLoading();
        })
        .catch(error => {
          this.error = error.response.data.message;
          this.failLoading();
        });
    },
    importAll() {
      this.startLoading();
      importApi
        .all(this.selectedHost)
        .then(res => {
          this.message = res.data.message;
          this.stopLoading();
        })
        .catch(error => {
          this.error = error.response.data.message;
          this.failLoading();
        });
    },
    getArchivedJobs() {
      this.startLoading();
      jobApi
        .getArchivedJobs()
        .then(res => {
          this.archived = res.data;
          this.jobError = "";
          this.stopLoading();
        })
        .catch(error => {
          this.archived = [];
          this.jobError = error.response.data.error.message;
          this.failLoading();
        });
    },
    getRunningJobs() {
      this.startLoading();
      jobApi
        .getRunningJobs()
        .then(res => {
          this.jobError = "";
          this.running = res.data;
          this.stopLoading();
        })
        .catch(error => {
          this.running = [];
          this.jobError = error.response.data.error.message;
          this.failLoading();
        });
    }
  }
};
</script>

<style scoped>
</style>