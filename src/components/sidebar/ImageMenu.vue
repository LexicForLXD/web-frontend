<template>

    <li>
        <router-link :to="{name: 'imageOverview'}">Images</router-link>
        <ul v-show="this.$store.state.route.path.includes('/images')">
            <router-link :to="{name: 'imageNew'}">New Image</router-link>
        </ul>
    </li>

</template>