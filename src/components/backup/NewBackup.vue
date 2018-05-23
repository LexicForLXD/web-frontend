<template>
    <v-form v-model="valid">
        <v-text-field
                label="Name"
                v-model="name"
                :rules="[v => !!v || 'Name is required']"
                required
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

</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                destinations: "getBackupDestinations",
                containers: "getContainers",
            })
        },

        data() {
            return {
                valid: false,
                name: "",
                selectedDestination: "",
                selectedContainers: [],
            };
        },

        methods: {
            ...mapActions({
                createBackup: "createBackup"
            }),

            onSubmit() {
                const body = {
                    name: this.name,
                    destination: this.selectedDestination,
                    containers: this.selectedContainers,
                };

                Object.keys(body).forEach(
                    key =>
                        (body[key] === null || body[key] === undefined || body[key].length) ===
                        0 && delete body[key]
                );

                this.createBackup(body).then(() => {
                    this.$router.push({name: "backupOverview"})
                }).catch(() => {

                });
            }
        }
    }
</script>

<style>

</style>
