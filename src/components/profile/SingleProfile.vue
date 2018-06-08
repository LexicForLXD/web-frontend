<template>
    <v-card v-if="profile">
        <v-toolbar>
            <v-toolbar-title>
                Name: {{profile.name}}
            </v-toolbar-title>
        </v-toolbar>
        <v-card-text v-if="!editing">
            <p v-if="profile.description"><b>Description:</b> {{profiles[index].description}}</p>
            <p v-if="profile.config"><b>Config:</b> {{profiles[index].config}}</p>
            <p v-if="profile.devices"><b>Devices:</b> {{profiles[index].devices}}</p>
        </v-card-text>
        <v-card-text v-else>
            <v-form v-model="valid">
                <v-text-field
                        label="Description"
                        v-model="editDescription"
                />

                <v-text-field
                        label="Config"
                        v-model="editConfig"
                        multi-line
                        placeholder='{"limits.cpu": "2"}'
                />

                <v-text-field
                        label="Devices"
                        v-model="editDevices"
                        multi-line
                        placeholder='{}'
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
                profiles: "getProfiles",
            }),
            // containersForHost () {
            //     return this.$store.getters.getSingleContainerById(this.profiles[this.index].containerId)
            // }

            profile() {
                return this.profiles[this.index];
            }
        },
        data() {
            return {
                valid: false,
                editing: false,
                editDescription: "",
                editConfig: {},
                editDevices: "",
                index: this.$route.params.index,
                error: "",
            };
        },
        methods: {
            onDelete() {
                this.$store.dispatch("deleteProfile", this.profiles[this.index].id);
                this.$router.push({name: "profileOverview"});
            },
            onEdit() {
                this.editDescription = this.profiles[this.index].description;
                this.editName = this.profiles[this.index].name;
                this.editConfig = JSON.stringify(this.profiles[this.index].config);
                this.editDevices = JSON.stringify(this.profiles[this.index].devices);
                this.editing = true;
            },
            onCancel() {
                this.editing = false;
            },
            onUpdate() {
                this.$store.dispatch("updateProfile", {
                    profile_id: this.profiles[this.index].id,
                    profile: {
                        name: this.editName,
                        description: this.editDescription,
                        config: JSON.parse(this.editConfig),
                        devices: JSON.parse(this.editDevices),
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