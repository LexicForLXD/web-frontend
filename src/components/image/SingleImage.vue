<template>
    <v-card>
        <v-toolbar>
            <v-toolbar-title>
                Fingerprint: {{image.fingerprint.substring(0,20)}}...
            </v-toolbar-title>
        </v-toolbar>
        <v-card-text>
            <p v-if="image.fingerprint"><b>Fringerprint:</b> {{ image.fingerprint }}</p>
            <p v-if="image.architecture"><b>Architecture:</b> {{ image.architecture }}</p>
            <p v-if="image.size"><b>Size:</b> {{ image.size }} bytes</p>
            <p v-if="image.public"><b>Public:</b> {{ image.public }}</p>
            <p v-if="image.finished"><b>Finished:</b> {{ image.finished }}</p>
            <p v-if="image.filename"><b>Filename:</b> {{ image.filename }}</p>
            <p v-if="image.properties"><b>Properties:</b> <span class="long-text">{{ JSON.stringify(image.properties) }}</span></p>
            <p v-if="image.hostId"><b>Host:</b>
                <router-link :to="{name: 'hostSingle', params: {index: hostIndex}}">{{host.name}}</router-link>
            </p>
            <div v-if="image.aliases.length > 0">
                <b>Aliases:</b>
                <ul v-for="alias in image.aliases">
                    <li>{{ alias.name }}</li>
                </ul>
            </div>
        </v-card-text>

        <v-card-actions>
            <v-btn @click="onDelete">Delete</v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  computed: {
    ...mapGetters({
      images: "getImages"
    }),

    image() {
      return this.images[this.index];
    },
    host() {
      return this.$store.getters.getHostById(this.image.hostId);
    },

    hostIndex() {
      return this.$store.getters.getHostIndexById(this.host.id);
    }
  },
  data() {
    return {
      editing: false,
      editIpv4: "",
      editIpv6: "",
      editDomainName: "",
      editName: "",
      editPort: "",
      // editSettings: "",
      // editMac: "",
      index: this.$route.params.index,
      error: ""
    };
  },
  methods: {
    onDelete() {
      this.$store.dispatch("deleteImage", this.image.id);
      this.$router.push({ name: "imageOverview" });
    },
    onEdit() {
      this.editIpv4 = this.images.ipv4;
      this.editIpv6 = this.images.ipv6;
      this.editDomainName = this.images.domainName;
      this.editName = this.images.name;
      this.editPort = this.images.port;
      this.editing = true;
    },
    onCancel() {
      this.editing = false;
    },
    onUpdate() {
      this.$store
        .dispatch("updateImage", {
          host_id: this.images[this.index].id,
          host: {
            name: this.editName,
            ipv4: this.editIpv4,
            ipv6: this.editIpv6,
            domainName: this.editDomainName,
            port: this.editPort
          }
        })
        .then(() => {
          this.editing = false;
          this.error = "";
        })
        .catch(error => {
          this.error = error.response.data.error.message;
        });
    }
  }
};
</script>

<style>
</style>