<template>
  <div>
    <div v-if="images.length > 0">
      <table class="table is-hoverable is-fullwidth">
        <thead>
          <tr>
            <th>Fingerprint</th>
            <th>Alias</th>
            <th><abbr title="Architecture">ARCH</abbr></th>
            <th>Finished</th>
            <th>Public</th>

          </tr>
        </thead>
        <tbody>
          <router-link 
            v-for="(image, index) in images"
            :key="image.id"
            :to="{name: 'imageSingle', params: {index: index}}"
            tag="tr">
            <td v-if="image.finished">{{ image.fingerprint.substring(0,11) }}...</td>
            <td v-else/>
            <td v-if="image.aliases.length > 0">{{ image.aliases[0].name }}</td>
            <td v-else/>
            <td>{{ image.architecture }}</td>
            <td><i 
              :class="{ 'fa-times': !image.finished, 'fa-check': image.finished}"
              class="fa"/></td>
            <td><i 
              :class="{ 'fa-times': !image.public, 'fa-check': image.public}"
              class="fa"/></td>
          </router-link>
        </tbody>
      </table>
    </div>


    <div v-else>
      Keine Einträge vorhanden
    </div>

  </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        mounted() {
        },

        computed: {
            ...mapGetters({
                images: "getImages",

            })
        },

        components: {
            // "site-workout": Workout
        },

        methods: {
            newHost() {
                this.$router.push({name: "newHost"});
            },

            deleteHost(id) {
                this.$store.dispatch("deleteHost", id);
            }
        }
    };
</script>

<style lang="scss">

</style>
