<template>
    <div>
        <div v-if="users.length > 0">
            <table class="table is-hoverable is-fullwidth">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Username</th>
                    <th>Email</th>
                </tr>
                </thead>
                <tbody>
                <router-link v-for="(user, index) in users"
                             :key="user.id"
                             :to="{name: 'userSingle', params: {index: index}}"
                             tag="tr">
                    <td>{{user.firstName}} {{user.lastName}}</td>
                    <td>{{user.username}}</td>
                    <td>{{user.email}}</td>
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

    export default {
        mounted() {
        },

        computed: {
            ...mapGetters({
                users: "getUsers",

            })
        },

        components: {
        },

        methods: {

            deleteUser(id) {
                this.$store.dispatch("deleteUser", id);
            }
        }
    };
</script>

<style lang="scss">

</style>
