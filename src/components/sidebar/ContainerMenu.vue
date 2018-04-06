<template>

    <li>
        <router-link :to="{name: 'containerOverview'}">Containers</router-link>
        <ul v-show="this.$store.state.route.path.includes('/containers')">
            <router-link :to="{name: 'containerNew'}">New Container</router-link>
        </ul>
    </li>

</template>