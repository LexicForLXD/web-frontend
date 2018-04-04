<template>
    <div>
        <div class="field">
            <label class="label">Name</label>
            <div class="control">
                <input class="input" type="text" v-model="name"
                       v-bind:class="{'is-danger': scheduleErrors.name.length > 0}">
            </div>
            <div v-if="scheduleErrors.name.length > 0" class="help is-danger">
                {{scheduleErrors.name}}
            </div>
        </div>


        <div class="field">
            <label class="label">Description</label>
            <div class="control">
                <input class="input" type="text" v-model="description"
                       v-bind:class="{'is-danger': scheduleErrors.description.length > 0}">
            </div>
            <div v-if="scheduleErrors.description.length > 0" class="help is-danger">
                {{scheduleErrors.description}}
            </div>
        </div>

        <div class="field">
            <label class="label">Type</label>
            <div class="control">
                <div class="select" v-bind:class="{'is-danger': scheduleErrors.type.length > 0}">
                    <select name="type_select" v-model="type">
                        <option value="full">Full</option>
                        <option value="incremental">Incremental</option>
                    </select>
                </div>
            </div>
            <div v-if="scheduleErrors.type.length > 0" class="help is-danger">
                {{scheduleErrors.type}}
            </div>
        </div>

        <div class="field">
            <label class="label">Execution time</label>
            <div class="control">
                <div class="select" v-bind:class="{'is-danger': scheduleErrors.executionTime.length > 0}">
                    <select name="type_select" v-model="executionTime">
                        <option value="daily">Daily</option>
                        <option value="weekly">Weekly</option>
                        <option value="monthly">Monthly</option>
                    </select>
                </div>
            </div>
            <div v-if="scheduleErrors.executionTime.length > 0" class="help is-danger">
                {{scheduleErrors.executionTime}}
            </div>
        </div>

        <div class="field">
            <label class="label">Containers</label>
            <div class="control" v-if="containers.length > 0">
                <div class="select is-multiple" v-bind:class="{'is-danger': scheduleErrors.containers.length > 0}">
                    <select multiple name="containers_select" v-model="selectedContainers"
                            v-bind:size="containers.length">
                        <option v-for="container in containers" v-bind:key="container.id" v-bind:value="container.id">
                            {{ container.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div v-if="scheduleErrors.containers.length > 0" class="help is-danger">
                {{scheduleErrors.containers}}
            </div>
        </div>


        <div class="field">
            <label class="label">Destination</label>
            <div class="control">
                <div class="select" v-bind:class="{'is-danger': scheduleErrors.destination.length > 0}">
                    <select name="destination_select" v-model="selectedDestination">
                        <option value="-1" disabled>Select a destination...</option>
                        <option v-for="destination in destinations" v-bind:key="destination.id" v-bind:value="destination.id">
                            {{ destination.name }}
                        </option>
                    </select>
                </div>
            </div>
            <div v-if="scheduleErrors.destination.length > 0" class="help is-danger">
                {{scheduleErrors.destination}}
            </div>
        </div>

        <button class="button" @click="onSubmit">Save</button>
    </div>
</template>

<script>
    import {mapGetters, mapActions} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                scheduleErrors: "getBackupScheduleErrors",
                destinations: "getBackupDestinations",
                containers: "getContainers",
            })
        },

        data() {
            return {
                name: "",
                description: "",
                executionTime: "",
                type: "",
                selectedDestination: "-1",
                selectedContainers: [],
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
                    containers: this.selectedContainers,
                }

                Object.keys(body).forEach(
                    key =>
                        (body[key] === null || body[key] === "-1" || body[key] === undefined || body[key].length) ===
                        0 && delete body[key]
                );

                this.createSchedule(body).then(() => {
                    this.$router.push({name: "scheduleOverview"})
                }).catch(() => {

                });
            }
        },
    }
</script>

<style>

</style>
