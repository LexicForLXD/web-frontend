<template>
  <div>
    <label class="label">containers.js</label>
      <input class="input" type="date" v-model="date">

      <label class="label">Time</label>
      <input class="input" type="time" v-model="time">

      <label class="label">Dauer</label>
      <input class="input" type="number" v-model="duration">

      <label class="label">Gewicht</label>
      <input class="input" type="number" v-model="weight">

      <label class="label">Trainingsart</label>
      <!-- <div class="select">
        <select name="workout_typ_id" v-model="selectedWorkoutType">
          <option v-for="(workoutType, index) in workoutTypes" v-bind:key="workoutType.id" v-bind:value="workoutType.id">
            {{ workoutType.name }}
          </option>
        </select>
      </div>

      <label class="label">Gesundheit</label>
      <div class="select">
        <select class="select" name="health" v-model="selectedHealthType">
          <option v-for="(health, index) in healthTypes" v-bind:key="health.id" v-bind:value="health.id">
            {{ health.name }}
          </option>
        </select>
      </div>
      <label class="label">Mentale Belastung</label>
      <div class="select">
        <select class="select" name="mental" v-model="selectedMentalType">
          <option v-for="(mental, index) in mentalTypes" v-bind:key="mental.id" v-bind:value="mental.id">
            {{ mental.name }}
          </option>
        </select>
      </div>

      <label class="label">Physische Belastung</label>
      <div class="select">
        <select class="select" name="physical" v-model="selectedPhysicalType">
          <option v-for="(physical, index) in physicalTypes" v-bind:key="physical.id" v-bind:value="physical.id">
            {{ physical.name }}
          </option>
        </select>
      </div> -->

  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  computed: {
    ...mapGetters({
    //   userid: "getUserid",
    //   workoutTypes: "getWorkoutTypes",
    //   healthTypes: "getHealthTypes",
    //   mentalTypes: "getMentalTypes",
    //   physicalTypes: "getPhysicalTypes"
    })
  },

  data() {
    return {
      date: "",
      duration: "",
      time: "",
      weight: "",
      selectedHealthType: "",
      selectedMentalType: "",
      selectedPhysicalType: "",
      selectedWorkoutType: "",
    };
  },
}
</script>

<style>

</style>
