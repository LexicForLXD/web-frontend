<template>
    <div>

        <div v-if="this.$store.state.route.path != '/users/new'">
            <button @click="refresh" class="button"><i class="fa fa-retweet"></i></button>
        </div>
        <div class="content">
            <router-view></router-view>
        </div>

    </div>
</template>

<script>
    export default {
        methods: {
            refresh() {
                this.$store.dispatch("getUsers");
            }
        }
    }
</script>

<style>

</style>
