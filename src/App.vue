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
            <site-footer/>
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
    import authApi from "./api/auth/auth";

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
            if (token && expiration > Date.now() / 1000) {
                this.init();
            } else if (token && expiration < Date.now() / 1000) {
                authApi.refresh()
                    .then(res => {
                        this.error = "";
                        localStorage.setItem('access_token', res.data.access_token);
                        localStorage.setItem('expiration', (res.data.expires_in) + (Date.now() / 1000));
                        localStorage.setItem('refresh_token', res.data.refresh_token);
                        this.init();
                    })

                    .catch((error) => {
                        if (error.response.data.error_description) {
                            this.initError = error.response.data.error_description;
                        }
                        this.$router.push("/login");
                        console.warn("could not refresh token");
                        localStorage.removeItem("access_token");
                        localStorage.removeItem("expiration");
                        localStorage.removeItem("refresh_token");
                        location.reload();
                    });
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