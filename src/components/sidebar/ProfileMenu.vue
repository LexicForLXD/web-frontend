<template>

    <li>
        <router-link :to="{name: 'profileOverview'}">Profiles</router-link>
        <ul v-show="this.$store.state.route.path.includes('/profiles')">
            <router-link :to="{name: 'profileNew'}">New Profile</router-link>
        </ul>
    </li>

</template>