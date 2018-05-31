<template>

    <v-toolbar-items class="hidden-sm-and-down" v-if="isAuthenticated">
        <v-btn flat :to="{name: 'userCurrent'}">Hallo {{firstName}}</v-btn>
        <v-btn flat @click="logout">Logout</v-btn>
    </v-toolbar-items>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "HeaderUser",

        computed: {
            ...mapGetters({
                firstName: "getCurrentFirstName",
                isAuthenticated: "isAuthenticated",
                isInitiated: "getInitiated",
            })
        },

        methods: {
            logout() {
                this.$router.push("/login");
                location.reload();
                localStorage.removeItem("access_token");
                localStorage.removeItem("expiration");
            }
        }
    };
</script>

<style scoped>

</style>
