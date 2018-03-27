<template>
  <div>
    <div v-if="containers.length > 0">
      <div v-for="(container, index) in containers" :key="container.id">
        <div class="card">
          <header class="card-header">
            <router-link :to="{name: 'athleteSingleWorkout', params: {index: index}}" class="card-header-title">{{container.name}} {{container.id}}</router-link>
          </header>
          <div class="card-content">
            <p>Host: {{ container.host.name }}</p>
            <!-- Trainingsart: {{workout.workout_type.name}} -->
          </div>
          <footer class="card-footer">
            <router-link class="card-footer-item"  :to="{name: 'athleteSingleWorkout', params: {index: index}}">Mehr</router-link>
            <a href="#" @click="deleteContainer(container.id)" class="card-footer-item">Löschen</a>
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
      containers: "getContainers",

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
