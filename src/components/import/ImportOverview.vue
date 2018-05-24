<template>
    <div>
        <v-select
                :items="hosts"
                v-model="selectedHost"
                label="Host"
                required
                item-value="id"
                item-text="name"
                :rules="[v => !!v || 'Host is required']"
        />

        <v-btn @click="onImages">Images</v-btn>
        <v-btn @click="onContainers">Containers</v-btn>

        {{error}}
        {{message}}
    </div>
</template>

<script>
    import importApi from '../../api/import/import.js'
    import {mapGetters, mapMutations} from "vuex";
    import {LOADING_BEGIN, LOADING_FAIL, LOADING_FINISH} from "../../store/mutation-types";


    export default {

        data() {
            return {
                selectedHost: "",
                error: "",
                message: ""
            }
        },

        computed: {
            ...mapGetters({
                hosts: "getHosts"
            }),

        },

        methods: {
            ...mapMutations({
                startLoading: LOADING_BEGIN,
                stopLoading: LOADING_FINISH,
                failLoading: LOADING_FAIL
            }),
            onImages() {
                this.startLoading();
                importApi.images(this.selectedHost).then(res => {
                    this.message = res.data.message;
                    this.stopLoading();
                }).catch(error => {
                    this.error = error.response.data.message;
                    this.failLoading();
                })
            },
            onContainers() {
                this.startLoading();
                importApi.containers(this.selectedHost).then(res => {
                    this.message = res.data.message;
                    this.stopLoading();
                }).catch(error => {
                    this.error = error.response.data.message;
                    this.failLoading();
                })
            },


        }

    }
</script>

<style scoped>

</style>