<template>
    <v-list>
        <v-list-group>
            <v-list-tile :to="{name: 'hostOverview'}" slot="activator">
                <v-list-tile-content>
                    Hosts
                </v-list-tile-content>
            </v-list-tile>
            <v-list >
                <v-list-tile :to="{name: 'hostNew'}" >
                    <v-list-tile-content>
                        New Host
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-list-group>
    </v-list>
</template>

v-show="this.$store.state.route.path.includes('/hosts')"