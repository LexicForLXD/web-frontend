<template>
    <v-data-table
        :headers="headers"
        :items="backupSchedules"
    >
        <template slot="items" slot-scope="props">
            <td>
                <router-link
                        :to="{ name: 'scheduleSingle', params: {index: props.index}}">
                    {{ props.item.name }}
                </router-link>
            </td>
            <td>
                {{props.item.type}}
            </td>
            <td>
                {{props.item.executionTime}}
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
                ]
            }
        },

        components: {
        },

        methods: {
        }
    };
</script>

<style lang="scss">

</style>
