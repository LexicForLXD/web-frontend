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
            <label class="checkbox">Auto-update</label>
                <input type="checkbox" v-model="autoUpdate"/>
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

        <divb class="field">
            <label class="label">Source type</label>
            <div class="control">
                <div class="select">
                    <select name="sourcetype_select" v-model="selectedSourceType">
                        <option value="remote">Remote</option>
                        <option value="container">Container</option>
                    </select>
                </div>
            </div>
        </divb>

        <div v-if="selectedSourceType === 'remote'">
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
                <label class="label">Image protocol</label>
                <div class="control">
                    <input class="input" type="text" v-model="source.alias" placeholder="alpine/3.7/amd64"/>
                </div>
            </div>
        </div>

        <div class="field" v-if="selectedSourceType === 'container'">
            <label class="label">Container</label>
            <div class="control" v-if="containers.length > 0">
                <div class="select">
                    <select name="container_select" v-model="selectedContainer">
                        <option v-for="container in containers" v-bind:key="container.id" v-bind:value="container.id">
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
            <label class="label">Properties</label>
            <div class="control">
                <textarea class="textarea" v-model="properties" placeholder='{"os": "Alpine"}'/>
            </div>
        </div>


        <button class="button" @click="onSubmit">Save</button>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                imageErrors: "getImageErrors",
                containers: "getContainers"
            })
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
                    type: "image",
                    mode: "pull",
                    server: "",
                    protocol: "",
                    alias: "",
                },
                properties: "",

                selectedSourceType: "",
            };
        },

        methods: {
            onSubmit() {
                let body = {
                    filename: this.filename,
                    public: this.public,
                    autoUpdate: this.autoUpdate,
                    aliases: this.aliases,
                    source: this.source,
                    properties: this.properties
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
