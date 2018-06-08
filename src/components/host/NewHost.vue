<template>
    <div>
        <v-form v-model="valid">
            <v-text-field
                    label="Name"
                    v-model="name"
                    :rules="[v => !!v || 'Name is required']"
                    required
                    :error-messages="hostErrors.name"
            >
            </v-text-field>
            <v-text-field
                    label="ipv4"
                    v-model="ipv4"
                    :error-messages="hostErrors.ipv4"
            >
            </v-text-field>
            <v-text-field
                    label="ipv6"
                    v-model="ipv6"
                    :error-messages="hostErrors.ipv6"
            >
            </v-text-field>
            <v-text-field
                    label="Domainname"
                    v-model="domainName"
                    :error-messages="hostErrors.domainName"
            >
            </v-text-field>
            <v-text-field
                    label="Port"
                    v-model="port"
                    :rules="[v => (v>=0 && v<=65555) || 'Port must be valid port number']"
                    :error-messages="hostErrors.port"
            ></v-text-field>

            <v-text-field
                    label="Password"
                    v-model="password"
                    :type="e1 ? 'password' : 'text'"
                    :append-icon="e1 ? 'visibility' : 'visibility_off'"
                    :append-icon-cb="() => (e1 = !e1)"
            ></v-text-field>

            <v-btn
                    @click="onSubmit"
                    :disabled="!valid"
            >
                Submit
            </v-btn>

        </v-form>
        <v-alert :value="error" type="error">
            {{ hostErrors.general }}
        </v-alert>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                hostErrors: "getHostErrors"
            }),

        },

        data() {
            return {
                valid: false,
                name: "",
                ipv4: "",
                ipv6: "",
                domainName: "",
                port: "",
                password: "",
                e1: true,
            };
        },

        methods: {
            onSubmit() {
                let body = {
                    name: this.name,
                    ipv4: this.ipv4,
                    ipv6: this.ipv6,
                    domainName: this.domainName,
                    port: Number(this.port),
                    password: this.password
                };

                Object.keys(body).forEach(
                    key =>
                        (body[key] === null || body[key] === undefined || body[key].length) ===
                        0 && delete body[key]
                );


                this.$store.dispatch("createHost", body).then(() => {
                    this.$router.push({name: "hostOverview"})
                }).catch(() => {
                });
            }
        }
    }
</script>

<style>

</style>
