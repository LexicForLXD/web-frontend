<template>
    <v-card v-if="backupSchedule">
        <v-toolbar>
            <v-toolbar-title>
                Name: {{backupSchedule.name}}
            </v-toolbar-title>
        </v-toolbar>

        <v-card-text v-if="!editing">
            <p><b>Description: </b>{{backupSchedule.description}}</p>
            <p><b>Type: </b>{{backupSchedule.type}}</p>
            <p><b>Execution time: </b>{{backupSchedule.executionTime}}</p>
        </v-card-text>

        <v-card-text v-else>
            <v-form v-model="valid">
                <v-text-field
                        label="Name"
                        v-model="editName"
                        :rules="[v => !!v || 'Name is required']"
                        required
                />

                <v-text-field
                        label="Description"
                        v-model="description"
                />

                <v-select
                        :items="['full','incremental']"
                        v-model="editType"
                        label="Type"
                        required
                        :rules="[v => !!v || 'Type is required']"
                />

                <v-select
                        :items="['daily','weekly', 'monthly']"
                        v-model="editExecutionTime"
                        label="Execution time"
                        required
                        :rules="[v => !!v || 'Execution time is required']"
                />

                <v-select
                        :items="containers"
                        v-model="editSelectedContainers"
                        label="Containers"
                        item-value="id"
                        item-text="name"
                        multiple
                        required
                        :rules="[v => !!v || 'At least one Container is required']"
                />

                <v-select
                        :items="destinations"
                        v-model="editSelectedDestination"
                        label="Destination"
                        required
                        item-value="id"
                        item-text="name"
                        :rules="[v => !!v || 'Destination is required']"
                />

                <v-btn
                        @click="onUpdate"
                        :disabled="!valid"
                >
                    Submit
                </v-btn>
            </v-form>
            <v-alert :value="error" type="error">
                {{ error }}
            </v-alert>
        </v-card-text>

        <v-card-actions v-if="!editing">
            <v-btn flat @click="onEdit">Edit</v-btn>
            <v-btn flat @click="onDelete">Delete</v-btn>
        </v-card-actions>

        <v-card-actions v-else>
            <v-btn flat @click="onCancel">Abort</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        computed: {
            ...mapGetters({
                destinations: "getBackupDestinations",
                containers: "getContainers",
            }),
            backupSchedule () {
                return this.$store.getters.getBackupScheduleByIndex(this.index)
            },

        },
        data() {
            return {
                valid: false,
                editing: false,
                editName: "",
                editDescription: "",
                editType: "",
                editExecutionTime: "",
                editSelectedContainers: [],
                editSelectedDestination: "",
                index: this.$route.params.index,
                error: ""
            };
        },
        methods: {
            onDelete() {
                this.$store.dispatch("deleteBackupSchedule", this.id);
            },
            onEdit() {
                this.editName = this.backupSchedule.name;
                this.editDescription = this.backupSchedule.description;
                this.editType = this.backupSchedule.type;
                this.editExecutionTime = this.backupSchedule.executionTime;
                this.editSelectedContainers = this.backupSchedule.containerId;
                this.editSelectedDestination = this.backupSchedule.destination;
                this.editing = true;
            },
            onCancel() {
                this.editing = false;
            },
            onUpdate() {
                this.$store.dispatch("updateBackupSchedule", {
                    host_id: this.backupSchedule.id,
                    host: {
                        name: this.editName,
                        description: this.editDescription,
                        type: this.editType,
                        executionTime: this.editExecutionTime,
                        containers: this.editSelectedContainers,
                        destination: this.editSelectedDestination,
                    }
                }).then(() => {
                    this.editing = false;
                    this.error = "";
                }).catch((error) => {
                    this.error = error.response.data.error.message;
                });
            },


        }
    };
</script>

<style>
</style>