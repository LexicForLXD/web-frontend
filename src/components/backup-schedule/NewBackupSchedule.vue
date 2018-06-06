<template>
    <v-form v-model="valid">
        <v-text-field
                label="Name"
                v-model="name"
                :rules="[v => !!v || 'Name is required']"
                required
        />

        <v-text-field
                label="Description"
                v-model="description"
        />

        <v-select
                :items="['full','incremental']"
                v-model="type"
                label="Type"
                required
                :rules="[v => !!v || 'Type is required']"
        />

        <v-select
                :items="['daily','weekly', 'monthly']"
                v-model="executionTime"
                label="Execution time"
                required
                :rules="[v => !!v || 'Execution time is required']"
        />

        <v-select
                :items="containers"
                v-model="selectedContainers"
                label="Containers"
                item-value="id"
                item-text="name"
                multiple
                required
                :rules="[v => !!v || 'At least one Container is required']"
        />

        <v-select
                :items="destinations"
                v-model="selectedDestination"
                label="Destination"
                required
                item-value="id"
                item-text="name"
                :rules="[v => !!v || 'Destination is required']"
        />

        <v-btn
                @click="onSubmit"
                :disabled="!valid"
        >
            Submit
        </v-btn>

    </v-form>

    <v-alert :value="error" type="error">
        {{ error }}
    </v-alert>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                scheduleErrors: "getBackupScheduleErrors",
                destinations: "getBackupDestinations",
                containers: "getContainers",
            })
        },

        data() {
            return {
                valid: false,
                name: "",
                description: "",
                executionTime: "",
                type: "",
                selectedDestination: "",
                selectedContainers: [],
                data: "",
            };
        },

        methods: {
            ...mapActions({
                createSchedule: "createBackupSchedule"
            }),

            onSubmit() {
                const body = {
                    name: this.name,
                    description: this.description,
                    executionTime: this.executionTime,
                    type: this.type,
                    destination: this.selectedDestination,
                    containers: this.selectedContainers,
                };

                Object.keys(body).forEach(
                    key =>
                        (body[key] === null || body[key] === undefined || body[key].length) ===
                        0 && delete body[key]
                );

                this.createSchedule(body).then(() => {
                    this.$router.push({name: "scheduleOverview"})
                }).catch(() => {
                    this.error = error.response.data.error.message;

                });
            }
        },
    }
</script>

<style>

</style>
