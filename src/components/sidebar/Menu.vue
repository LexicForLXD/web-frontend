<template>
    <v-navigation-drawer app permanent>
        <v-list>
            <v-list-tile>
                <v-list-tile-title class="title">
                    General
                </v-list-tile-title>
            </v-list-tile>
            <v-list-group
                    v-for="item in general"
                    :key="item.title"
                    no-action
                    :value="item.group === $store.state.route.meta.group"
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
                    :value="item.group === $store.state.route.meta.group"
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
                    :value="item.group === $store.state.route.meta.group"
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
          group: "host",
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
          group: "container",
          items: [
            {
              title: "New Container",
              route: "containerNew"
            }
          ]
        },
        {
          title: "Profiles",
          route: "profileOverview",
          group: "profile",
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
          group: "image",
          items: [
            {
              title: "New Image",
              route: "imageNew"
            }
          ]
        }
      ],
      backup: [
        {
          title: "Backups",
          route: "backupOverview",
          group: "backup",
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
          group: "backupDest",
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
          group: "backupSchedule",
          items: [
            {
              title: "New Schedule",
              route: "scheduleNew"
            }
          ]
        }
      ],
      misc: [
        {
          title: "Users",
          route: "userOverview",
          group: "user",
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
        {
          title: "Import",
          route: "importOverview",
          group: "import",
          items: []
        }
      ]
    };
  }
};
</script>

<style>
/*.router-link-active {*/
/*background: blue;*/
/*color: white;*/
/*}*/
</style>
