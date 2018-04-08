<template>
    <v-layout row wrap>
        <v-flex xs12>
            <v-btn
                    @click="onDelete"
            >
                Delete Check
            </v-btn>

            <v-btn
                :to="{name: 'containerSingleNagiosUpdate', params: {index: index, checkId: checkId}}"
                >Update Check</v-btn>
        </v-flex>
        <v-flex xs12>
            <div v-if="graph.length > 0">
                <img :src="imageUrl" alt="graph"/>
            </div>
        </v-flex>
    </v-layout>
</template>

<script>
    import containerNagiosApi from '../../../api/monitoring/containerNagios.js'
    import {mapMutations} from "vuex";
    import {LOADING_BEGIN, LOADING_FAIL, LOADING_FINISH} from "../../../store/mutation-types";

    export default {
        name: "NagiosView",

        data() {
            return {
                index: this.$route.params.index,
                checkId: this.$route.params.checkId,
                timerange: "-1day",
                graph: "",
                imageUrl: "",
                error: ""
            }
        },

        mounted: function () {
            this.getGraph();
        },

        methods: {
            ...mapMutations({
                startLoading: LOADING_BEGIN,
                stopLoading: LOADING_FINISH,
                failLoading: LOADING_FAIL
            }),

            getGraph() {
                this.startLoading();
                containerNagiosApi.showGraph(this.checkId, this.timerange).then(res => {
                    this.stopLoading();

                    this.graph = Buffer.from(res.data, 'binary').toString('base64');
                    this.imageUrl = 'data:image/png;base64,' + this.graph;
                    this.error = "";
                }).catch(error => {
                    this.failLoading();
                    this.error = error;
                    console.log(error);
                    this.graph = "";
                })
            },

            onDelete() {
                this.startLoading();
                containerNagiosApi.delete(this.checkId).then(res => {
                    this.stopLoading();
                    this.$router.push({name: 'containerSingle', params: {index: this.index}});
                }).catch(error => {
                    this.error = error.response.data.message;
                    this.failLoading();
                })
            }
        }
    }
</script>

<style scoped>

</style>