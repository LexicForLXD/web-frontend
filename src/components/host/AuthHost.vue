<template>
    <v-form v-model="valid">
        <v-text-field
                label="Password"
                v-model="password"
                :type="e1 ? 'password' : 'text'"
                :append-icon="e1 ? 'visibility' : 'visibility_off'"
                :append-icon-cb="() => (e1 = !e1)"
                required
                :rules="[v => !!v || 'Password is required']"
        />

        <v-btn
                @click="onAuth"
                :disabled="!valid"
        >
            Authenticate
        </v-btn>

    </v-form>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                hosts: "getHosts"
            })
        },

        data() {
            return {
                valid: false,
                e1: true,
                password: "",
                index: this.$route.params.index,
            };
        },

        methods: {
            onAuth() {
                this.$store.dispatch("authHost", {host_id: this.hosts[this.index].id, password: this.password}).then(() => {
                    this.$router.push({ name: "hostOverview"})
                });
            }
        }
    }
</script>

<style>

</style>
