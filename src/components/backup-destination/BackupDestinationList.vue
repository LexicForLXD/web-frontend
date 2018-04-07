<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="backupDests">
            <template slot="items" slot-scope="props">
                <td>
                    <router-link
                            :to="{ name: 'destinationSingle', params: {index: props.index}}">
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


        <!--<div>-->
        <!--<div v-if="backupDests.length > 0">-->
        <!--<table class="table is-hoverable is-fullwidth">-->
        <!--<thead>-->
        <!--<tr>-->
        <!--<th>Name</th>-->
        <!--<th>Protocol</th>-->
        <!--<th>Path</th>-->
        <!--</tr>-->
        <!--</thead>-->
        <!--<tbody>-->
        <!--<router-link v-for="(backupDest, index) in backupDests"-->
        <!--:key="backupDest.id"-->
        <!--:to="{name: 'destinationSingle', params: {index: index}}"-->
        <!--tag="tr">-->
        <!--<td>{{backupDest.name}}</td>-->
        <!--<td>{{backupDest.protocol}}</td>-->
        <!--<td>{{backupDest.path}}</td>-->
        <!--</router-link>-->
        <!--</tbody>-->
        <!--</table>-->
        <!--</div>-->


        <!--<div v-else>-->
        <!--Keine Einträge vorhanden-->
        <!--</div>-->

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
            }
        }
    };
</script>

<style lang="scss">

</style>
