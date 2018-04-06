<template>
    <div>
        <div class="field">
            <label class="label">First name</label>
            <div class="control">
                <input class="input" type="text" v-model="firstName" v-bind:class="{'is-danger': userErrors.firstName.length > 0}">
            </div>
            <div v-if="userErrors.firstName.length > 0" class="help is-danger">
                {{userErrors.firstName}}
            </div>
        </div>



        <div class="field">
            <label class="label">Last name</label>
            <div class="control">
                <input class="input" type="text" v-model="lastName" v-bind:class="{'is-danger': userErrors.lastName.length > 0}">
            </div>
            <div v-if="userErrors.lastName.length > 0" class="help is-danger">
                {{userErrors.lastName}}
            </div>
        </div>

        <div class="field">
            <label class="label">Username</label>
            <div class="control">
                <input class="input" type="text" v-model="username" v-bind:class="{'is-danger': userErrors.username.length > 0}">
            </div>
            <div v-if="userErrors.username.length > 0" class="help is-danger">
                {{userErrors.username}}
            </div>
        </div>


        <div class="field">
            <label class="label">Email</label>
            <div class="control">
                <input class="input" type="email" v-model="email" v-bind:class="{'is-danger': userErrors.email.length > 0}">
            </div>
            <div v-if="userErrors.email.length > 0" class="help is-danger">
                {{userErrors.email}}
            </div>
        </div>

        <div class="field">
            <label class="label">Password</label>
            <div class="control">
                <input class="input" type="password" v-model="password" v-bind:class="{'is-danger': userErrors.password.length > 0}">
            </div>
            <div v-if="userErrors.password.length > 0" class="help is-danger">
                {{userErrors.password}}
            </div>
        </div>

        <button class="button" @click="onSubmit">Save</button>

    </div>
</template>

<script>
    import {mapGetters} from 'vuex'

    export default {
        computed: {
            ...mapGetters({
                userErrors: "getUserErrors"
            })
        },

        data() {
            return {
                firstName: "",
                lastName: "",
                username: "",
                email: "",
                password: "",
            };
        },

        methods: {
            onSubmit() {
                let body = {
                    firstName: this.firstName,
                    lastName: this.lastName,
                    username: this.username,
                    email: this.email,
                    password: this.password,
                }

                Object.keys(body).forEach(
                    key =>
                        (body[key] === null || body[key] === undefined || body[key].length) ===
                        0 && delete body[key]
                );


                this.$store.dispatch("createUser", body).then(() => {
                    this.$router.push({ name: "userOverview"})
                }).catch(() => {

                });
            }
        }
    }
</script>

<style>

</style>
