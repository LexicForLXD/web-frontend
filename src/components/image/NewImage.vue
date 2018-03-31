<template>
    <div>
        <div class="field">
            <label class="label">Filename</label>
            <div class="control">
                <input class="input" type="text" v-model="filename"/>
            </div>
        </div>

        <div class="field">
            <label class="checkbox">Public</label>
                <input type="checkbox" v-model="public"/>
        </div>



        <div class="field">
            <label class="label">Alias name</label>
            <div class="control">
                <input class="input" type="text" v-model="aliases[0].name"/>
            </div>
        </div>

        <div class="field">
            <label class="label">Alias description</label>
            <div class="control">
                <input class="input" type="text" v-model="aliases[0].description"/>
            </div>
        </div>

        <div class="field">
            <label class="label">Properties</label>
            <div class="control">
                <textarea class="textarea" v-model="properties" placeholder='{"os": "Alpine"}'/>
            </div>
        </div>

        <div class="field">
            <label class="label">Host</label>
            <div class="control" v-if="hosts.length > 0">
                <div class="select">
                    <select name="host_select" v-model="hostId">
                        <option v-for="host in hosts" v-bind:key="host.id" v-bind:value="host.id">
                            {{ host.name }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <div class="field">
            <label class="label">Source type</label>
            <div class="control">
                <div class="select">
                    <select name="sourcetype_select" v-model="source.type">
                        <option value="image">Remote image</option>
                        <option value="container">Container</option>
                    </select>
                </div>
            </div>
        </div>

        <div v-if="source.type === 'image'">

            <div class="field">
                <label class="checkbox">Auto-update</label>
                <input type="checkbox" v-model="autoUpdate"/>
            </div>

            <div class="field">
                <label class="label">Image server</label>
                <div class="control">
                    <input class="input" type="text" v-model="source.server" placeholder="https://uk.images.linuxcontainers.org:8443"/>
                </div>
            </div>

            <div class="field">
                <label class="label">Image protocol</label>
                <div class="control">
                    <input class="input" type="text" v-model="source.protocol" placeholer="lxd"/>
                </div>
            </div>

            <div class="field">
                <label class="label">Image alias</label>
                <div class="control">
                    <input class="input" type="text" v-model="source.alias" placeholder="alpine/3.7/amd64"/>
                </div>
            </div>
        </div>

        <div v-if="source.type === 'container'">

            <div class="field">
                <label class="label">Container</label>
                <div class="control" v-if="containers.length > 0">
                    <div class="select">
                        <select name="container_select" v-model="source.name">
                            <option v-for="container in containers" v-bind:key="container.id" v-bind:value="container.name">
                                {{ container.name }}
                            </option>
                        </select>
                    </div>
                </div>
                <div v-else>
                    No Containers available
                </div>
            </div>

            <div class="field">
                <label class="label">Compression algorithm</label>
                <div class="control">
                    <input class="input" type="text" v-model="compressionAlgo"/>
                </div>
            </div>


        </div>






        <button class="button" @click="onSubmit">Save</button>

    </div>
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
                let aliases
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
                    server: "",
                    protocol: "",
                    alias: "",
                    name: "",
                },
                properties: "",
                compressionAlgo: "",

                hostId: "",


            };
        },

        methods: {
            onSubmit() {
                let body;

                if(this.source.type == "container"){
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
                }).catch(() => {

                });
            }
        }
    }
</script>

<style>

</style>
