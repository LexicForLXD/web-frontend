<template>

    <li>
        <router-link :to="{name: 'destinationOverview'}">Destinations</router-link>
        <ul v-show="this.$store.state.route.path.includes('/backup-dests')">
            <router-link :to="{name: 'destinationNew'}">New Destination</router-link>
        </ul>
    </li>

</template>