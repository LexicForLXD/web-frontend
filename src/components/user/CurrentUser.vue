<template>
    <div>
        <div v-if="!editing">
            <div v-if="currentUser" class="card">
                <header class="card-header">
                    <div class="card-header-title">
                        Name: {{currentUser.firstName}} {{currentUser.lastName}}
                    </div>
                </header>
                <div class="card-content">
                    <p v-if="currentUser.firstName">First name: {{currentUser.firstName}}</p>
                    <p v-if="currentUser.lastName">Last name: {{currentUser.lastName}}</p>
                    <p v-if="currentUser.username">Username: {{currentUser.username}}</p>
                    <p v-if="currentUser.email">Email: {{currentUser.email}}</p>
                    <p v-if="currentUser.isActive">Active: <i v-bind:class="{ 'fa-times': !currentUser.isActive, 'fa-check': currentUser.isActive}"
                                  class="fa"> </i></p>

                </div>
                <footer class="card-footer">
                    <a href="#" class="card-footer-item" @click="onEdit">Edit</a>
                    <a href="#" class="card-footer-item" @click="onDelete">Delete</a>
                </footer>
            </div>
        </div>
        <div v-if="editing">
            <label class="label">First name</label>
            <input class="input" type="text" v-model="editFirstName">

            <label class="label">Last name</label>
            <input class="input" type="text" v-model="editLastName">

            <label class="label">Username</label>
            <input class="input" type="text" v-model="editLastName">

            <label class="label">Email</label>
            <input class="input" type="email" v-model="editEmail">

            <div class="field">
                <label class="label" for="active">Active</label>
                <div class="control">
                    <input type="checkbox" id="active" v-model="editActive">
                    <label for="active">Active</label>
                </div>
            </div>

            <button class="button" @click="onUpdate">Save</button>
            <button class="button" @click="onCancel">Abort</button>
        </div>
    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                currentUser: "getCurrentUser"
            }),
        },

        data() {
            return {
                editFirstName: "",
                editLastName: "",
                editUsername: "",
                editEmail: "",
                editActive: "",
                editing: false,
            }
        },

        methods: {
            onEdit() {
                this.editFirstName = this.currentUser.firstName;
                this.editLastName = this.currentUser.lastName;
                this.editUsername = this.currentUser.username;
                this.editEmail = this.currentUser.email;
                this.editActive = this.currentUser.isActive;
                this.editing = true;
            },

            onDelete() {
                this.$store.dispatch("deleteUser", this.currentUser.id);
                this.$router.push({ name: 'userOverview'});
            },

            onCancel() {
                this.editing = false;
            },

            onUpdate() {


                this.$store.dispatch("updateUser", {
                    userId: this.currentUser.id,
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