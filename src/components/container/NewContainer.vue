<template>
    <div>
        <v-form v-model="valid" @submit="onSubmit">
            <v-text-field
                    label="Name"
                    v-model="name"
                    :rules="[v => !!v || 'Name is required']"
                    required
                    :error-messages="containerErrors.name"
            />

            <v-select
                    :items="hosts"
                    v-model="selectedHost"
                    label="Host"
                    required
                    item-value="id"
                    item-text="name"
                    :rules="[v => !!v || 'Host is required']"
            />

            <v-select
                    :items="profiles"
                    v-model="selectedProfiles"
                    label="Profiles"
                    item-value="id"
                    item-text="name"
                    multiple
            />

            <v-text-field
                    label="Config"
                    v-model="config"
                    multi-line
                    placeholder='{"limits.cpu": "2"}'
                    :error-messages="containerErrors.config"
            />

            <v-text-field
                    label="Devices"
                    v-model="devices"
                    multi-line
                    placeholder='{"limits.cpu": "2"}'
                    required
                    :rules="[v => !!v || 'Devices is required']"
                    :error-messages="containerErrors.devices"
            />

            <v-checkbox
                    label="Ephemeral"
                    v-model="ephemeral"
            />

            <v-select
                    :items="sourceTypes"
                    v-model="selectedType"
                    label="Source Type"
                    required
                    :rules="[v => !!v || 'Source type is required']"
                    :error-messages="containerErrors.sourceType"
            />

            <div v-if="selectedType === 'image'">
                <v-layout row>
                    <v-flex xs12 sm5>
                        <v-select
                                :items="images"
                                v-model="selectedFingerprint"
                                label="Fingerprint"
                                item-value="fingerprint"
                                item-text="fingerprint"
                                :error-messages="containerErrors.fingerprint"
                                clearable
                        />
                        <!--:rules="[-->
                        <!--v => this.selectedAlias === '' && !!v || 'One of alias or fingerprint',-->
                        <!--v => this.selectedAlias === '' || 'Either alias or fingerprint',-->
                        <!--]"-->
                    </v-flex>

                    <v-flex xs12 sm2>
                        OR
                    </v-flex>
                    <v-flex xs12 sm5>
                        <v-select
                                :items="imageAliases"
                                v-model="selectedAlias"
                                label="Alias"
                                item-value="aliases[0].name"
                                item-text="aliases[0].name"
                                :error-messages="containerErrors.alias"
                                clearable
                        />
                        <!--:rules="[-->
                        <!--v => this.selectedFingerprint === '' && !!v || 'One of alias or fingerprint',-->
                        <!--v => this.selectedFingerprint === '' || 'Either alias or fingerprint',-->
                        <!--]"-->
                    </v-flex>
                </v-layout>

            </div>

            <div v-if="selectedType === 'copy' || selectedType === 'migration'">
                <v-select
                        :items="containers"
                        v-model="selectedContainer"
                        label="Containers"
                        item-value="id"
                        item-text="name"
                        required
                />

                <v-checkbox
                        label="Container only"
                        v-model="containerOnly"
                />


                <div v-if="selectedType === 'migration'">
                    <v-checkbox
                            label="Live"
                            v-model="live"
                    />
                </div>
            </div>


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
    import {mapGetters} from "vuex";

    export default {
        computed: {
            ...mapGetters({
                hosts: "getHosts",
                containers: "getContainers",
                profiles: "getProfiles",
                containerErrors: "getContainerErrors"
            }),
            images() {
                return this.$store.getters.getImagesForHost(this.selectedHost);
            },
            imageAliases() {
                return this.$store.getters.getImagesWithAliasesForHost(this.selectedHost);
            }
        },

        data() {
            return {
                // bool
                fingerprintBool: false,
                aliasBool: false,
                selectedType: "",
                valid: false,

                sourceTypes: [
                    "none",
                    "image",
                    "copy",
                    "migration"
                ],

                nameRules: [
                    v => !!v || 'Name is required'
                ],

                imageRules: [
                    () => !!this.selectedHost || 'Please select a host'
                ],

                //data
                selectedProfiles: [],
                selectedHost: "",
                selectedFingerprint: "",
                selectedAlias: "",
                selectedContainer: "",
                containerOnly: true,
                live: false,
                ephemeral: false,
                name: "",
                config: "",
                devices:
                "{\n" +
                '   "root": {\n' +
                '       "path": "/",\n' +
                '       "type": "disk",\n' +
                '       "pool": "default"\n' +
                "    } \n" +
                "}",
                architecture: "",
                error: "",
            };
        },

        methods: {
            onSubmit() {
                let bodyConfig = "";
                let bodyDevices = "";

                try {
                    bodyConfig = JSON.parse(this.config);
                } catch (err) {
                    bodyConfig = "";
                }

                try {
                    bodyDevices = JSON.parse(this.devices);
                } catch (err) {
                    bodyDevices = "";
                }

                let data = {
                    container: {},
                    hostId: this.selectedHost,
                    type: this.selectedType
                };

                if (this.selectedType === "none") {
                    data.container = {
                        name: this.name,
                        architecture: this.architecture,
                        ephemeral: this.ephemeral,
                        config: bodyConfig,
                        devices: bodyDevices,
                        profiles: this.selectedProfiles
                    };
                } else if (this.selectedType === "image") {
                    if (this.selectedFingerprint !== "") {
                        data.container = {
                            name: this.name,
                            architecture: this.architecture,
                            ephemeral: this.ephemeral,
                            config: bodyConfig,
                            devices: bodyDevices,
                            profiles: this.selectedProfiles,
                            fingerprint: this.selectedFingerprint
                        };
                    }
                    if (this.selectedAlias !== "") {
                        data.container = {
                            name: this.name,
                            architecture: this.architecture,
                            ephemeral: this.ephemeral,
                            config: bodyConfig,
                            devices: bodyDevices,
                            profiles: this.selectedProfiles,
                            alias: this.selectedAlias
                        };
                    }
                } else if (this.selectedType === "copy") {
                    data.container = {
                        name: this.name,
                        architecture: this.architecture,
                        ephemeral: this.ephemeral,
                        config: bodyConfig,
                        devices: bodyDevices,
                        profiles: this.selectedProfiles,
                        oldContainerId: this.selectedContainer,
                        containerOnly: this.containerOnly
                    };
                } else if (this.selectedType === "migration") {
                    data.container = {
                        name: this.name,
                        architecture: this.architecture,
                        ephemeral: this.ephemeral,
                        config: bodyConfig,
                        devices: bodyDevices,
                        profiles: this.selectedProfiles,
                        oldContainerId: this.selectedContainer,
                        containerOnly: this.containerOnly,
                        live: this.live
                    };
                }

                Object.keys(data.container).forEach(
                    key =>
                        (data.container[key] === null ||
                            data.container[key] === undefined ||
                            data.container[key].length) === 0 && delete data.container[key]
                );

                this.$store
                    .dispatch("createContainer", data)
                    .then(() => {
                        this.$router.push({name: "containerOverview"});
                    })
                    .catch((error) => {
                        this.error = error.response.data.error.message;
                    });
            }
        }
    };
</script>

<style>

</style>
