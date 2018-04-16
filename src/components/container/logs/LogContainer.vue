<template>
    <div>
        <v-layout row>
            <v-flex xs2>
                <v-list>
                    <v-list-tile v-for="log in logsList" :key="log">
                        <v-list-tile-content>
                            <v-btn small right @click="logName = log">{{log}}</v-btn>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-flex>
            <v-flex xs10>
                <log-view :log="log" :error="error"/>
            </v-flex>

        </v-layout>
    </div>
</template>

<script>
    import logView from "../../log/LogView.vue";
    import containerLogApi from '../../../api/monitoring/containerMonitoring.js'
    import {mapMutations} from "vuex";
    import {LOADING_BEGIN, LOADING_FAIL, LOADING_FINISH} from "../../../store/mutation-types";


    export default {
        components: {
            logView,
        },

        props: [
            'containerId'
        ],

        data() {
            return {
                logsList: [],
                error: "",
                logName: "",
                log: "",
            }
        },

        mounted: function () {
            this.getLogsList();
        },

        watch: {
            logName: function () {
                this.getLogFile();
            }
        },

        methods: {
            ...mapMutations({
                startLoading: LOADING_BEGIN,
                stopLoading: LOADING_FINISH,
                failLoading: LOADING_FAIL
            }),

            getLogFile() {
                this.startLoading();
                containerLogApi.getLogFile(this.containerId, this.logName).then(res => {
                    this.stopLoading();
                    this.log = res.data;
                    this.error = "";
                }).catch(error => {
                    this.failLoading();
                    this.error = error;
                    this.log = "";
                })
            },

            getLogsList() {
                this.startLoading();
                containerLogApi.listLogs(this.containerId).then(res => {
                    this.logsList = res.data.logs;
                    this.stopLoading();
                }).catch(error => {
                    this.error = error;
                    this.failLoading();
                })
            }
        }
    };
</script>

<style>

</style>
