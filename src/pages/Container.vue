<template>
    <div>
        <div>
            <div v-if="this.$store.state.route.path != '/containers/new'">
                <button @click="newContainer" class="button">New Container</button>
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
            newContainer() {
                this.$router.push({name: "containerNew"});
            },

            refresh() {
                this.$store.dispatch("setContainers");
            }
        }
    }
</script>

<style>

</style>
