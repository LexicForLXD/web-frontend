<template>
    <v-card v-if="backup">
        <v-toolbar>
            <v-toolbar-title>
                {{backup.timestamp}}
            </v-toolbar-title>
        </v-toolbar>
        <v-card-text v-if="!restore">
            <p><b>Destination:</b> {{destination.name}}</p>
            <p><b>Schedule:</b> {{schedule.name}}</p>
            <p><b>Containers:</b></p>
            <ul v-for="container in containers">
                <router-link
                        :to="{ name: 'containerSingle', params: {index: containerIndex(container.id)}}" tag="li">
                    {{container.name}}
                </router-link>
            </ul>

        </v-card-text>
        <v-card-text v-else>
            Select a host to get a list of possible tarballs
            <v-select
                    :items="hosts"
                    v-model="hostId"
                    label="Host"
                    required
                    item-value="id"
                    item-text="name"
                    :rules="[v => !!v || 'Host is required']"
            />
            <v-list>
                <v-list-tile v-for="tarball in tarballList" :key="tarball.name">
                    <v-list-tile-action>
                        <v-icon>restore</v-icon>
                    </v-list-tile-action>
                </v-list-tile>

            </v-list>
        </v-card-text>
        <v-card-actions>
            <v-btn @click="restore = true" v-show="!restore">Delete</v-btn>
            <v-btn @click="restore = false" v-show="restore">Abort</v-btn>
            <v-btn @click="onStartRestore">Restore</v-btn>
        </v-card-actions>
    </v-card>

</template>

<script>
    import {mapGetters, mapMutations} from "vuex";
    import restoreApi from "../../api/backup/backupRestore"
    import {LOADING_BEGIN, LOADING_FAIL, LOADING_FINISH} from "../../store/mutation-types";


    export default {
        computed: {
            ...mapGetters({
                hosts: "getHosts"
            }),

            backup() {
                return this.$store.getters.getBackupByIndex(this.index);
            },

            destination() {
                return this.$store.getters.getBackupDestinationById(this.backup.destinationId);
            },

            destinationIndex() {
                return this.$store.getters.getBackupDestinationIndexById(this.backup.destinationId);
            },

            schedule() {
                return this.$store.getters.getBackupScheduleById(this.backup.backupScheduleId);
            },

            scheduleIndex() {
                return this.$store.getters.getBackupScheduleIndexById(this.backup.backupScheduleId);
            },

            containers() {
                return this.$store.getters.getContainersByIds(this.backup.containerId);
            }
        },
        data() {
            return {
                restore: false,
                error: "",
                index: this.$route.params.index,
                tarballList: [],
                hostId: "",
            };
        },

        watch: {
            hostId: function () {
                this.getTarballs();
            }
        },


        methods: {
            ...
                mapMutations({
                    startLoading: LOADING_BEGIN,
                    stopLoading: LOADING_FINISH,
                    failLoading: LOADING_FAIL
                }),

            containerIndex(id) {
                return this.$store.getters.getContainerIndexById(id);
            },

            onDelete() {
                this.$store.dispatch("deleteBackup", this.backup.id);
            },

            onCancel() {
                this.restore = false;
            },

            onStartRestore() {
                this.restore = true;
            },

            getTarballs() {
                this.startLoading();
                restoreApi.getFiles(this.backup.id, this.hostId).then(res => {
                    this.tarballList = res.data;
                    this.stopLoading();
                }).catch(error => {
                    this.error = error;
                    this.failLoading();
                })
            },

            onRestore() {
                this.startLoading();
                restoreApi.restore(this.backup.id).then(res => {
                    this.logsList = res.data;
                    this.stopLoading();
                }).catch(error => {
                    this.error = error;
                    this.failLoading();
                })
            }


        }
    }
    ;
</script>

<style>
</style>