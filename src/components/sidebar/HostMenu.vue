<template>

    <li>
        <router-link :to="{name: 'hostOverview'}">Hosts</router-link>
        <ul v-show="this.$store.state.route.path.includes('/hosts')">
            <router-link :to="{name: 'hostNew'}">New Host</router-link>
        </ul>
    </li>

</template>