<template>
    <div>
        <div v-if="!editing">
            <div v-if="image" class="card">
                <header class="card-header">
                   <div class="card-header-title" v-if="image.fingerprint">
                       Fingerprint: {{image.fingerprint.substring(0,20)}}...
                   </div>
                    <div class="card-header-title" v-else>Image not finished</div>
                </header>
                <div class="card-content">
                    <p v-if="image.fingerprint">Fringerprint: {{image.fingerprint}}</p>
                    <p v-if="image.architecture">Architecture: {{image.architecture}}</p>
                    <p v-if="image.size">Size: {{image.size}} bytes</p>
                    <p v-if="image.public">Public: {{image.public}}</p>
                    <p v-if="image.finished">Finished: {{image.finished}}</p>
                    <p v-if="image.filename">Filename: {{image.filename}}</p>
                    <p v-if="image.properties">Properties: {{JSON.stringify(image.properties)}}</p>
                    <div v-if="image.aliases.length > 0">
                        Aliases:
                        <ul v-for="alias in image.aliases">
                            <li>{{alias.name}}</li>
                        </ul>
                    </div>

                </div>
                <footer class="card-footer">
                    <a href="#" class="card-footer-item" @click="onEdit">Edit</a>
                    <a href="#" class="card-footer-item" @click="onDelete">Delete</a>
                </footer>
            </div>
        </div>
        <div v-if="editing">
            <label class="label">Name</label>
            <input class="input" type="text" v-model="editName">

            <label class="label">DomainName</label>
            <input class="input" type="text" v-model="editDomainName">

            <label class="label">ipv4</label>
            <input class="input" type="text" v-model="editIpv4">

            <label class="label">ipv6</label>
            <input class="input" type="text" v-model="editIpv6">

            <label class="label">Port</label>
            <input class="input" type="number" v-model="editPort">

            <button class="button" @click="onUpdate">Save</button>
            <button class="button" @click="onCancel">Abort</button>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        computed: {
            ...mapGetters({
                images: "getImages",
            }),

            image() {
                return this.images[this.index];
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
            };
        },
        methods: {
            onDelete() {
                this.$store.dispatch("deleteImage", this.image.id);
                this.$router.push({name: 'imageOverview'});
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
                this.$store.dispatch("updateImage", {
                    host_id: this.images[this.index].id,
                    host: {
                        name: this.editName,
                        ipv4: this.editIpv4,
                        ipv6: this.editIpv6,
                        domainName: this.editDomainName,
                        port: this.editPort,
                    }
                });
                this.editing = false;
            },


        }
    };
</script>

<style>
</style>