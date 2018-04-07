<template>
  <div>
    <ul>
      <router-link 
        v-for="(log, index) in logsList" 
        :to="{name: 'showLog', params: {name: log}}" 
        :key="index"
        tag="li">
        {{ log }}
      </router-link>
    </ul>
  </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import containerLogApi from '../../../api/monitoring/containerMonitoring.js'

    export default {
        data() {
            return {
                logsList: [],
                index: this.$route.params.index,
                error: "",
            }
        },

        computed: {
            ...mapGetters({
                containers: "getContainers",
            }),

        },

        mounted: function () {
            this.getLogsList();
        },

        methods: {
            getLogsList() {
                containerLogApi.listLogs(this.containers[this.index].id).then(res => {
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
