<template>
    <div>
        <div v-if="!editing">
            <div v-if="backupDest" class="card">
                <header class="card-header">
                    <div class="card-header-title">
                        Name: {{backupDest.name}}
                    </div>
                </header>
                <div class="card-content">
                    <p v-if="backupDest.protocol">Protocol: {{backupDest.protocol}}</p>
                    <p v-if="backupDest.path">Path: {{backupDest.path}}</p>
                    <p v-if="backupDest.hostname">Hostname: {{backupDest.hostname}}</p>
                    <p v-if="backupDest.username">Username: {{backupDest.username}}</p>
                </div>
                <footer class="card-footer">
                    <a href="#" class="card-footer-item" @click="onEdit">Edit</a>
                    <a href="#" class="card-footer-item" @click="onDelete">Delete</a>
                </footer>
            </div>
        </div>
        <div v-if="editing">

            <div class="field">
                <label class="label">Name</label>
                <div class="control">
                    <input class="input" type="text" v-model="editName">
                </div>
                <div v-if="backupDestErrors.name.length > 0" class="help is-danger">
                    {{backupDestErrors.name}}
                </div>
            </div>

            <div class="field">
                <label class="label">Protocol</label>
                <div class="control">
                    <input class="input" type="text" v-model="editProtocol">
                </div>
                <div v-if="backupDestErrors.protocol.length > 0" class="help is-danger">
                    {{backupDestErrors.protocol}}
                </div>
            </div>

            <div class="field">
                <label class="label">Path</label>
                <div class="control">
                    <input class="input" type="text" v-model="editPath">
                </div>
                <div v-if="backupDestErrors.path.length > 0" class="help is-danger">
                    {{backupDestErrors.path}}
                </div>
            </div>

            <div class="field">
                <label class="label">Hostname</label>
                <div class="control">
                    <input class="input" type="text" v-model="editHostname">
                </div>
                <div v-if="backupDestErrors.hostname.length > 0" class="help is-danger">
                    {{backupDestErrors.hostname}}
                </div>
            </div>

            <div class="field">
                <label class="label">Username</label>
                <div class="control">
                    <input class="input" type="text" v-model="editUsername">
                </div>
                <div v-if="backupDestErrors.username.length > 0" class="help is-danger">
                    {{backupDestErrors.username}}
                </div>
            </div>

            <div class="field">
                <label class="label">Password</label>
                <div class="control">
                    <input class="input" type="password" v-model="editPassword">
                </div>
                <div v-if="backupDestErrors.password.length > 0" class="help is-danger">
                    {{backupDestErrors.password}}
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
                backupDests: "getBackupDestinations",
                backupDestErrors: "getBackupDestinationErrors",
            }),

            backupDest() {
                return this.backupDests[this.index];
            }
        },
        data() {
            return {
                editing: false,
                editName: "",
                editProtocol: "",
                editPath: "",
                editHostname: "",
                editUsername: "",
                editPassword: "",

                index: this.$route.params.index,
            };
        },
        methods: {
            onDelete() {
                this.$store.dispatch("deleteBackupDestination", this.backupDest.id);
                this.$router.push({name: "destinationOverview"})
            },
            onEdit() {
                this.editName = this.backupDest.name;
                this.editProtocol = this.backupDest.protocol;
                this.editPath = this.backupDest.path;
                this.editHostname = this.backupDest.hostname;
                this.editUsername = this.backupDest.username;
                this.editPassword = this.backupDest.password;
                this.editing = true;
            },
            onCancel() {
                this.editing = false;
            },
            onUpdate() {
                this.$store.dispatch("updateBackupDestination", {
                    backupDestination_id: this.backupDest.id,
                    backupDestination: {
                        name: this.editName,
                        protocol: this.editProtocol,
                        path: this.editPath,
                        hostname: this.editHostname,
                        username: this.editUsername,
                        password: this.editPassword,
                    }
                });
                this.editing = false;
            },


        }
    };
</script>

<style>
</style>