<template>
    <div>
        <div>
            <div v-if="this.$store.state.route.path != '/hosts/new'">
                <button @click="newHost" class="button">New Host</button>
                <button @click="refresh" class="button">Refresh</button>
            </div>
            <div class="content">
                <router-view></router-view>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            newHost() {
                this.$router.push({name: "hostNew"});
            },

            refresh() {
                this.$store.dispatch("setHosts");
            }
        }
    }
</script>

<style>

</style>
