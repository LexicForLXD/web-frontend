<template>
    <div>
        <label class="label">Name</label>
        <input class="input" type="text" v-model="name">
        <div v-if="hostErrors.error">
            <p v-if="hostErrors.error.message.name">
                {{hostErrors.error.message.name}}
            </p>
        </div>


        <label class="label">DomainName</label>
        <input class="input" type="text" v-model="domainName">
        <div v-if="hostErrors.error">
            <p class="help is-danger" v-if="hostErrors.error.message.uri">
                {{hostErrors.error.message.uri}}
            </p>
            <p class="help is-danger" v-if="hostErrors.error.message.domainName">
                {{hostErrors.error.message.domainName}}
            </p>
        </div>

        <label class="label">ipv4</label>
        <input class="input" type="text" v-model="ipv4">
        <div v-if="hostErrors.error">
            <p v-if="hostErrors.error.message.uri">
                {{hostErrors.error.message.uri}}
            </p>
            <p v-if="hostErrors.error.message.ipv4">
                {{hostErrors.error.message.ipv4}}
            </p>
        </div>

        <label class="label">ipv6</label>
        <input class="input" type="text" v-model="ipv6">
        <div v-if="hostErrors.error">
            <p v-if="hostErrors.error.message.uri">
                {{hostErrors.error.message.uri}}
            </p>
            <p v-if="hostErrors.error.message.ipv6">
                {{hostErrors.error.message.ipv6}}
            </p>
        </div>

        <label class="label">Port</label>
        <input class="input" type="number" v-model="port">
        <div v-if="hostErrors.error">
            <p v-if="hostErrors.error.message.port">
                {{hostErrors.error.message.port}}
            </p>
        </div>

        <label class="label">Password</label>
        <input class="input" type="password" v-model="password">

        <button class="button" @click="onSubmit">Save</button>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                hostErrors: "getHostErrors"
            })
        },

        data() {
            return {
                name: "",
                ipv4: "",
                ipv6: "",
                domainName: "",
                port: "",
                password: "",
            };
        },

        methods: {
            onSubmit() {
                let body = {
                    name: this.name,
                    ipv4: this.ipv4,
                    ipv6: this.ipv6,
                    domainName: this.domainName,
                    port: Number(this.port),
                    password: this.password
                }

                Object.keys(body).forEach(
                    key =>
                        (body[key] === null || body[key] === undefined || body[key].length) ===
                        0 && delete body[key]
                );


                this.$store.dispatch("createHost", body).then(() => {
                    this.$router.push({ name: "hostOverview"})
                }).catch(() => {

                });
            }
        }
    }
</script>

<style>

</style>
