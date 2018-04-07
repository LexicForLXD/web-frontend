<template>

    <v-toolbar-items class="hidden-sm-and-down">
        <v-btn flat :to="{name: 'userCurrent'}">Hallo {{firstName}}</v-btn>
        <v-btn flat @click="logout">Logout</v-btn>
    </v-toolbar-items>

    <!--<div-->
    <!--class="navbar-end"-->
    <!--v-if="isAuthenticated && firstName">-->
    <!--<router-link-->
    <!--:to="{name: 'userCurrent'}"-->
    <!--class="navbar-item">Hallo {{ firstName }}-->
    <!--</router-link>-->

    <!--<a-->
    <!--href="#"-->
    <!--class="navbar-item"-->
    <!--@click="logout">-->
    <!--Logout-->
    <!--</a>-->

    <!--</div>-->

</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        name: "HeaderUser",

        computed: {
            ...mapGetters({
                firstName: "getCurrentFirstName",
                isAuthenticated: "isAuthenticated"
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
    .right {
        float: right;
    }
</style>
