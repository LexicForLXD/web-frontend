<template>
    <div v-if="log !== ''">
        {{ log }}
    </div>
    <div v-else>
        <div v-if="error !== ''">
            {{ error.response.data }}
        </div>
        Select a log file on the left
    </div>

</template>

<script>
    import {mapGetters, mapMutations} from "vuex";
    import containerLogApi from '../../../api/monitoring/containerMonitoring.js'
    import {LOADING_BEGIN, LOADING_FAIL, LOADING_FINISH} from "../../../store/mutation-types";

    export default {
        data() {
            return {

                error: "",
                log: "",
            }
        },

        props: [
            'logName',
            'containerId'
        ],


        computed: {
            ...mapGetters({
                containers: "getContainers",

            }),


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
            }
        }
    };
</script>

<style>

</style>
