<template>

    <li>
        <router-link :to="{name: 'scheduleOverview'}">Schedules</router-link>
        <ul v-show="this.$store.state.route.path.includes('/backup-schedules')">
            <router-link :to="{name: 'scheduleNew'}">New Schedule</router-link>
        </ul>
    </li>

</template>