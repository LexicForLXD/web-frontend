<template>
    <div id="app">
        <v-app>
            <vue-progress-bar></vue-progress-bar>
            <site-nav/>
            <site-header/>
            <v-content>
                <v-container fluid>
                    <router-view v-if="isInitiated || !isAuthenticated"></router-view>
                    <div v-else>
                        <site-loading :error="initError"/>
                    </div>
                </v-container>
            </v-content>
            <v-footer app>
                <site-footer/>
            </v-footer>
        </v-app>
    </div>
</template>

<script>
    // Imports
    import siteHeader from "./components/header/SiteHeader";
    import siteFooter from "./components/footer/SiteFooter";
    import siteNav from "./components/sidebar/Sidebar";
    import siteLoading from "./pages/Loading";
    import {mapGetters} from "vuex";

    export default {
        name: "app",
        components: {
            siteHeader,
            siteFooter,
            siteNav,
            siteLoading
        },

        computed: {
            ...mapGetters({
                isInitiated: "getInitiated",
                isAuthenticated: "isAuthenticated"
            })
        },

        data() {
            return {
                initError: ""
            }
        },

        created() {
            const token = localStorage.getItem("access_token");
            const expiration = localStorage.getItem("expiration");
            if (token && expiration > Date.now()) {
                this.init();
            } else if (token && expiration < Date.now()) {
                console.warn("could not refresh token");
                localStorage.removeItem("access_token");
                localStorage.removeItem("expiration");
                location.reload();
            } else {
                this.$router.push("/login");
            }
        },

        methods: {
            init() {
                this.$store.dispatch("initShared").catch(error => {
                    console.log(error);
                    this.initError = error;
                });
            }
        }
    };
</script>

<style lang="scss">

</style>