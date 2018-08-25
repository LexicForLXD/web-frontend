<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="images">
            <template slot="items" slot-scope="props">
                <td v-if="props.item.finished">
                    <router-link
                            :to="{ name: 'imageSingle', params: {index: getImageIndex(props.item.id)}}">
                        {{ props.item.fingerprint.substring(0,11) }}...
                    </router-link>
                </td>
                <td v-else/>
                <td v-if="props.item.aliases.length > 0">{{ props.item.aliases[0].name }}</td>
                <td v-else/>
                <td>
                    {{props.item.architecture}}
                </td>
                <td>
                    <i :class="{ 'fa-times': !props.item.finished, 'fa-check': props.item.finished}"
                        class="fa">
                    </i>
                </td>
                <td>
                    <i :class="{ 'fa-times': !props.item.public, 'fa-check': props.item.public}"
                       class="fa">
                    </i>
                </td>
            </template>
        </v-data-table>
        <job-overview
            :running="running" 
            :archived="archived"
            :error="jobError"
            title="Image"
            v-on:getArchivedJobs="getArchivedJobs"
            v-on:getRunningJobs="getRunningJobs"
            />
    </div>
</template>

<script>
    import jobApi from '../../api/jobs/image.js';
    import {mapGetters, mapMutations} from "vuex";
    import {LOADING_BEGIN, LOADING_FAIL, LOADING_FINISH} from "../../store/mutation-types";


    export default {
    

        data() {
            return {
                running: [],
                archived: [],
                jobError: "",
                headers: [
                    {
                        text: "Fingerprint",
                        value: "fingerprint"
                    },
                    {
                        text: "Alias",
                        value: "aliases",
                        sortable: false,
                    },
                    {
                        text: "Architecture",
                        value: "architecture",
                        sortable: false,
                    },
                    {
                        text: "Finished",
                        value: "finished",
                        sortable: false,
                    },
                    {
                        text: "Public",
                        value: "public",
                        sortable: false,
                    },
                ]
            }
        },

        mounted: function() {
            this.getArchivedJobs();
            this.getRunningJobs();
        },

        computed: {
            ...mapGetters({
                images: "getImages",

            })
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
            newHost() {
                this.$router.push({name: "newHost"});
            },

            deleteHost(id) {
                this.$store.dispatch("deleteHost", id);
            },
            getImageIndex(id) {
                return this.$store.getters.getImageIndexById(id);
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
