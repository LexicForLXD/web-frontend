<template>
    <v-form v-model="valid" @submit="onSubmit">
        <v-text-field
                label="Nagios Name"
                v-model="nagiosName"
                :rules="[v => !!v || 'Nagios Name is required']"
                required
        />
        <v-text-field
                label="Nagios Url"
                v-model="nagiosUrl"
                :rules="[v => !!v || 'Nagios Url is required']"
                required
        />
        <v-text-field
                label="Check Name"
                v-model="checkName"
                :rules="[v => !!v || 'Check Name is required']"
                required
        />
        <v-text-field
                label="Source Number"
                type="number"
                v-model="sourceNumber"
                :rules="[v => !!v || 'Source Number is required']"
                required
        />

        <v-checkbox
                label="Enabled"
                v-model="nagiosEnabled"
        />

        <v-btn
                @click="onSubmit"
                :disabled="!valid"
        >
            Submit
        </v-btn>

        <div v-if="error.length > 0">
            {{error}}
        </div>

        <div v-if="message.length > 0">
            {{message}}
        </div>
    </v-form>


</template>

<script>
    import containerNagiosApi from '../../../api/monitoring/containerNagios'
    import {mapGetters} from 'vuex'

    export default {
        name: "NagiosNew",

        data() {
            return {
                index: this.$route.params.index,
                nagiosName: "",
                nagiosUrl: "",
                checkName: "",
                sourceNumber: "",
                nagiosEnabled: true,
                valid: false,
                error: "",
                message: "",
            }
        },

        computed: {
            ...mapGetters({
                containers: "getContainers"
            }),

            nameError () {
                return this.hostErrors.name.length > 0;
            }
        },

        methods: {
            onSubmit() {
                containerNagiosApi.create(this.containers[this.index].id, {
                    nagiosName: this.nagiosName,
                    nagiosUrl: this.nagiosUrl,
                    checkName: this.checkName,
                    sourceNumber: this.sourceNumber,
                    nagiosEnabled: this.nagiosEnabled,
                }).then(() => {
                    this.message = "success";
                }).catch((error) => {
                    this.error = error.response.data.error.message
                })
            }
        },
    }
</script>

<style scoped>

</style>