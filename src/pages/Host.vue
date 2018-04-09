<template>
    <div>
        <div v-if="this.$store.state.route.path != '/hosts/new'">
            <button @click="refresh" class="button"><i class="fa fa-retweet"></i></button>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        methods: {
            refresh() {
                this.$store.dispatch("setHosts");
            }
        }
    }
</script>

<style>

</style>
