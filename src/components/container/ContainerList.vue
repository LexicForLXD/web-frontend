<template>
    <div>
        <div v-if="containers.length > 0">

            <table class="table is-hoverable is-fullwidth">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>State</th>
                    <th><abbr title="Architecture">ARCH</abbr></th>
                    <th>Host</th>
                </tr>
                </thead>
                <tbody>
                <router-link v-for="(container, index) in containers"
                             :key="container.id"
                             :to="{name: 'containerSingle', params: {index: index}}"
                             tag="tr">
                    <td>{{container.name}}</td>
                    <td>{{container.state}}</td>
                    <td>{{container.architecture}}</td>
                    <td>{{container.host.name}}</td>
                </router-link>
                </tbody>
            </table>
        </div>


        <div v-else>
            Keine Einträge vorhanden
        </div>

    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    // import Workout from "./Workout";

    export default {
        mounted() {
        },

        computed: {
            ...mapGetters({
                containers: "getContainers",

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
