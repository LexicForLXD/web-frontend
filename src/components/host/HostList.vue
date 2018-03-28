<template>
  <div>
    <div v-if="hosts.length > 0">
      <div v-for="(host, index) in hosts" :key="host.id">
        <div class="card">
          <header class="card-header">
            <router-link :to="{name: 'hostSingle', params: {index: index}}" class="card-header-title">{{host.name}} {{host.id}}</router-link>
          </header>
          <div class="card-content">
            <p>Authenticated: {{host.authenticated}}</p>
          </div>
          <footer class="card-footer">
            <router-link class="button card-footer-item"  :to="{name: 'hostSingle', params: {index: index}}">More</router-link>
            <a href="#" @click="deleteHost(host.id)" class="button card-footer-item">Delete</a>
          </footer>
        </div>
        <p></p>
      </div>
    </div>


    <div v-else>
      Keine Einträge vorhanden
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  mounted() {},

  computed: {
    ...mapGetters({
      hosts: "getHosts",

    })
  },

  components: {
    // "site-workout": Workout
  },

  methods: {
    newHost() {
      this.$router.push({ name: "newHost" });
    },

    deleteHost(id) {
      this.$store.dispatch("deleteHost", id);
    }
  }
};
</script>

<style lang="scss">

</style>
