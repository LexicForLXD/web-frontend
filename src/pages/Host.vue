<template>
  <div>
    <div>
      <button @click="newHost" class="button">New Host</button>
      <button @click="refresh" class="button">Refresh</button>
      <router-view></router-view>
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
