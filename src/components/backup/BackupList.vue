<template>
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
</template>

<script>
    import {mapGetters} from "vuex";
    // import Workout from "./Workout";

    export default {
        mounted() {
        },

        computed: {
            ...mapGetters({
                backups: "getBackups",
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
                    },
                ]
            }
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
            }
        }
    };
</script>

<style lang="scss">

</style>
