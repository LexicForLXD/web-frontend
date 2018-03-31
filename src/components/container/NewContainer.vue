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
            <div class="control" v-if="hosts.length > 0">
                <div class="select">
                    <select name="host_select" v-model="selectedHost">
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
                <label class="label">Image</label>
                <div class="control" v-if="images.length > 0">
                    <div class="select">
                        <select name="image_select" v-model="selectedImage">
                            <option v-for="image in images" v-bind:key="image.id" v-bind:value="image.fingerprint">
                                {{ image.fingerprint.substring(0,10) }}...
                            </option>
                        </select>
                    </div>
                </div>
            </div>

        </div>

        <div v-if="selectedType == 'copy' || selectedType == 'migration'">
            <div class="field">
                <label class="label">Containers</label>
                <div class="control" v-if="containers.length > 0">
                    <div class="select">
                        <select name="container_select" v-model="selectedContainer">
                            <option v-for="container in containers" v-bind:key="container.id" v-bind:value="container.id">
                                {{ container.name }}
                            </option>
                        </select>
                    </div>
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
                images: "getImages",
            })
        },

        data() {
            return {
                // bool
                fingerprintBool: false,
                aliasBool: false,

                //data
                selectedType: "image",
                selectedProfiles: [],
                selectedHost: "",
                selectedImage: "",
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


            };
        },

        methods: {
            onSubmit() {
                let data = {
                    container: {
                        name: this.name,
                        ephemeral: this.ephemeral,
                        config: JSON.parse(this.config),
                        devices: JSON.parse(this.devices),
                        fingerprint: this.selectedImage,
                        profiles: this.selectedProfiles,
                    },
                    hostId: Number(this.selectedHost),
                    type: this.selectedType,
                }

                Object.keys(data).forEach(
                    key =>
                        (data[key] === null || data[key] === undefined || data[key].length) ===
                        0 && delete data[key]
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
