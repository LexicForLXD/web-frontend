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

    </v-navigation-drawer>

</template>

<script>


    export default {

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
