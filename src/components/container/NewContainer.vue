<template>
    <div>
        <div class="field">
            <label class="label">Name</label>
            <div class="control">
                <input class="input" type="text" v-model="name">
            </div>
        </div>


        <div class="field">
            <label class="label">Source type</label>
            <div class="control">
                <div class="select">
                    <select name="type_select" v-model="selectedType">
                        <option value="migration">Migration</option>
                        <option value="copy">Copy</option>
                        <option value="image">Image</option>
                        <option value="none">None</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="field">
            <label class="label">Profiles</label>
            <div class="control" v-if="profiles.length > 0">
                <div class="select is-multiple">
                    <select multiple name="profiles_select" v-model="selectedProfiles"  v-bind:size="profiles.length">
                        <option v-for="profile in profiles" v-bind:key="profile.id" v-bind:value="profile.id">
                            {{ profile.name }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <div class="field">
            <label class="label">Host</label>
            <div class="control">
                <div class="select" v-bind:class="{'is-loading': hostLoading.isLoading}">
                    <select name="host_select" v-model="selectedHost">
                        <option value="-1" disabled>Select a host...</option>
                        <option v-for="host in hosts" v-bind:key="host.id" v-bind:value="host.id">
                            {{ host.name }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <div class="field">
            <label class="label">Config</label>
            <div class="control">
                <textarea class="textarea" v-model="config" placeholder='{"limits.cpu": "2"}'/>
            </div>
        </div>

        <div class="field">
            <label class="label">Devices</label>
            <div class="control">
                <textarea class="textarea" v-model="devices"/>
            </div>
        </div>

        <div class="field">
            <label class="label" for="ephemeral">Ephemeral</label>
            <div class="control">
                <input type="checkbox" id="ephemeral" v-model="ephemeral">
                <label for="ephemeral">Ephemeral</label>
            </div>
        </div>


        <div v-if="selectedType == 'image'">

            <div class="field">
                <label class="label">Fingerprint</label>
                <div class="control" v-bind:class="{'is-loading': imageLoading.isLoading}">
                    <div class="select">
                        <select name="fingerprint_select" v-model="selectedFingerprint">
                            <option value="-1" disabled>Select a fingerprint</option>
                            <option v-for="image in images" v-bind:key="image.id" v-bind:value="image.fingerprint">
                                {{ image.fingerprint.substring(0,10) }}...
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            OR

            <div class="field">
                <label class="label">Alias</label>
                <div class="control" >
                    <div class="select">
                        <select name="alias_select" v-model="selectedAlias">
                            <option value="-1" disabled>Select a alias</option>
                            <option v-for="image in imageAliases" v-bind:key="image.aliases[0].id" v-bind:value="image.aliases[0].name">
                                {{image.aliases[0].name}}
                            </option>
                        </select>
                    </div>
                </div>
            </div>

        </div>

        <div v-if="selectedType == 'copy' || selectedType == 'migration'">
            <div class="field">
                <label class="label">Containers</label>
                <div class="control" >
                    <div class="select" v-bind:class="{'is-loading': containerLoading.isLoading}">
                        <select name="container_select" v-model="selectedContainer">
                            <option v-for="container in containers" v-bind:key="container.id" v-bind:value="container.id">
                                {{ container.name }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>

            <div class="field">
                <label class="label" for="containerOnly">Container only</label>
                <div class="control">
                    <input type="checkbox" id="containerOnly" v-model="containerOnly">
                    <label for="containerOnly">Container only</label>
                </div>
            </div>

            <div class="field" v-if="selectedType === 'migration'">
                <label class="label" for="live">Live</label>
                <div class="control">
                    <input type="checkbox" id="live" v-model="live">
                    <label for="live">Live</label>
                </div>
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
                hosts: "getHosts",
                containers: "getContainers",
                profiles: "getProfiles",
                containerLoading: "getContainerLoading",
                hostLoading: "getHostLoading",
                imageLoading: "getImageLoading",
            }),
            images () {
                return this.$store.getters.getImagesForHost(this.selectedHost)
            },
            imageAliases () {
                return this.$store.getters.getImagesWithAliasesForHost(this.selectedHost)
            }

        },

        data() {
            return {
                // bool
                fingerprintBool: false,
                aliasBool: false,
                selectedType: "image",

                //data
                selectedProfiles: [],
                selectedHost: "-1",
                selectedFingerprint: "-1",
                selectedAlias: "-1",
                selectedContainer: "-1",
                containerOnly: true,
                live: false,
                ephemeral: false,
                name: "",
                config: "",
                devices: "{\n" +
                "   \"root\": {\n" +
                "       \"path\": \"/\",\n" +
                "       \"type\": \"disk\",\n" +
                "       \"pool\": \"default\"\n" +
                "    } \n" +
                "}",
                architecture: "",


            };
        },

        methods: {
            onSubmit() {
                let bodyConfig = {};
                let bodyDevices =  {};



                try {
                    bodyConfig = JSON.parse(this.config);
                } catch(err) {
                    bodyConfig = ""
                }

                try {
                    bodyDevices = JSON.parse(this.devices);
                } catch(err) {
                    bodyDevices = ""
                }


                let data = {
                    container: {},
                    hostId: Number(this.selectedHost),
                    type: this.selectedType
                };

                if(this.selectedType == 'none') {
                    data.container = {
                        name: this.name,
                        architecture: this. architecture,
                        ephemeral: this.ephemeral,
                        config: bodyConfig,
                        devices: bodyDevices,
                        profiles: this.selectedProfiles
                    }
                } else if(this.selectedType == 'image')
                {

                    data.container = {
                        name: this.name,
                        architecture: this. architecture,
                        ephemeral: this.ephemeral,
                        config: bodyConfig,
                        devices: bodyDevices,
                        profiles: this.selectedProfiles,
                        fingerprint: this.selectedFingerprint,
                        alias: this.selectedAlias,
                    }
                } else if(this.selectedType === 'copy') {
                    data.container = {
                        name: this.name,
                        architecture: this. architecture,
                        ephemeral: this.ephemeral,
                        config: bodyConfig,
                        devices: bodyDevices,
                        profiles: this.selectedProfiles,
                        oldContainerId: this.selectedContainer,
                        containerOnly: this.containerOnly
                    }
                } else if(this.selectedType === 'migration') {
                    data.container = {
                        name: this.name,
                        architecture: this. architecture,
                        ephemeral: this.ephemeral,
                        config: bodyConfig,
                        devices: bodyDevices,
                        profiles: this.selectedProfiles,
                        oldContainerId: this.selectedContainer,
                        containerOnly: this.containerOnly,
                        live: this.live
                    }
                }

                Object.keys(data.container).forEach(
                    key =>
                        (data.container[key] === null || data.container[key] === "-1" ||  data.container[key] === undefined || data.container[key].length) ===
                        0 && delete data.container[key]
                );


                this.$store.dispatch("createContainer", data).then(() => {
                    this.$router.push({name: "containerOverview"})
                }).catch(() => {

                });
            }
        }
    }
</script>

<style>

</style>
