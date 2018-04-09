<template>
    <v-layout row>
        <v-flex xs2>
            <v-btn :to="{name: 'containerNewNagios', params: {index: containerIndex}}">New</v-btn>
            <v-list>
                <v-list-tile v-for="check in nagiosList" :key="check.id">
                    <v-list-tile-content>
                        <v-btn small :to="{name: 'containerSingleNagios', params: {index: containerIndex, checkId: check.id}}">{{check.nagiosName}}</v-btn>
                    </v-list-tile-content>
                </v-list-tile>
            </v-list>
        </v-flex>
        <v-flex xs10>
            <router-view></router-view>
        </v-flex>
    </v-layout>
    
</template>

<script>
    import {mapGetters, mapMutations} from "vuex";
    import {LOADING_BEGIN, LOADING_FAIL, LOADING_FINISH} from "../../../store/mutation-types";
    import containerNagiosApi from '../../../api/monitoring/containerNagios.js'


    export default {
        name: "NagiosContainer",

        props: [
            'containerId'
        ],

        data() {
            return {
                nagiosList: [],
                error: "",
            }
        },

        computed: {
            containerIndex() {
                return this.$store.getters.getContainerIndexById(this.containerId)
            },
        },


        mounted: function () {
            this.getNagiosList();
        },

        methods: {
            ...mapMutations({
                startLoading: LOADING_BEGIN,
                stopLoading: LOADING_FINISH,
                failLoading: LOADING_FAIL
            }),
            
            getNagiosList() {
                this.startLoading();
                containerNagiosApi.getConfigs(this.containerId).then(res => {
                    this.nagiosList = res.data;
                    this.stopLoading();
                }).catch(error => {
                    this.error = error;
                    this.failLoading();
                })
            },
        }
    }
</script>

<style scoped>

</style>