<template>
  <div>
    <div class="columns">
      <!-- <router-view/> -->
      <log-list class="column"/>
      <router-view class="column is-three-quarters"/>

    </div>
  </div>
</template>

<script>
import logView from "./LogView.vue";
import logList from "./LogList.vue";

export default {
  components: {
    logView,
    logList
  }
};
</script>

<style>

</style>
