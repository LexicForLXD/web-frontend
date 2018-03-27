<template>
  <div>
    <div>
      <button @click="newContainer" class="button">New Container</button>
      <button @click="refresh" class="button">Refresh</button>
      <router-view></router-view>
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
