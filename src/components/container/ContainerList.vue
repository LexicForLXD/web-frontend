<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="containers"
        >
            <template slot="items" slot-scope="props">
                <td>
                    <router-link
                            :to="{ name: 'containerSingle', params: {index: getContainerIndex(props.item.id)}}">
                        {{ props.item.name }}
                    </router-link>
                </td>
                <td>{{ props.item.state }}</td>
                <td>{{ props.item.architecture }}</td>
                <td>
                    <router-link
                            :to="{ name: 'hostSingle', params: {index: getHostIndex(props.item.hostId)}}">
                        {{ getHostFromContainer(props.item.hostId).name }}
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
    import jobApi from '../../api/jobs/container.js';
    import {mapGetters, mapMutations} from "vuex";
    import {LOADING_BEGIN, LOADING_FAIL, LOADING_FINISH} from "../../store/mutation-types";

    export default {
        name: "ContainerOverview",

        data() {
            return {
                headers: [
                    {
                        text: "Name",
                        value: "name"
                    },
                    {
                        text: "State",
                        value: "state"
                    },
                    {
                        text: "Architecture",
                        value: "architecture",
                        sortable: false,
                    },
                    {
                        text: "Host",
                        value: "hostId"
                    },
                ],
                running: [],
                archived: [],
                jobError: "",
            }
        },

        mounted: function() {
            this.getArchivedJobs();
            this.getRunningJobs();
        },

        computed: {
            ...mapGetters({
                containers: "getContainers",
            }),

        },

        components: {
            // "site-workout": Workout
        },

        methods: {
            ...mapMutations({
                startLoading: LOADING_BEGIN,
                stopLoading: LOADING_FINISH,
                failLoading: LOADING_FAIL
            }),
            newContainer() {
                this.$router.push({name: "newContainer"});
            },

            deleteContainer(containerId) {
                this.$store.dispatch("deleteContainer", containerId);
            },

            getHostFromContainer(hostId) {
                return this.$store.getters.getHostById(hostId)
            },
            getHostIndex(id) {
                return this.$store.getters.getHostIndexById(id);
            },
            getContainerIndex(id) {
                return this.$store.getters.getContainerIndexById(id);
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
