<template>
    <div>
        <div>
            <div v-if="this.$store.state.route.path != '/profiles/new'">
                <button @click="refresh" class="button"><i class="fa fa-retweet"></i></button>
            </div>
            <router-view></router-view>

        </div>
    </div>
</template>

<script>
    export default {
        methods: {
            refresh() {
                this.$store.dispatch("setProfiles");
            }
        }
    }
</script>

<style>

</style>
