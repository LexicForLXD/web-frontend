<template>
    <div>
        <v-btn @click="getArchivedJobs">Load archived jobs</v-btn>
        <v-btn @click="getRunningJobs">Load running jobs</v-btn>
        <v-data-table
                :headers="headers"
                :items="jobs">
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
    import {mapMutations} from "vuex";
    import {LOADING_BEGIN, LOADING_FAIL, LOADING_FINISH} from "../../store/mutation-types";
    import jobApi from '../../api/import/job.js'


    export default {
        name: "JobOverview",

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
                        sortable: false,
                    },
                    {
                        text: "Finished",
                        value: "finishedAt",
                        sortable: false,
                    },
                    {
                        text: "Status",
                        value: "status",
                        sortable: false,
                    },
                    {
                        text: "Message",
                        value: "message",
                        sortable: false,
                    },
                ],
                jobs: [],
                error: "",
            }
        },

        methods: {
            ...mapMutations({
                startLoading: LOADING_BEGIN,
                stopLoading: LOADING_FINISH,
                failLoading: LOADING_FAIL
            }),
            getArchivedJobs() {
                this.startLoading();
                jobApi.getArchivedJobs().then(res => {
                    this.jobs = res.data;
                    this.error = "";
                    this.stopLoading();
                }).catch(error => {
                    this.jobs = [];
                    this.error = error.response.data.error.message;
                    this.failLoading();
                })
            },
            getRunningJobs() {
                this.startLoading();
                jobApi.getRunningJobs().then(res => {
                    this.error = "";
                    this.jobs = res.data;
                    this.stopLoading();
                }).catch(error => {
                    this.jobs = [];
                    this.error = error.response.data.error.message;
                    this.failLoading();
                })
            }
        },
    }
</script>

<style scoped>

</style>