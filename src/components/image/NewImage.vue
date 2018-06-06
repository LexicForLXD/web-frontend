<template>
    <v-form v-model="valid">
        <v-text-field
                label="Filename"
                v-model="filename"
        />

        <v-checkbox
                label="Public"
                v-model="public"
        />

        <v-text-field
                label="Alias name"
                v-model="aliases[0].name"
        />

        <v-text-field
                label="Alias description"
                v-model="aliases[0].description"
        />

        <v-select
                :items="hosts"
                v-model="hostId"
                label="Host"
                required
                item-value="id"
                item-text="name"
                :rules="[v => !!v || 'Host is required']"
        />


        <v-text-field
                label="Properties"
                v-model="properties"
                multi-line
                placeholder='{"os": "Alpine"}'
        />

        <v-select
                :items="sourceTypes"
                v-model="source.type"
                label="Source Type"
                required
                item-value="value"
                item-text="text"
                :rules="[v => !!v || 'Source type is required']"
        />


        <div v-if="source.type === 'image'">
            <v-checkbox
                    label="Automatic update"
                    v-model="autoUpdate"
            />

            <v-text-field
                    label="Remote server"
                    v-model="source.server"
                    required
                    :rules="[v => !!v || 'Server is required']"
            />

            <v-text-field
                    label="Protocol"
                    v-model="source.protocol"
                    required
                    :rules="[v => !!v || 'Protocol is required']"
                    placeholder="lxd"
            />

            <v-text-field
                    label="Alias"
                    v-model="source.alias"
                    required
                    :rules="[v => !!v || 'Alias is required']"
                    placeholder="alpine/3.7/amd64"
            />

        </div>

        <div v-if="source.type === 'container'">
            <v-select
                    :items="containers"
                    v-model="source.name"
                    label="Host"
                    required
                    item-value="name"
                    item-text="name"
                    :rules="[v => !!v || 'Host is required']"
            />


            <v-text-field
                    label="Compression algorithm"
                    v-model="compressionAlgo"
                    required
                    :rules="[v => !!v || 'Compression algorithm is required']"
                    placeholder="rm"
            />
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
</template>

<script>
    import {mapGetters} from 'vuex'
    import remoteImageApi from '../../api/image/remoteImage'

    export default {
        computed: {
            ...mapGetters({
                imageErrors: "getImageErrors",

                hosts: "getHosts"
            }),
            containers () {
                return this.$store.getters.getContainersFromHost(this.hostId)
            },

            remoteAliases() {
                let aliases;
                remoteImageApi.fetch().then((res) => {
                    aliases = res.data.metadata;
                    console.log(aliases);
                    return aliases;
                    // return aliases.map(a => a.replace('/1.0/images/aliases/', ''));
                }).catch(() => {
                    return[]
                })

            }
        },

        data() {
            return {
                filename: "",
                public: false,
                autoUpdate: true,
                aliases: [
                    {
                        name: "",
                        description: ""
                    }
                ],
                source: {
                    type: "",
                    mode: "pull",
                    server: "https://uk.images.linuxcontainers.org:8443",
                    protocol: "",
                    alias: "",
                    name: "",
                },
                properties: "",
                compressionAlgo: "",

                hostId: "",
                valid: false,
                sourceTypes: [
                    {
                        value: "image",
                        text: "Remote image"
                    },
                    {
                        value: "container",
                        text: "Container"
                    }
                ],
                error: "",
            };
        },

        methods: {
            onSubmit() {
                let body;

                if(this.source.type === "container"){
                    body = {
                        image: {
                            filename: this.filename,
                            public: this.public,
                            aliases: this.aliases,
                            source: {
                                type: this.source.type,
                                name: this.source.name
                            },
                            properties: JSON.parse(this.properties),
                            compression_algorithm: this.compressionAlgo
                        },
                        hostId: this.hostId
                    }
                } else {
                    body = {
                        image: {
                            filename: this.filename,
                            public: this.public,
                            autoUpdate: this.autoUpdate,
                            aliases: this.aliases,
                            source: {
                                type: this.source.type,
                                mode: this.source.mode,
                                server: this.source.server,
                                protocol: this.source.protocol,
                                alias: this.source.alias
                            },
                            properties: JSON.parse(this.properties),
                        },
                        hostId: this.hostId
                    }
                }

                Object.keys(body).forEach(
                    key =>
                        (body[key] === null || body[key] === undefined || body[key].length) ===
                        0 && delete body[key]
                );


                this.$store.dispatch("createImage", body).then(() => {
                    this.$router.push({ name: "imageOverview"})
                }).catch((error) => {
                    this.error = error.response.data.error.message;
                });
            }
        }
    }
</script>

<style>

</style>
