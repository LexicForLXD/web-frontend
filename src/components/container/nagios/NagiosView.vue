<template>
    <div v-if="graph.length > 0">
        <img :src="imageUrl" alt="graph"/>
    </div>

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
                    this.imageUrl = 'data:image/png;base64,'+this.graph;
                    this.error = "";
                }).catch(error => {
                    this.failLoading();
                    this.error = error;
                    console.log(error);
                    this.graph = "";
                })
            }
        }
    }
</script>

<style scoped>

</style>