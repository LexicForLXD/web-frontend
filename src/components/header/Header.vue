<template>
  <div>
    LEXIC
    <user-badge></user-badge>
  </div>
</template>

<script>
import userBadge from './UserBadge'

export default {
  name: 'header',
  components: {
    userBadge
  }

}
</script>

<style>
.header {
    grid-area: header;
    background: red;
    padding: 10px;
}
</style>
