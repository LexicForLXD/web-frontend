<template>
    <div>
        <v-flex>
            <v-card v-if="container" p3>
                <v-toolbar>
                    <v-toolbar-title>
                        Name: {{container.name}}
                    </v-toolbar-title>
                </v-toolbar>

                <v-card-text  v-if="!editing && !editName">
                    <p v-if="container.architecture">Architecture: {{container.architecture}}</p>
                    <p v-if="container.config">Config: {{container.config}}</p>
                    <p v-if="container.devices">Devices: {{container.devices}}</p>
                    <p v-if="container.state">State: {{container.state}}</p>
                    <p>
                        Host:
                        <router-link :to="{name: 'hostSingle', params: {index: hostIndex}}">{{host.name}}
                        </router-link>
                    </p>

                    <a href="#" class="button" @click="onStart" v-bind:disabled="container.state != 'stopped'">Start</a>
                    <a href="#" class="button" @click="onRestart"
                       v-bind:disabled="container.state == 'stopped'">Restart</a>
                    <a href="#" class="button" @click="onStop" v-bind:disabled="container.state == 'stopped'">Stop</a>
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
                    <v-btn flat @click="onChangeName">Change name</v-btn>
                </v-card-actions>

            </v-card>
        </v-flex>

        <v-spacer/>
        <v-flex>
            <v-card p3>
                <v-toolbar>
                    <v-toolbar-title>
                        Monitoring
                    </v-toolbar-title>
                </v-toolbar>
                <v-card-text>
                    <v-tabs v-model="active">
                        <v-tab key="logs">Logs</v-tab>
                        <v-tab key="nagios">Nagios</v-tab>

                        <v-tab-item key="logs">
                            <log-container :containerId="container.id"/>
                        </v-tab-item>
                    </v-tabs>
                </v-card-text>
            </v-card>
        </v-flex>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import stateApi from "../../api/containers/containerState"
    import LogContainer from "./logs/LogContainer"

    export default {
        components: {
            LogContainer
        },

        computed: {
            ...mapGetters({
                containers: "getContainers",
            }),
            host() {
                return this.$store.getters.getHostById(this.container.hostId);
            },

            hostIndex() {
                return this.$store.getters.getHostIndexById(this.container.hostId)
            },

            container() {
                return this.containers[this.index];
            }
        },
        data() {
            return {
                name: "",
                editing: false,
                editIpv4: "",
                editIpv6: "",
                editDomainName: "",
                editName: false,
                editPort: "",
                // editSettings: "",
                // editMac: "",
                index: this.$route.params.index,
                // hostIndex: "",
                active: null,
            };
        },
        methods: {
            onDelete() {
                this.$store.dispatch("deleteContainer", this.container.id);
                this.$router.push({name: 'containerOverview'});
            },
            onEdit() {
                this.editIpv4 = this.containers.ipv4;
                this.editIpv6 = this.containers.ipv6;
                this.editDomainName = this.containers.domainName;
                this.editName = this.containers.name;
                this.editPort = this.containers.port;
                this.editing = true;
            },
            onCancel() {
                this.editing = false;
                this.editName = false;
            },
            onUpdate() {
                this.$store.dispatch("updateImage", {
                    host_id: this.containers[this.index].id,
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

            onChangeName() {
                this.editName = !this.editName;
            },

            onChangeNameSubmit() {
                this.$store.dispatch("updateContainer", {
                    containerId: this.container.id,
                    container: {
                        name: this.name
                    }
                })
            },

            onStart() {
                stateApi.change(this.container.id, {action: "start"});
            },

            onRestart() {
                stateApi.change(this.container.id, {action: "restart"});
            },

            onStop() {
                stateApi.change(this.container.id, {action: "stop"});
            }


        }
    };
</script>

<style>
</style>