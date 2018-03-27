<template>
  <div>
    <div v-if="hosts.length > 0">
      <div v-for="(host, index) in hosts" :key="host.id">
        <div class="card">
          <header class="card-header">
            <router-link :to="{name: 'athleteSingleWorkout', params: {index: index}}" class="card-header-title">{{host.name}} {{host.id}}</router-link>
          </header>
          <div class="card-content">
            <p>Authenticated: {{host.authenticated}}</p>
            <p>Port: {{host.port }}</p>
            <!-- Trainingsart: {{workout.workout_type.name}} -->
          </div>
          <footer class="card-footer">
            <router-link class="card-footer-item"  :to="{name: 'athleteSingleWorkout', params: {index: index}}">More</router-link>
            <a href="#" @click="deleteHost(host.id)" class="card-footer-item">Delete</a>
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
// import Workout from "./Workout";

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
    newContainer() {
      this.$router.push({ name: "newContainer" });
    },

    deleteContainer(containerId) {
      this.$store.dispatch("deleteContainer", containerId);
    }
  }
};
</script>

<style lang="scss">

</style>
