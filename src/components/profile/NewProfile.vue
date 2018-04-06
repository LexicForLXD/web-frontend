<template>
    <div>
        <div class="field">
            <label class="label">Name</label>
            <div class="control">
                <input class="input" type="text" v-model="name">
            </div>
            <div v-if="profileErrors.name.length > 0" class="help is-danger">
                {{profileErrors.name}}
            </div>
        </div>



        <div class="field">
            <label class="label">Description</label>
            <div class="control">
                <input class="input" type="text" v-model="description">
            </div>
            <div v-if="profileErrors.description.length > 0" class="help is-danger">
                {{profileErrors.description}}
            </div>
        </div>

        <div class="field">
            <label class="label">Config</label>
            <div class="control">
                <textarea class="textarea" v-model="config"/>
            </div>
            <div v-if="profileErrors.config.length > 0" class="help is-danger">
                {{profileErrors.config}}
            </div>
        </div>


        <div class="field">
            <label class="label">Devices</label>
            <div class="control">
                <textarea class="textarea" v-model="devices"/>
            </div>
            <div v-if="profileErrors.devices.length > 0" class="help is-danger">
                {{profileErrors.devices}}
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
                profileErrors: "getProfileErrors"
            })
        },

        data() {
            return {
                name: "",
                description: "",
                config: "{}",
                devices: "{}",
            };
        },

        methods: {
            onSubmit() {
                let body = {
                    name: this.name,
                    description: this.description,
                    config: JSON.parse(this.config),
                    devices: JSON.parse(this.devices),
                }

                Object.keys(body).forEach(
                    key =>
                        (body[key] === null || body[key] === undefined || body[key].length) ===
                        0 && delete body[key]
                );


                this.$store.dispatch("createProfile", body).then(() => {
                    this.$router.push({ name: "profileOverview"})
                }).catch(() => {

                });
            }
        }
    }
</script>

<style>

</style>
