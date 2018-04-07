<template>
    <v-navigation-drawer app permanent>
        <v-list>
            <v-list-tile>
                <v-list-tile-title class="title">
                    General
                </v-list-tile-title>
            </v-list-tile>
            <v-list-group
                    v-model="item.active"
                    v-for="item in general"
                    :key="item.title"
                    no-action
            >
                <v-list-tile slot="activator" :to="{name: item.route}">
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-for="subItem in item.items" :key="subItem.title" :to="{name: subItem.route}">
                    <v-list-tile-content>
                        <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list-group>
            <v-divider></v-divider>
            <v-list-tile>
                <v-list-tile-title class="title">
                    Backup
                </v-list-tile-title>
            </v-list-tile>
            <v-list-group
                    v-model="item.active"
                    v-for="item in backup"
                    :key="item.title"
                    no-action
            >
                <v-list-tile slot="activator" :to="{name: item.route}">
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-for="subItem in item.items" :key="subItem.title" :to="{name: subItem.route}">
                    <v-list-tile-content>
                        <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list-group>

            <v-divider></v-divider>

            <v-list-tile>
                <v-list-tile-title class="title">
                    MISC
                </v-list-tile-title>
            </v-list-tile>
            <v-list-group
                    v-model="item.active"
                    v-for="item in misc"
                    :key="item.title"
                    no-action
            >
                <v-list-tile slot="activator" :to="{name: item.route}">
                    <v-list-tile-content>
                        <v-list-tile-title>{{ item.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
                <v-list-tile v-for="subItem in item.items" :key="subItem.title" :to="{name: subItem.route}">
                    <v-list-tile-content>
                        <v-list-tile-title>{{ subItem.title }}</v-list-tile-title>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list-group>
        </v-list>
        <!--<v-list class="pt-0">-->
        <!--<v-list-tile>-->
        <!--<v-list-tile-title class="title">-->
        <!--General-->
        <!--</v-list-tile-title>-->
        <!--</v-list-tile>-->
        <!--<v-divider></v-divider>-->
        <!--<host-menu></host-menu>-->
        <!--<container-menu></container-menu>-->
        <!--<profile-menu></profile-menu>-->
        <!--<image-menu></image-menu>-->
        <!--<v-list-tile>-->
        <!--<v-list-tile-title class="title">-->
        <!--Backup-->
        <!--</v-list-tile-title>-->
        <!--</v-list-tile>-->
        <!--<v-divider></v-divider>-->
        <!--<backup-menu></backup-menu>-->
        <!--<schedule-menu></schedule-menu>-->
        <!--<dest-menu></dest-menu>-->
        <!--<v-list-tile>-->
        <!--<v-list-tile-title class="title">-->
        <!--Backup-->
        <!--</v-list-tile-title>-->
        <!--</v-list-tile>-->
        <!--<v-divider></v-divider>-->
        <!--<user-menu></user-menu>&ndash;&gt;-->
        <!--</v-list>-->
    </v-navigation-drawer>
    <!--<aside class="menu">-->
    <!--<p class="menu-label">General</p>-->
    <!--<ul class="menu-list">-->
    <!--<host-menu></host-menu>-->
    <!--<container-menu></container-menu>-->
    <!--<profile-menu></profile-menu>-->
    <!--<image-menu></image-menu>-->
    <!--</ul>-->
    <!--<p class="menu-label">Backup</p>-->
    <!--<ul class="menu-list">-->
    <!--<backup-menu></backup-menu>-->
    <!--<schedule-menu></schedule-menu>-->
    <!--<dest-menu></dest-menu>-->
    <!--</ul>-->
    <!--<p class="menu-label">Sonstiges</p>-->
    <!--<ul class="menu-list">-->
    <!--<user-menu></user-menu>-->
    <!--</ul>-->
    <!--</aside>-->
</template>

<script>
    import hostMenu from './HostMenu'
    import containerMenu from './ContainerMenu'
    import scheduleMenu from './ScheduleMenu'
    import destMenu from './DestinationMenu'
    import profileMenu from './ProfileMenu'
    import imageMenu from './ImageMenu'
    import backupMenu from './BackupMenu'
    import userMenu from './UserMenu'

    export default {
        components: {
            hostMenu,
            containerMenu,
            scheduleMenu,
            destMenu,
            profileMenu,
            imageMenu,
            backupMenu,
            userMenu
        },

        data() {
            return {
                general: [
                    {
                        title: "Hosts",
                        route: "hostOverview",
                        items: [
                            {
                                title: "New Host",
                                route: "hostNew"
                            }
                        ]
                    },
                    {
                        title: "Containers",
                        route: "containerOverview",
                        items: [
                            {
                                title: "New Host",
                                route: "containerNew"
                            }
                        ]
                    },
                    {
                        title: "Profiles",
                        route: "profileOverview",
                        items: [
                            {
                                title: "New Profile",
                                route: "profileNew"
                            }
                        ]
                    },
                    {
                        title: "Images",
                        route: "imageOverview",
                        items: [
                            {
                                title: "New Image",
                                route: "imageNew"
                            }
                        ]
                    },
                ],
                backup: [
                    {
                        title: "Backups",
                        route: "backupOverview",
                        items: [
                            {
                                title: "New Backup",
                                route: "backupNew"
                            }
                        ]
                    },
                    {
                        title: "Destinations",
                        route: "destinationOverview",
                        items: [
                            {
                                title: "New Destination",
                                route: "destinationNew"
                            }
                        ]
                    },
                    {
                        title: "Schedules",
                        route: "scheduleOverview",
                        items: [
                            {
                                title: "New Schedule",
                                route: "scheduleNew"
                            }
                        ]
                    },
                ],
                misc: [
                    {
                        title: "Users",
                        route: "userOverview",
                        items: [
                            {
                                title: "New User",
                                route: "userNew"
                            },
                            {
                                title: "Current User",
                                route: "userCurrent"
                            }
                        ]
                    },
                ]
            }
        }


    }
</script>

<style>
    /*.router-link-active {*/
    /*background: blue;*/
    /*color: white;*/
    /*}*/
</style>
