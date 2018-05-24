<template>
    <v-toolbar app>
        <!--<v-toolbar-side-icon></v-toolbar-side-icon>-->
        <v-toolbar-title>
            LEXIC
        </v-toolbar-title>
        <v-spacer></v-spacer>
        <user-badge></user-badge>
    </v-toolbar>
</template>

<script>
    import userBadge from './UserBadge'

    export default {
        name: 'site-header',
        data() {
            return {
                menuExpanded: false
            }
        },


        components: {
            userBadge
        },
        methods: {
            mobileMenu() {
                this.menuExpanded = !this.menuExpanded
            },
        }

    }
</script>

<style>


</style>
