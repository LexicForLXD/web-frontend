<template>
    <div>
        <div v-if="this.$store.state.route.path !== '/containers/new'">
            <button @click="refresh" class="button"><v-icon>refresh</v-icon></button>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        methods: {
            refresh() {
                this.$store.dispatch("setContainers");
            }
        }
    }
</script>

<style>

</style>
