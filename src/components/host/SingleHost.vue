<template>
    <v-container fluid>
        <v-layout row wrap>
            <v-flex xs12>
                <v-card v-if="host" class="my-2">
                    <v-toolbar>
                        <v-toolbar-title>
                            Name: {{host.name}}
                        </v-toolbar-title>
                    </v-toolbar>

                    <v-card-text v-if="!editing && !editName">
                        <p v-if="host.domainName">DomainName: {{host.domainName}}</p>
                        <p v-if="host.ipv4">ipv4: {{host.ipv4}}</p>
                        <p v-if="host.ipv6">ipv6: {{host.ipv6}}</p>
                        <p v-if="host.port">Port: {{host.port}}</p>
                        <div v-if="host.containerId">
                            Containers:
                            <v-list>
                                <v-list-tile v-for="container in containersForHost">
                                    <v-list-tile-content>
                                        <router-link :to="{name: 'containerSingle', params: {index: getContainerIndex(container.id)}}">{{container.name}}</router-link>
                                    </v-list-tile-content>
                                </v-list-tile>
                            </v-list>
                        </div>
                    </v-card-text>


                    <v-card-text v-if="editName">
                        <v-text-field
                                label="Name"
                                v-model="name"
                                :rules="[v => !!v || 'Name is required']"
                                required
                        />

                        <v-btn @click="onChangeNameSubmit">Save</v-btn>

                    </v-card-text>

                    <v-card-actions>
                        <v-btn flat @click="onEdit">Edit</v-btn>
                        <v-btn flat @click="onDelete">Delete</v-btn>
                        <v-btn flat :to="{name: 'hostAuth', params: {index: index}}">Authenticate</v-btn>
                    </v-card-actions>

                </v-card>
            </v-flex>

            <v-flex xs12>
                <v-card class="my-2">
                    <v-toolbar>
                        <v-toolbar-title>
                            Monitoring
                        </v-toolbar-title>
                    </v-toolbar>
                    <v-card-text>
                        <v-tabs v-model="active" fixed-tabs grow>
                            <v-tab key="logs">Logs</v-tab>
                            <v-tab key="nagios">Nagios</v-tab>

                            <v-tab-item key="logs">
                                <!--<log-host v-if="host" :containerId="host.id"/>-->
                            </v-tab-item>

                            <v-tab-item key="nagios">
                                <!--<nagios-host v-if="host" :containerId="host.id"/>-->
                            </v-tab-item>
                        </v-tabs>
                    </v-card-text>
                </v-card>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        computed: {
            ...mapGetters({
                hosts: "getHosts",
            }),
            containersForHost() {
                return this.$store.getters.getContainersByIds(this.host.containerId)
            },

            host() {
                return this.hosts[this.index];
            },

        },
        data() {
            return {
                editing: false,
                editIpv4: "",
                editIpv6: "",
                editDomainName: "",
                editName: "",
                editPort: "",
                // editSettings: "",
                // editMac: "",
                index: this.$route.params.index,
            };
        },
        methods: {
            onDelete() {
                this.$store.dispatch("deleteHost", this.hosts[this.index].id);
                this.$router.push({name: 'hostOverview'});
            },
            onEdit() {
                this.editIpv4 = this.hosts[this.index].ipv4;
                this.editIpv6 = this.hosts[this.index].ipv6;
                this.editDomainName = this.hosts[this.index].domainName;
                this.editName = this.hosts[this.index].name;
                this.editPort = this.hosts[this.index].port;
                this.editing = true;
            },
            onCancel() {
                this.editing = false;
            },
            onUpdate() {
                this.$store.dispatch("updateHost", {
                    host_id: this.hosts[this.index].id,
                    host: {
                        name: this.editName,
                        ipv4: this.editIpv4,
                        ipv6: this.editIpv6,
                        domainName: this.editDomainName,
                        port: this.editPort,
                    }
                });
                this.editing = false;
            },
            getContainerIndex(id) {
                return this.$store.getters.getContainerIndexById(id);
            }

        }
    };
</script>

<style>
</style>