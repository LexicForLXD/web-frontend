<template>
    <div class="jobs">
        <h2>{{title}} Jobs</h2>
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
            </template>
        </v-data-table>
        <v-alert :value="error" type="error">
            {{error}}
        </v-alert>
    </div>

</template>

<script>
import { mapMutations } from "vuex";

module.exports = {
  name: "job-overview",

  data() {
    return {
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
    }
  }
};
</script>

<style scoped>
.jobs {
  margin-top: 50px;
}
</style>