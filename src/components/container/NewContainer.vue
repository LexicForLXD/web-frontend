<template>
    <div>
        <div class="field">
            <label class="label">Name</label>
            <div class="control">
                <input class="input" type="text" v-model="name">
            </div>
        </div>


        <div class="field">
            <label class="label">Type</label>
            <div class="control">
                <div class="select">
                    <select name="type_select" v-model="selectedType">
                        <option value="migration">Migration</option>
                        <option value="copy">Copy</option>
                        <option value="image">Image</option>
                    </select>
                </div>
            </div>
        </div>

        <div class="field">
            <label class="label">Profiles</label>
            <div class="control" v-if="profiles.length > 0">
                <div class="select is-multiple">
                    <select multiple name="profiles_select" v-model="selectedProfiles"  v-bind:size="profiles.length">
                        <option v-for="profile in profiles" v-bind:key="profile.id" v-bind:value="profile.id">
                            {{ profile.name }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <div class="field">
            <label class="label">Host</label>
            <div class="control" v-if="hosts.length > 0">
                <div class="select">
                    <select name="host_select" v-model="selectedHost">
                        <option v-for="host in hosts" v-bind:key="host.id" v-bind:value="host.id">
                            {{ host.name }}
                        </option>
                    </select>
                </div>
            </div>
        </div>

        <div class="field">
            <label class="label">Config</label>
            <div class="control">
                <textarea class="textarea" v-model="config" placeholder='{"limits.cpu": "2"}'/>
            </div>
        </div>

        <div class="field">
            <label class="label">Devices</label>
            <div class="control">
                <textarea class="textarea" v-model="devices"/>
            </div>
        </div>

        <div class="field">
            <label class="label" for="ephemeral">Ephemeral</label>
            <div class="control">
                <input type="checkbox" id="ephemeral" v-model="ephemeral">
                <label for="ephemeral">Ephemeral</label>
            </div>
        </div>


        <div v-if="selectedType == 'image'">


        </div>

        <div v-if="selectedType == 'copy' || selectedType == 'migration'">
            <div class="field">
                <label class="label">Containers</label>
                <div class="control" v-if="containers.length > 0">
                    <div class="select">
                        <select name="container_select" v-model="selectedContainer">
                            <option v-for="container in containers" v-bind:key="container.id" v-bind:value="container.id">
                                {{ container.name }}
                            </option>
                        </select>
                    </div>
                </div>
            </div>
        </div>


        <button class="button" @click="onSubmit">Save</button>
    </div>

    <!--<label class="label">Type</label>-->
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


</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                hosts: "getHosts",
                containers: "getContainers",
                profiles: "getProfiles",
            })
        },

        data() {
            return {
                // bool
                fingerprintBool: false,
                aliasBool: false,

                //data
                selectedType: "image",
                selectedProfiles: [],
                selectedHost: [],
                ephemeral: false,
                name: "",
                config: "",
                devices: "{\n" +
                "   \"root\": {\n" +
                "       \"path\": \"/\",\n" +
                "       \"type\": \"disk\",\n" +
                "       \"pool\": \"default\"\n" +
                "    } \n" +
                "}",


            };
        },

        methods: {
            onSubmit() {
                let body = {
                    name: this.name,
                    ipv4: this.ipv4,
                    ipv6: this.ipv6,
                    domainName: this.domainName,
                    port: Number(this.port),
                    password: this.password
                }

                Object.keys(body).forEach(
                    key =>
                        (body[key] === null || body[key] === undefined || body[key].length) ===
                        0 && delete body[key]
                );


                this.$store.dispatch("createContainer", body).then(() => {
                    this.$router.push({name: "hostOverview"})
                }).catch(() => {

                });
            }
        }
    }
</script>

<style>

</style>
