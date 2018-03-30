<template>
    <div>
        <div v-if="!editing">
            <div v-if="profiles[index]" class="card">
                <header class="card-header">
                    <div class="card-header-title">
                        Name: {{profiles[index].name}}
                    </div>
                </header>
                <div class="card-content">
                    <p v-if="profiles[index].description">Description: {{profiles[index].description}}</p>
                    <p v-if="profiles[index].config">Config: {{profiles[index].config}}</p>
                    <p v-if="profiles[index].devices">Devices: {{profiles[index].devices}}</p>
                    <div v-if="profiles[index].containerId">
                        Containers:
                        <ul v-for="container in containersForHost">
                            <li> {{container.name}}</li>
                        </ul>
                    </div>
                    <div v-if="profiles[index].hostId">
                        Hosts:
                        <ul v-for="host in containersForHost">
                            <li> {{host.name}}</li>
                        </ul>
                    </div>

                </div>
                <footer class="card-footer">
                    <a href="#" class="card-footer-item" @click="onEdit">Edit</a>
                    <a href="#" class="card-footer-item" @click="onDelete">Delete</a>
                </footer>
            </div>
        </div>
        <div v-if="editing">
            <label class="label">Name</label>
            <input class="input" type="text" v-model="editName">

            <label class="label">Description</label>
            <input class="input" type="text" v-model="editDescription">

            <div class="field">
                <label class="label">Config</label>
                <div class="control">
                    <textarea class="textarea" v-model="editConfig"/>
                </div>
            </div>


            <div class="field">
                <label class="label">Devices</label>
                <div class="control">
                    <textarea class="textarea" v-model="editDevices"/>
                </div>
            </div>

            <button class="button" @click="onUpdate">Save</button>
            <button class="button" @click="onCancel">Abort</button>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        computed: {
            ...mapGetters({
                profiles: "getProfiles",
            }),
            // containersForHost () {
            //     return this.$store.getters.getSingleContainerById(this.profiles[this.index].containerId)
            // }
        },
        data() {
            return {
                editing: false,
                editDescription: "",
                editConfig: {},
                editDevices: "",
                index: this.$route.params.index,
            };
        },
        methods: {
            onDelete() {
                this.$store.dispatch("deleteProfile", this.profiles[this.index].id);
                this.$router.push({ name: "profileOverview"});
            },
            onEdit() {
                this.editDescription = this.profiles[this.index].description;
                this.editName = this.profiles[this.index].name;
                this.editConfig = JSON.stringify(this.profiles[this.index].config);
                this.editDevices = JSON.stringify(this.profiles[this.index].devices);
                this.editing = true;
            },
            onCancel() {
                this.editing = false;
            },
            onUpdate() {
                this.$store.dispatch("updateProfile", {
                    profile_id: this.profiles[this.index].id,
                    profile: {
                        name: this.editName,
                        description: this.editDescription,
                        config: JSON.parse(this.editConfig),
                        devices: JSON.parse(this.editDevices),
                    }
                });
                this.editing = false;
            },


        }
    };
</script>

<style>
</style>