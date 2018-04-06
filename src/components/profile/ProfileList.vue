<template>
    <div>
        <div v-if="profiles.length > 0">
            <table class="table is-hoverable is-fullwidth">
                <thead>
                <tr>
                    <th>Name</th>
                    <th><abbr title="Description">Desc</abbr></th>
                </tr>
                </thead>
                <tbody>
                <router-link v-for="(profile, index) in profiles"
                             :key="profile.id"
                             :to="{name: 'profileSingle', params: {index: index}}"
                             tag="tr">
                    <td>{{profile.name}}</td>
                    <td>{{profile.description}}</td>
                </router-link>
                </tbody>
            </table>


            <!--<div v-for="(profile, index) in profiles" :key="profile.id">-->
            <!--<div class="card">-->
            <!--<header class="card-header">-->
            <!--<router-link :to="{name: 'profileSingle', params: {index: index}}" class="card-header-title">Host: {{profile.name}}</router-link>-->
            <!--<i v-bind:class="{ 'fa-times': !profile.authenticated, 'fa-check': profile.authenticated}" class="fa card-header-icon"> </i>-->
            <!--</header>-->
            <!--<div class="card-content">-->
            <!--<p>Authenticated: {{profile.authenticated}}</p>-->
            <!--</div>-->
            <!--<footer class="card-footer">-->
            <!--<router-link class=" card-footer-item"  :to="{name: 'profileSingle', params: {index: index}}">More</router-link>-->
            <!--<a href="#" @click="deleteHost(profile.id)" class="card-footer-item">Delete</a>-->
            <!--</footer>-->
            <!--</div>-->
            <!--<p></p>-->
            <!--</div>-->
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
                profiles: "getProfiles",

            })
        },

        components: {
            // "site-workout": Workout
        },

        methods: {

            deleteProfile(id) {
                this.$store.dispatch("deleteProfile", id);
            }
        }
    };
</script>

<style lang="scss">

</style>
