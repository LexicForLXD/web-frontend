<template>
    <div class="text-xs-center">

        <h1>Waiting for initialization.</h1>

        <v-progress-circular :size="150" :width="10" indeterminate />

        <h2>{{error}}</h2>
    </div>
</template>

<script>
export default {
  props: ["error"]
};
</script>

<style>
</style>
