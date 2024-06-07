<script>
import { mapActions, mapState } from 'pinia'
import { useAuthStore } from '@/stores/useAuthStore.js'

export default {
    data() {
        return {
            dataRegister: {
                username: '',
                email: '',
                password: ''
            }
        }
    },
    computed: {
        ...mapState(useAuthStore, ['loading'])
    },
    methods: {
        ...mapActions(useAuthStore, ['handleRegister']),
        submitRegister() {
            this.handleRegister(this.dataRegister)
        }
    }
}
</script>
<template>
    <!-- Register -->
    <section class="vh-100" style="background-color: #508bfc;">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card shadow-2-strong" style="border-radius: 1rem;">
                        <div class="card-body p-5">
                            <h4 class="text-center mb-4">REGISTER</h4>
                            <p><b>Register your account here!</b></p>
                            <form @submit.prevent="submitRegister">
                                <div class="form-group mb-3">
                                    <label for="username" class="mb-2">Username</label>
                                    <input type="text" v-model="dataRegister.username" name="username"
                                        class="form-control" autofocus />
                                </div>

                                <div class="form-group mb-3">
                                    <label for="email" class="mb-2">E-mail Address</label>
                                    <input type="text" v-model="dataRegister.email" name="email" class="form-control" />
                                </div>

                                <div class="form-group mb-3">
                                    <label for="password" class="mb-2">Password</label>
                                    <input type="password" v-model="dataRegister.password" name="password"
                                        class="form-control" />
                                </div>

                                <div class="form-group" v-if="!loading">
                                    <button type="submit" class="btn btn-primary btn-block mt-3 mb-3">Register</button>
                                </div>
                                <div class="form-group" v-else>
                                    <button class="btn btn-primary" type="button" disabled>
                                        <span class="spinner-border spinner-border-sm" role="status"
                                            aria-hidden="true"></span>
                                        Register
                                    </button>
                                </div>

                                <div class="d-flex align-items-center justify-content-center pb-4">
                                    <p class="mb-0 me-2">Have an account?
                                        <router-link class="text-decoration-none" to="/login">
                                            Login</router-link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>