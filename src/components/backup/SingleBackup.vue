<template>
    <div>
        {{backup.timestamp}}
    </div>

</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        computed: {
            ...mapGetters({
                b: "getHosts",
            }),
            backup () {
                return this.$store.getters.getBackupByIndex(this.index)
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