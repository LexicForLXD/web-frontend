<template>
    <v-card class="jobs" >
        <v-toolbar>
            <v-toolbar-title>
                {{title}} jobs
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-toolbar-items>
               <v-btn flat @click="showJobs = !showJobs">Toggle Jobs</v-btn>
            </v-toolbar-items>
        </v-toolbar>
        <v-card-text v-if="showJobs">
            <v-btn @click="getArchivedJobs">Load archived jobs</v-btn>
            <v-btn @click="getRunningJobs">Load running jobs</v-btn>
            <h4>Archived jobs</h4>
            <v-data-table
                    :headers="headers"
                    :items="archived">
                <template slot="items" slot-scope="props">
                    <td>
                        {{ props.item.method }}
                    </td>
                    <td>
                        {{ props.item.startedAt }}
                    </td>
                    <td>
                        {{ props.item.finishedAt }}
                    </td>
                    <td>
                        {{ props.item.status }}
                    </td>
                    <td>
                        {{ props.item.message }}
                    </td>
                    <td>
                        <v-btn icon color="red" @click="deleteJob(props.item.id,'archived')">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </td>
                </template>
            </v-data-table>
            <h4>Running jobs</h4>
            <v-data-table
                    :headers="headers"
                    :items="running">
                <template slot="items" slot-scope="props">
                    <td>
                        {{ props.item.method }}
                    </td>
                    <td>
                        {{ props.item.startedAt }}
                    </td>
                    <td>
                        {{ props.item.finishedAt }}
                    </td>
                    <td>
                        {{ props.item.status }}
                    </td>
                    <td>
                        {{ props.item.message }}
                    </td>
                    <td>
                        <v-btn icon color="red" @click="deleteJob(props.item.id, 'running')">
                            <v-icon>delete</v-icon>
                        </v-btn>
                    </td>
                </template>
            </v-data-table>
            <v-alert :value="error" type="error">
                {{error}}
            </v-alert>
        </v-card-text>
    </v-card>

</template>

<script>
import jobApi from "../../api/jobs/job.js";

module.exports = {
  name: "job-overview",

  data() {
    return {
      showJobs: false,
      headers: [
        {
          text: "Method",
          value: "method"
        },
        {
          text: "Started",
          value: "startedAt",
          sortable: false
        },
        {
          text: "Finished",
          value: "finishedAt",
          sortable: false
        },
        {
          text: "Status",
          value: "status",
          sortable: false
        },
        {
          text: "Message",
          value: "message",
          sortable: false
        },
        {
          text: "Action",
          value: "action",
          sortable: false
        }
      ]
    };
  },

  props: {
    archived: Array,
    running: Array,
    title: String,
    error: String
  },

  methods: {
    getArchivedJobs() {
      this.$emit("getArchivedJobs");
    },
    getRunningJobs() {
      this.$emit("getRunningJobs");
    },

    deleteJob: function(jobId, type) {
      this.$store.commit("LOADING_BEGIN");
      jobApi
        .deleteJob(jobId, type)
        .then(res => {
          this.jobError = "";
          this.getArchivedJobs();
          this.getRunningJobs();
          this.$store.commit("LOADING_FINISH");
        })
        .catch(error => {
          this.jobError = error.response.data.error.message;
          this.$store.commit("LOADING_FAIL");
        });
    }
  }
};
</script>

<style scoped>
.jobs {
  margin-top: 50px;
}
</style>