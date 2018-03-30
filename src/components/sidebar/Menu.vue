<template>
    <aside class="menu">
        <p class="menu-label">General</p>
        <ul class="menu-list">
            <host-menu></host-menu>
            <container-menu></container-menu>
            <profile-menu></profile-menu>
            <image-menu></image-menu>
        </ul>
        <p class="menu-label">Backup</p>
        <ul class="menu-list">
            <backup-menu></backup-menu>
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
    import profileMenu from './ProfileMenu'
    import imageMenu from './ImageMenu'
    import backupMenu from './BackupMenu'

    export default {
        components: {
            hostMenu,
            containerMenu,
            scheduleMenu,
            destMenu,
            profileMenu,
            imageMenu,
            backupMenu
        },


    }
</script>

<style>
    /*.router-link-active {*/
        /*background: blue;*/
        /*color: white;*/
    /*}*/
</style>
