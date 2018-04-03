<template>
    <div>
        <div class="field">
            <label class="label">Name</label>
            <div class="control">
                <input class="input" type="text" v-model="name">
            </div>
            <div v-if="backupDestErrors.name.length > 0" class="help is-danger">
                {{backupDestErrors.name}}
            </div>
        </div>

        <div class="field">
            <label class="label">Protocol</label>
            <div class="control">
                <input class="input" type="text" v-model="protocol">
            </div>
            <div v-if="backupDestErrors.protocol.length > 0" class="help is-danger">
                {{backupDestErrors.protocol}}
            </div>
        </div>

        <div class="field">
            <label class="label">Path</label>
            <div class="control">
                <input class="input" type="text" v-model="path">
            </div>
            <div v-if="backupDestErrors.path.length > 0" class="help is-danger">
                {{backupDestErrors.path}}
            </div>
        </div>

        <div class="field">
            <label class="label">Hostname</label>
            <div class="control">
                <input class="input" type="text" v-model="hostname">
            </div>
            <div v-if="backupDestErrors.hostname.length > 0" class="help is-danger">
                {{backupDestErrors.hostname}}
            </div>
        </div>

        <div class="field">
            <label class="label">Username</label>
            <div class="control">
                <input class="input" type="text" v-model="username">
            </div>
            <div v-if="backupDestErrors.username.length > 0" class="help is-danger">
                {{backupDestErrors.username}}
            </div>
        </div>

        <div class="field">
            <label class="label">Password</label>
            <div class="control">
                <input class="input" type="password" v-model="password">
            </div>
            <div v-if="backupDestErrors.password.length > 0" class="help is-danger">
                {{backupDestErrors.password}}
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
                backupDestErrors: "getBackupDestinationErrors"
            })
        },

        data() {
            return {
                name: "",
                protocol: "",
                path: "",
                hostname: "",
                username: "",
                password: "",
            };
        },

        methods: {
            onSubmit() {
                let body = {
                    name: this.name,
                    protocol: this.protocol,
                    path: this.path,
                    hostname: this.hostname,
                    username: this.username,
                    password: this.password,
                }

                Object.keys(body).forEach(
                    key =>
                        (body[key] === null || body[key] === undefined || body[key].length) ===
                        0 && delete body[key]
                );


                this.$store.dispatch("createBackupDestination", body).then(() => {
                    this.$router.push({ name: "destinationOverview"})
                }).catch(() => {

                });
            }
        },
    }
</script>

<style>

</style>
