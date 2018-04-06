<template>
  <div v-if="log !== ''">
    {{ log }}
  </div>
  <div v-else>
    Select a log file on the left
  </div>
</template>

<script>
    import {mapGetters} from "vuex";
    import containerLogApi from '../../../api/monitoring/containerMonitoring.js'

export default {
    data() {
        return {

            error: "",
            log: "",
        }
    },



    computed: {
        ...mapGetters({
            containers: "getContainers",

        }),

        name() {
            return this.$route.params.name;
        },

        index() {
            return this.$route.params.index;
        },



    },


    watch: {
        name: function() {
            this.getLogFile();
        }
    },

    mounted: function () {
      this.getLogFile();
    },


    methods: {
        getLogFile() {
            containerLogApi.getLogFile(this.containers[this.index].id, this.name).then(res => {
                this.log = res.data;
            }).catch(error => {
                this.error = error;
            })
        }
    }
};
</script>

<style>

</style>
