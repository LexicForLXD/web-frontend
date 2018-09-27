<template>
    <div>
        <v-form v-model="valid" @submit="onSubmit">
            <v-text-field
                    label="Name"
                    v-model="name"
                    :rules="[v => !!v || 'Name is required']"
                    required
                    :error-messages="error.name"
                    @error="erro.name = []"
            />

            <v-text-field
                    label="Description"
                    v-model="description"
                    :error-messages="error.description"
                    @error="erro.description = []"
            />

            <v-select
                    :items="['full','incremental']"
                    v-model="type"
                    label="Type"
                    required
                    :rules="[v => !!v || 'Type is required']"
                    :error-messages="error.type"
                    @error="erro.type = []"
            />

            <v-select
                    :items="['daily','weekly', 'monthly']"
                    v-model="executionTime"
                    label="Execution time"
                    required
                    :rules="[v => !!v || 'Execution time is required']"
                    :error-messages="error.executionTime"
                    @error="erro.executionTime = []"
                    persistent-hint
                    hint="How often should be backed up?"
            />

            <v-select
                    :items="containers"
                    v-model="selectedContainers"
                    label="Containers"
                    item-value="id"
                    item-text="name"
                    multiple
                    required
                    :rules="[v => !!v || 'At least one Container is required']"
                    :error-messages="error.containers"
                    @error="erro.containers = []"
                    persistent-hint
                    hint="Which containers should be backed up? The containers have to be on the same host."
            />

            <v-select
                    :items="destinations"
                    v-model="selectedDestination"
                    label="Destination"
                    required
                    item-value="id"
                    item-text="name"
                    :rules="[v => !!v || 'Destination is required']"
                    :error-messages="error.destination"
                    @error="erro.destination = []"
                    persistent-hint
                    hint="To which destination the containers should be backed up."
            />

            <v-btn
                    @click="onSubmit"
                    :disabled="!valid"
            >
                Submit
            </v-btn>

        </v-form>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  computed: {
    ...mapGetters({
      scheduleErrors: "getBackupScheduleErrors",
      destinations: "getBackupDestinations",
      containers: "getContainers"
    })
  },

  data() {
    return {
      valid: false,
      name: "",
      description: "",
      executionTime: "",
      type: "",
      selectedDestination: "",
      selectedContainers: [],
      data: "",
      error: ""
    };
  },

  methods: {
    ...mapActions({
      createSchedule: "createBackupSchedule"
    }),

    onSubmit() {
      const body = {
        name: this.name,
        description: this.description,
        executionTime: this.executionTime,
        type: this.type,
        destination: this.selectedDestination,
        containers: this.selectedContainers
      };

      Object.keys(body).forEach(
        key =>
          (body[key] === null ||
            body[key] === undefined ||
            body[key].length) === 0 && delete body[key]
      );

      this.createSchedule(body)
        .then(() => {
          this.$router.push({ name: "scheduleOverview" });
        })
        .catch(error => {
          this.error = error.response.data.error.message;
        });
    }
  }
};
</script>

<style>
</style>
