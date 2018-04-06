<template>
    <div>
        <div v-if="hosts.length > 0">
            <table class="table is-hoverable is-fullwidth">
                <thead>
                <tr>
                    <th>Name</th>
                    <th><abbr title="Authenticated">Auth</abbr></th>
                </tr>
                </thead>
                <tbody>
                <router-link v-for="(host, index) in hosts"
                             :key="host.id"
                             :to="{name: 'hostSingle', params: {index: index}}"
                             tag="tr">
                    <td>{{host.name}}</td>
                    <td><i v-bind:class="{ 'fa-times': !host.authenticated, 'fa-check': host.authenticated}"
                           class="fa card-header-icon"> </i></td>
                </router-link>
                </tbody>
            </table>
        </div>

        <div v-else>
            <p>No hosts available</p>
            <router-link :to="{name: 'hostNew'}" class="button is-success">Create Host</router-link>
        </div>
    </div>

</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        mounted() {
        },

        computed: {
            ...mapGetters({
                hosts: "getHosts",
            })

        },

        components: {
        },

        methods: {
            newHost() {
                this.$router.push({name: "newHost"});
            },

            deleteHost(id) {
                this.$store.dispatch("deleteHost", id);
            }
        }
    };
</script>

<style lang="scss">

</style>
