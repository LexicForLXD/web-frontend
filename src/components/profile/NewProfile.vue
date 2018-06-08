<template>
    <div>
    <v-form v-model="valid">
        <v-text-field
                label="Name"
                v-model="name"
                :rules="[v => !!v || 'Name is required']"
                required
                :error-messages="profileErrors.name"
        />

        <v-text-field
                label="Description"
                v-model="description"
                :error-messages="profileErrors.description"
        />

        <v-text-field
                label="Config"
                v-model="config"
                multi-line
                placeholder='{"limits.cpu": "2"}'
                :error-messages="profileErrors.config"
        />

        <v-text-field
                label="Devices"
                v-model="devices"
                multi-line
                placeholder='{}'
                :error-messages="profileErrors.devices"
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
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                profileErrors: "getProfileErrors"
            })
        },

        data() {
            return {
                valid: false,
                name: "",
                description: "",
                config: "{}",
                devices: "{}",
                error: "",
            };
        },

        methods: {
            onSubmit() {
                let body = {
                    name: this.name,
                    description: this.description,
                    config: JSON.parse(this.config),
                    devices: JSON.parse(this.devices),
                };

                Object.keys(body).forEach(
                    key =>
                        (body[key] === null || body[key] === undefined || body[key].length) ===
                        0 && delete body[key]
                );


                this.$store.dispatch("createProfile", body).then(() => {
                    this.$router.push({name: "profileOverview"})
                }).catch((error) => {
                    this.error = error.response.data.error.message;
                });
            }
        }
    }
</script>

<style>

</style>
