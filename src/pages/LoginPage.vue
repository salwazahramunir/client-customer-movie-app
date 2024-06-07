<script>
import { mapActions, mapState } from 'pinia'
import { useAuthStore } from '@/stores/useAuthStore.js'

export default {
    data() {
        return {
            dataLogin: {
                email: '',
                password: ''
            }
        }
    },
    computed: {
        ...mapState(useAuthStore, ['loading'])
    },
    methods: {
        ...mapActions(useAuthStore, ["loginHandle", "handleCredentialResponse"]),
        submitLogin() {
            this.loginHandle(this.dataLogin)
        },
        handleOAuth(response) {
            this.handleCredentialResponse(response)
        }
    },
    mounted() {
        const cb = this.handleOAuth

        google.accounts.id.initialize({
            client_id: "791363677607-agrt8gc23mv8bdmptearcbejck5kesjn.apps.googleusercontent.com",
            callback: cb
        });
        google.accounts.id.renderButton(
            document.getElementById("buttonDiv"),
            { theme: "outline", size: "large" }
        );
    }
}
</script>
<template>
    <!-- Login -->
    <section class="vh-100" style="background-color: #508bfc;">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card shadow-2-strong" style="border-radius: 1rem;">
                        <div class="card-body p-5">
                            <h4 class="text-center mb-4">LOGIN</h4>
                            <p><b>Login to your account here!</b></p>
                            <form @submit.prevent="submitLogin">
                                <div class="form-group mb-3">
                                    <label for="">E-mail Address</label>
                                    <input type="text" v-model="dataLogin.email" class="form-control mt-2" autofocus>
                                </div>
                                <div class="form-group mb-3">
                                    <label for="">Password</label>
                                    <input type="password" v-model="dataLogin.password" class="form-control mt-2">
                                </div>

                                <div class="form-group" v-if="!loading">
                                    <button type="submit" class="btn btn-primary btn-block mt-3 mb-3">Login</button>
                                </div>
                                <div class="form-group" v-else>
                                    <button class="btn btn-primary" type="button" disabled>
                                        <span class="spinner-border spinner-border-sm" role="status"
                                            aria-hidden="true"></span>
                                        Login
                                    </button>
                                </div>

                                <div class="d-flex align-items-center justify-content-center pb-4">
                                    <p class="mb-0 me-2">Don't have an account?
                                        <router-link class="text-decoration-none" to="/register">
                                            Register</router-link>
                                    </p>
                                </div>

                                <p class="text-center">Sign In with :</p>
                                <div class="d-flex justify-content-center" id="buttonDiv"></div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>