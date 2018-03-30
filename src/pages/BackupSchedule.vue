<template>
  <div>
    <div>
      <div v-if="this.$store.state.route.path != '/backup-schedules/new'">
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
            refresh() {
                // this.$store.dispatch("set");
            }
        }
    }
</script>

<style>

</style>
