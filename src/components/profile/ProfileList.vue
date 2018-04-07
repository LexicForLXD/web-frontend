<template>
    <div>

        <v-data-table
                :headers="headers"
                :items="profiles">
            <template slot="items" slot-scope="props">
                <td>
                    <router-link
                            :to="{ name: 'profileSingle', params: {index: props.index}}">
                        {{ props.item.name }}
                    </router-link>
                </td>
                <td>
                    {{props.item.description}}
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
                        text: "Name",
                        value: "name"
                    },
                    {
                        text: "Description",
                        value: "description",
                        sortable: false,
                    },
                ]
            }
        },

        mounted() {
        },

        computed: {
            ...mapGetters({
                profiles: "getProfiles",

            })
        },

        components: {
            // "site-workout": Workout
        },

        methods: {

            deleteProfile(id) {
                this.$store.dispatch("deleteProfile", id);
            }
        }
    };
</script>

<style lang="scss">

</style>
