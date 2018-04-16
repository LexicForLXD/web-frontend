<template>
    <v-layout row>
        <v-flex xs2>
            <v-text-field
                    v-model="logPath"
                    label="Log path"
            />
            <v-btn
            @click="onSubmit">
                Load Log
            </v-btn>
        </v-flex>
        <v-flex xs10>
            <log-view :log="log" :error="error"/>
        </v-flex>

    </v-layout>

</template>

<script>
    import LogView from "../log/LogView"
    import hostLogApi from "../../api/monitoring/hostMonitoring"
    import {mapMutations} from "vuex";
    import {LOADING_BEGIN, LOADING_FAIL, LOADING_FINISH} from "../../store/mutation-types";

    export default {
        name: "LogHost",

        components: {
            LogView
        },

        data() {
            return {
                log: "",
                error: "",
                logPath: "",
            }
        },

        props: [
            'hostId'
        ],

        methods: {
            ...mapMutations({
                startLoading: LOADING_BEGIN,
                stopLoading: LOADING_FINISH,
                failLoading: LOADING_FAIL
            }),

            onSubmit() {
                this.startLoading();
                hostLogApi.getLogFile(this.hostId, this.logPath).then(res => {
                    this.stopLoading();
                    this.log = res.data;
                    this.error = "";
                }).catch(error => {
                    this.failLoading();
                    this.error = error;
                    this.log = "";
                })
            }
        }
    }


</script>

<style scoped>

</style>