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
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    // import Workout from "./Workout";

    export default {
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
                ]
            }
        },

        mounted() {
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
            }
        }
    };
</script>

<style lang="scss">

</style>
