<template>
    <v-data-table
            :headers="headers"
            :items="backupSchedules"
    >
        <template slot="items" slot-scope="props">
            <td>
                <router-link
                        :to="{ name: 'scheduleSingle', params: {index: getBackupScheduleIndex(props.item.id)}}">
                    {{ props.item.name }}
                </router-link>
            </td>
            <td>
                {{props.item.type}}
            </td>
            <td>
                {{props.item.executionTime}}
            </td>
            <td>
                <router-link
                        :to="{ name: 'destinationSingle', params: {index: getBackupDestIndex(props.item.destination.id)}}">
                    {{ props.item.destination.name }}
                </router-link>
            </td>
        </template>
    </v-data-table>


</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        computed: {
            ...mapGetters({
                backupSchedules: "getBackupSchedules",

            })
        },

        data() {
            return {
                headers: [
                    {
                        text: "Name",
                        value: "name",
                    },
                    {
                        text: "Type",
                        value: "type",
                    },
                    {
                        text: "Execution Time",
                        value: "executionTime",
                    },
                    {
                        text: "Destination",
                        value: "destinationId"
                    }
                ]
            }
        },

        components: {},

        methods: {

            getBackupScheduleIndex(id) {
                return this.$store.getters.getBackupScheduleIndexById(id);
            },

            getBackupDestById(id) {
                return this.$store.getters.getBackupScheduleById(id);
            },

            getBackupDestIndex(id) {
                return this.$store.getters.getBackupDestinationIndexById(id);
            }
        }
    };
</script>

<style lang="scss">

</style>
