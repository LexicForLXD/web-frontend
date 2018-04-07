<template>
    <div>
        <div>
            <div v-if="this.$store.state.route.path !== '/containers/new'">
                <button @click="refresh" class="button"><i class="fa fa-retweet"></i></button>
            </div>
            <div>
                <router-view></router-view>
            </div>

        </div>
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
