<template>
    <v-form v-model="valid">
        <v-text-field
                label="Name"
                v-model="name"
                :rules="[v => !!v || 'Name is required']"
                required
        />

        <v-text-field
                label="Protocol"
                v-model="protocol"
                :rules="[v => !!v || 'Protocol is required']"
                required
        />

        <v-text-field
                label="Path"
                v-model="path"
                :rules="[v => !!v || 'Path is required']"
                required
        />

        <v-text-field
                label="Hostname"
                v-model="hostname"
        />

        <v-text-field
                label="username"
                v-model="username"
        />

        <v-text-field
                label="Password"
                v-model="password"
                :type="e1 ? 'password' : 'text'"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
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
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                backupDestErrors: "getBackupDestinationErrors"
            })
        },

        data() {
            return {
                valid: false,
                e1: true,

                name: "",
                protocol: "",
                path: "",
                hostname: "",
                username: "",
                password: "",
                error: "",
            };
        },

        methods: {
            onSubmit() {
                let body = {
                    name: this.name,
                    protocol: this.protocol,
                    path: this.path,
                    hostname: this.hostname,
                    username: this.username,
                    password: this.password,
                };

                Object.keys(body).forEach(
                    key =>
                        (body[key] === null || body[key] === undefined || body[key].length) ===
                        0 && delete body[key]
                );


                this.$store.dispatch("createBackupDestination", body).then(() => {
                    this.$router.push({ name: "destinationOverview"})
                }).catch((error) => {
                    this.error = error.response.data.error.message;

                });
            }
        },
    }
</script>

<style>

</style>
