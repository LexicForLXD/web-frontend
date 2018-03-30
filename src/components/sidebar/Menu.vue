<template>
    <aside class="menu">
        <p class="menu-label">General</p>
        <ul class="menu-list">
            <host-menu></host-menu>
            <container-menu></container-menu>
        </ul>
        <p class="menu-label">Backup</p>
        <ul class="menu-list">
            <schedule-menu></schedule-menu>
            <dest-menu></dest-menu>
        </ul>
    </aside>
</template>

<script>
    import hostMenu from './HostMenu'
    import containerMenu from './ContainerMenu'
    import scheduleMenu from './ScheduleMenu'
    import destMenu from './DestinationMenu'

    export default {
        components: {
            hostMenu,
            containerMenu,
            scheduleMenu,
            destMenu
        },


    }
</script>

<style>
    /*.router-link-active {*/
        /*background: blue;*/
        /*color: white;*/
    /*}*/
</style>
