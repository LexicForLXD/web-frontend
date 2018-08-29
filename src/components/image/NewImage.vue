<template>
    <div>
        <v-form v-model="valid" @submit="onSubmit">
            <v-text-field
                    label="Filename"
                    v-model="filename"
                    :error-messages="imageErrors.filename"
                    persistent-hint
                    hint="The filename will be used for export."
            />

            <v-checkbox
                    label="Public"
                    v-model="publicImage"
                    :error-messages="imageErrors.public"
                    persistent-hint
                    hint="Whether the image can be downloaded by untrusted users"
            />

            <v-text-field
                    label="Alias name"
                    v-model="aliases[0].name"
                    :error-messages="imageErrors.aliasName"
                    required
                    :rules="[v => !!v || 'Alias is required']"
            />

            <v-text-field
                    label="Alias description"
                    v-model="aliases[0].description"
                    :error-messages="imageErrors.aliasDescription"
                    required
                    :rules="[v => !!v || 'Alias is required']"
            />

            <v-select
                    :items="hosts"
                    v-model="hostId"
                    label="Host"
                    required
                    item-value="id"
                    item-text="name"
                    :rules="[v => !!v || 'Host is required']"
            />


            <v-textarea
                    label="Properties"
                    v-model="properties"
                    placeholder='{"os": "Alpine"}'
                    :error-messages="imageErrors.properties"
                    hint="Image properties (optional, applied on top of source properties)"
                    persistent-hint
            />

            <v-select
                    :items="sourceTypes"
                    v-model="source.type"
                    label="Source Type"
                    required
                    item-value="value"
                    item-text="text"
                    :rules="[v => !!v || 'Source type is required']"
                    :error-messages="imageErrors.type"
                    hint="Which source should be used for the creation of the image?"
                    persistent-hint
            />


            <div v-if="source.type === 'image'">
                <v-checkbox
                        label="Automatic update"
                        v-model="autoUpdate"
                        hint="Whether the image should be auto-updated."
                        persistent-hint
                />

                <v-autocomplete
                    :items="remoteAliases"
                    v-model="source.alias"
                    label="Alias"
                    required
                    hint='Alias of the remote image. A list can be found <a target="_blank" href="https://uk.images.linuxcontainers.org">here</a>'
                    persistent-hint
                    :rules="[v => !!v || 'Alias is required']"
            />

            </div>

            <div v-if="source.type === 'container'">
                <v-select
                        :items="containers"
                        v-model="containers"
                        label="Container"
                        required
                        item-value="name"
                        item-text="name"
                        :rules="[v => !!v || 'Host is required']"
                        no-data-text="Make sure you have selected the correct host."
                />


                <v-text-field
                        label="Compression algorithm"
                        v-model="compressionAlgo"
                        placeholder="rm"
                        hint='Override the compression algorithm for the image (optional)'
                        persistent-hint
                />
            </div>

            <p>
                If you get redirected to the image overview, the server accepted your request. Please have a look on the running jobs.
            </p>

            <v-btn
                    @click="onSubmit"
                    :disabled="!valid"
            >
                Submit
            </v-btn>


        </v-form>
        <v-alert :value="error" type="error">
            {{ imageErrors.general }}
        </v-alert>

    </div>
</template>

<script>
import { mapGetters } from "vuex";
import remoteImageApi from "../../api/image/remoteImage";

export default {
  mounted: function() {
    this.getRemoteAliases();
  },
  computed: {
    ...mapGetters({
      imageErrors: "getImageErrors",
      hosts: "getHosts"
    })
  },

  watch: {
    hostId: function(val) {
      const containerId = this.$store.getters.getHostById(val).containerId;
      this.containers = this.$store.getters.getContainersByIds(containerId);
    }
  },

  data() {
    return {
      containers: [],
      filename: "",
      publicImage: false,
      autoUpdate: true,
      aliases: [
        {
          name: "",
          description: ""
        }
      ],
      source: {
        type: "",
        mode: "pull",
        server: "https://uk.images.linuxcontainers.org",
        protocol: "",
        alias: "",
        name: ""
      },
      properties: "",
      compressionAlgo: "",
      remoteAliasesLong: [],
      remoteAliases: [],
      hostId: "",
      valid: false,
      sourceTypes: [
        {
          value: "image",
          text: "Remote image"
        },
        {
          value: "container",
          text: "Container"
        }
      ],
      error: ""
    };
  },

  methods: {
    getRemoteAliases() {
      remoteImageApi
        .fetch()
        .then(res => {
          this.remoteAliasesLong = res.data.metadata;
          console.log(this.remoteAliases);
          this.remoteAliasesLong.forEach(element => {
            this.remoteAliases.push(
              element.replace("/1.0/images/aliases/", "")
            );
          });
        })
        .catch(() => {
          return [];
        });
    },
    onSubmit() {
      let body;

      if (this.source.type === "container") {
        body = {
          image: {
            filename: this.filename,
            public: this.publicImage,
            aliases: this.aliases,
            source: {
              type: this.source.type,
              name: this.source.name
            },
            properties: JSON.parse(this.properties),
            compression_algorithm: this.compressionAlgo
          },
          hostId: this.hostId
        };
      } else {
        body = {
          image: {
            filename: this.filename,
            public: this.publicImage,
            autoUpdate: this.autoUpdate,
            aliases: this.aliases,
            source: {
              type: this.source.type,
              mode: this.source.mode,
              server: this.source.server,
              protocol: this.source.protocol,
              alias: this.source.alias
            },
            properties: JSON.parse(this.properties)
          },
          hostId: this.hostId
        };
      }

      Object.keys(body).forEach(
        key =>
          (body[key] === null ||
            body[key] === undefined ||
            body[key].length) === 0 && delete body[key]
      );

      this.$store
        .dispatch("createImage", body)
        .then(() => {
          this.$router.push({ name: "imageOverview" });
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
