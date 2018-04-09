<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="backupDests">
            <template slot="items" slot-scope="props">
                <td>
                    <router-link
                            :to="{ name: 'destinationSingle', params: {index: getBackupDestIndex(props.item.id)}}">
                        {{ props.item.name }}
                    </router-link>
                </td>
                <td>
                    {{props.item.protocol}}
                </td>
                <td>
                    {{props.item.path}}
                </td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        data() {
            return {
                headers: [
                    {
                        text: "Name",
                        value: "name"
                    },
                    {
                        text: "Protocol",
                        value: "protocol",
                    },
                    {
                        text: "Path",
                        value: "path",
                        sortable: false,
                    },
                ]
            }
        },

        mounted() {
        },

        computed: {
            ...mapGetters({
                backupDests: "getBackupDestinations",

            })
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
            getBackupDestIndex(id) {
                return this.$store.getters.getBackupDestinationIndexById(id);
            }
        }
    };
</script>

<style lang="scss">

</style>
