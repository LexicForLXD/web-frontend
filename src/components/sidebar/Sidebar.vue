<template>
  <div>
    <aside v-if="isAuthenticated">
      <site-menu></site-menu>
    </aside>
  </div>
</template>

<script>
import siteMenu from "./Menu";
import { mapGetters } from "vuex";

export default {
  name: "sidebar",
  components: {
      siteMenu
  },

  computed: {
    ...mapGetters({
      isAuthenticated: "isAuthenticated",
    })
  }
};
</script>

<style>
.sidebar {
  grid-area: sidebar;
  background: lightblue;
}
</style>
