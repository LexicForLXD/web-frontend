<template>
    <div>
        <v-data-table
                :headers="headers"
                :items="images">
            <template slot="items" slot-scope="props">
                <td v-if="props.item.finished">
                    <router-link
                            :to="{ name: 'imageSingle', params: {index: getImageIndex(props.item.id)}}">
                        {{ props.item.fingerprint.substring(0,11) }}...
                    </router-link>
                </td>
                <td v-else/>
                <td v-if="props.item.aliases.length > 0">{{ props.item.aliases[0].name }}</td>
                <td v-else/>
                <td>
                    {{props.item.architecture}}
                </td>
                <td>
                    <i :class="{ 'fa-times': !props.item.finished, 'fa-check': props.item.finished}"
                        class="fa">
                    </i>
                </td>
                <td>
                    <i :class="{ 'fa-times': !props.item.public, 'fa-check': props.item.public}"
                       class="fa">
                    </i>
                </td>
            </template>
        </v-data-table>
    </div>
</template>

<script>
    import {mapGetters} from "vuex";

    export default {
        data() {
            return {
                headers: [
                    {
                        text: "Fingerprint",
                        value: "fingerprint"
                    },
                    {
                        text: "Alias",
                        value: "aliases",
                        sortable: false,
                    },
                    {
                        text: "Architecture",
                        value: "architecture",
                        sortable: false,
                    },
                    {
                        text: "Finished",
                        value: "finished",
                        sortable: false,
                    },
                    {
                        text: "Public",
                        value: "public",
                        sortable: false,
                    },
                ]
            }
        },

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
            },
            getImageIndex(id) {
                return this.$store.getters.getImageIndexById(id);
            }
        }
    };
</script>

<style lang="scss">

</style>
