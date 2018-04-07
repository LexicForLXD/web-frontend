<template>
    <div>

        <v-data-table
                :headers="headers"
                :items="users">
            <template slot="items" slot-scope="props">
                <td>
                    <router-link
                            :to="{ name: 'userSingle', params: {index: props.index}}">
                        {{ props.item.firstName }} {{ props.item.lastName}}
                    </router-link>
                </td>
                <td>{{props.item.username}}</td>
                <td>{{props.item.email}}</td>
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
                        text: "Username",
                        value: "username",
                    },
                    {
                        text: "Email",
                        value: "email",
                    },
                ]
            }
        },

        mounted() {
        },

        computed: {
            ...mapGetters({
                users: "getUsers",

            })
        },

        components: {},

        methods: {

            deleteUser(id) {
                this.$store.dispatch("deleteUser", id);
            }
        }
    };
</script>

<style lang="scss">

</style>
