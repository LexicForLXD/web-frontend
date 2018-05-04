<template>
    <v-card v-if="user">
        <v-toolbar>
            <v-toolbar-title>
                Name: {{user.firstName}} {{user.lastName}}
            </v-toolbar-title>
        </v-toolbar>
        <v-card-text v-if="!editing">
            <p v-if="user.firstName">First name: <b>{{user.firstName}}</b></p>
            <p v-if="user.lastName">Last name: <b>{{user.lastName}}</b></p>
            <p v-if="user.username">Username: <b>{{user.username}}</b></p>
            <p v-if="user.email">Email: <b>{{user.email}}</b></p>
            <p>Active:
                <v-icon v-if="user.isActive">done</v-icon>
                <v-icon v-else>error</v-icon>
            </p>
        </v-card-text>
        <v-card-text v-if="editing">
            <v-form v-model="valid">
                <v-text-field
                        label="First name"
                        v-model="editFirstName"
                        :rules="[v => !!v || 'First name is required']"
                        required
                />

                <v-text-field
                        label="Last name"
                        v-model="editLastName"
                        :rules="[v => !!v || 'Last name is required']"
                        required
                />

                <v-text-field
                        label="Username"
                        v-model="editUsername"
                        :rules="[v => !!v || 'Username is required']"
                        required
                />
                <v-text-field
                        label="Email"
                        v-model="editEmail"
                        :rules="[v => !!v || 'Email is required']"
                        required
                />

                <v-btn
                        @click="onUpdate"
                        :disabled="!valid"
                >
                    Submit
                </v-btn>
            </v-form>
        </v-card-text>

        <v-card-actions v-if="!editing">
            <v-btn flat @click="onEdit">Edit</v-btn>
            <v-btn v-if="currentUser.id !== user.id" flat @click="onDelete">Delete</v-btn>
        </v-card-actions>
        <v-card-actions v-else>
            <v-btn flat @click="onCancel">Abort</v-btn>
        </v-card-actions>

    </v-card>

</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                userErrors: "getUserErrors",
            }),

            currentUser() {
                return this.$store.getters.getCurrentUser();
            },

            user() {
                if(this.$store.state.route.name === "userCurrent") {
                    return this.$store.getters.getCurrentUser();
                }
                return this.$store.getters.getUserByIndex(this.index);
            }
        },

        data() {
            return {
                editFirstName: "",
                editLastName: "",
                editUsername: "",
                editEmail: "",
                editActive: "",
                editing: false,
                index: this.$route.params.index,
            }
        },

        methods: {
            onEdit() {
                this.editFirstName = this.user.firstName;
                this.editLastName = this.user.lastName;
                this.editUsername = this.user.username;
                this.editEmail = this.user.email;
                this.editActive = this.user.isActive;
                this.editing = true;
            },

            onDelete() {
                this.$store.dispatch("deleteUser", this.user.id);
                this.$router.push({name: 'userOverview'});
            },

            onCancel() {
                this.editing = false;
            },

            onUpdate() {


                this.$store.dispatch("updateUser", {
                    userId: this.user.id,
                    user: {
                        firstName: this.editFirstName,
                        lastName: this.editLastName,
                        username: this.editUsername,
                        email: this.editEmail,
                        isActive: this.editActive
                    }
                })
            }
        },

    }
</script>

<style>

</style>