<template>
    <div>
        <v-layout row>
            <v-flex xs2>
                <v-list>
                    <v-list-tile v-for="log in logsList" :key="log">
                        <v-list-tile-content>
                            <v-btn small left @click="logName = log">{{log}}</v-btn>
                        </v-list-tile-content>
                    </v-list-tile>
                </v-list>
            </v-flex>
            <v-flex xs10>
                <log-view :logName="logName" :containerId="containerId"/>
            </v-flex>

        </v-layout>
    </div>
</template>

<script>
    import logView from "./LogView.vue";
    import containerLogApi from '../../../api/monitoring/containerMonitoring.js'


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
            }
        },

        mounted: function () {
            this.getLogsList();
        },

        methods: {
            getLogsList() {
                containerLogApi.listLogs(this.containerId).then(res => {
                    this.logsList = res.data.logs;
                }).catch(error => {
                    this.error = error;
                })
            }
        }
    };
</script>

<style>

</style>
