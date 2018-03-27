<template>
    <div>
        <!--<div class="menu-label"></div>-->
        <ul class="menu-list">
            <router-link :to="{name: 'containerOverview'}">Containers</router-link>
            <router-link :to="{name: 'scheduleOverview'}">Backup Schedules</router-link>
            <router-link :to="{name: 'hostOverview'}">Hosts</router-link>
        </ul>
    </div>
</template>

<script>

    export default {

    }
</script>

<style>
    .router-link-active {
        background: blue;
        color: white;
    }
</style>
