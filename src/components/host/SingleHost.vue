<template>
    <div>
        <div v-if="!editing">
            <div v-if="hosts[index]" class="card">
                <header class="card-header">
                   <div class="card-header-title">
                       Name: {{hosts[index].name}}
                   </div>
                    <i v-bind:class="{ 'fa-times': !hosts[index].authenticated, 'fa-check': hosts[index].authenticated}" class="fa card-header-icon"> </i>
                </header>
                <div class="card-content">
                    <p v-if="hosts[index].domainName">DomainName: {{hosts[index].domainName}}</p>
                    <p v-if="hosts[index].ipv4">ipv4: {{hosts[index].ipv4}}</p>
                    <p v-if="hosts[index].ipv6">ipv6: {{hosts[index].ipv6}}</p>
                    <p v-if="hosts[index].port">Port: {{hosts[index].port}}</p>
                    <div v-if="hosts[index].containerId">
                        Containers:
                        <ul v-for="container in containersForHost">
                            <li> {{container.name}} </li>
                        </ul>
                    </div>

                </div>
                <footer class="card-footer">
                    <a href="#" class="card-footer-item" @click="onEdit">Edit</a>
                    <router-link  class="card-footer-item"  :to="{name: 'hostAuth', params: {index: index}}">Authenticate</router-link>
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
                hosts: "getHosts",
            }),
            containersForHost () {
                return this.$store.getters.getSingleContainerById(this.hosts[this.index].containerId)
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
                this.$store.dispatch("deleteHost", this.id);
            },
            onEdit() {
                this.editIpv4 = this.hosts[this.index].ipv4;
                this.editIpv6 = this.hosts[this.index].ipv6;
                this.editDomainName = this.hosts[this.index].domainName;
                this.editName = this.hosts[this.index].name;
                this.editPort = this.hosts[this.index].port;
                this.editing = true;
            },
            onCancel() {
                this.editing = false;
            },
            onUpdate() {
                this.$store.dispatch("updateHost", {
                    host_id: this.hosts[this.index].id,
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