<template>

    <li>
        <router-link :to="{name: 'userOverview'}">Users</router-link>
        <ul v-show="this.$store.state.route.path.includes('/users')">
            <router-link :to="{name: 'userNew'}">New User</router-link>
            <router-link :to="{name: 'userCurrent'}">Your Profile</router-link>
        </ul>
    </li>

</template>