<template>
    <div>
        <label class="label">Password</label>
        <input class="input" type="password" v-model="password">

        <button class="button" @click="onAuth">Authenticate</button>

    </div>
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
