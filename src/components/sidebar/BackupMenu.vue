<template>

    <li>
        <router-link :to="{name: 'backupOverview'}">Backups</router-link>
        <ul v-show="this.$store.state.route.path.includes('/backups')">
            <router-link :to="{name: 'backupNew'}">New Backup</router-link>
        </ul>
    </li>

</template>