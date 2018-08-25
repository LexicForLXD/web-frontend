<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="backups">
            <template slot="items" slot-scope="props">
                <td>
                    <router-link
                            :to="{ name: 'backupSingle', params: {index: getBackupIndex(props.item.id)}}">
                        {{ props.item.timestamp }}
                    </router-link>
                </td>
                <td>
                    <router-link
                            :to="{ name: 'destinationSingle', params: {index: getBackupDestIndex(props.item.destinationId)}}">
                        {{getDestination(props.item.destinationId).name}}
                    </router-link>
                </td>
                <td>
                    <router-link
                            :to="{ name: 'scheduleSingle', params: {index: getBackupScheduleIndex(props.item.backupScheduleId)}}">
                        {{getBackupSchedule(props.item.backupScheduleId).name}}
                    </router-link>
                </td>
            </template>
        </v-data-table>
        <job-overview 
                :running="running" 
                :archived="archived"
                :error="jobError"
                title="Container"
                v-on:getArchivedJobs="getArchivedJobs"
                v-on:getRunningJobs="getRunningJobs"
                />
    </div>
</template>

<script>
import jobApi from '../../api/jobs/backup.js';
import {mapGetters, mapMutations} from "vuex";
import {LOADING_BEGIN, LOADING_FAIL, LOADING_FINISH} from "../../store/mutation-types";


export default {
  mounted: function() {
            this.getArchivedJobs();
            this.getRunningJobs();
        },

  computed: {
    ...mapGetters({
      backups: "getBackups"
    })
  },

  data() {
    return {
      headers: [
        {
          text: "Timestamp",
          value: "timestamp"
        },
        {
          text: "Destination",
          value: "destinationId"
        },
        {
          text: "Backup Schedule",
          value: "backupScheduleId"
        }
      ],
                running: [],
                archived: [],
                jobError: "",
    };
  },

  components: {
    // "site-workout": Workout
  },

  methods: {
    newContainer() {
      this.$router.push({ name: "newContainer" });
    },

    deleteContainer(containerId) {
      this.$store.dispatch("deleteContainer", containerId);
    },
    getBackupIndex(id) {
      return this.$store.getters.getBackupIndexById(id);
    },

    getDestination(id) {
      return this.$store.getters.getBackupDestinationById(id);
    },

    getBackupSchedule(id) {
      return this.$store.getters.getBackupScheduleById(id);
    },

    getBackupDestIndex(id) {
      return this.$store.getters.getBackupDestinationIndexById(id);
    },

    getBackupScheduleIndex(id) {
      return this.$store.getters.getBackupScheduleIndexById(id);
    },
    getArchivedJobs() {
                this.startLoading();
                jobApi.getArchivedJobs().then(res => {
                    this.archived = res.data;
                    this.jobError = "";
                    this.stopLoading();
                }).catch(error => {
                    this.archived = [];
                    this.jobError = error.response.data.error.message;
                    this.failLoading();
                })
            },
            getRunningJobs() {
                this.startLoading();
                jobApi.getRunningJobs().then(res => {
                    this.jobError = "";
                    this.running = res.data;
                    this.stopLoading();
                }).catch(error => {
                    this.running = [];
                    this.jobError = error.response.data.error.message;
                    this.failLoading();
                })
            }
  }
};
</script>

<style lang="scss">
</style>
