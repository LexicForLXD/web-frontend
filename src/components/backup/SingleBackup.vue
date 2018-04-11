<template>
    <div>
        {{backup.timestamp}}
        <p>{{destination.name}}</p>
        <p>{{schedule.name}}</p>
    </div>

</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        computed: {
            backup () {
                return this.$store.getters.getBackupByIndex(this.index);
            },

            destination () {
                return this.$store.getters.getBackupDestinationById(this.backup.destinationId);
            },

            destinationIndex () {
                return this.$store.getters.getBackupDestinationIndexById(this.backup.destinationId);
            },

            schedule() {
                return this.$store.getters.getBackupScheduleById(this.backup.backupScheduleId);
            },

            scheduleIndex() {
                return this.$store.getters.getBackupScheduleIndexById(this.backup.backupScheduleId);
            },

            containers() {
                return this.$store.getters.getContainersByIds(this.backup.containerId);
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

            containerIndex(id) {
                return this.$store.getters.getContainerIndexById(id);
            },

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