<script>
import { RouterLink } from 'vue-router'
import { useAuthStore } from '../stores/useAuthStore';
import { mapState, mapActions } from 'pinia';

export default {
    computed: {
        ...mapState(useAuthStore, ["isLogin"])
    },
    methods: {
        ...mapActions(useAuthStore, ["handleLogout"]),
        logout() {
            this.handleLogout()
        }
    }
}
</script>
<template>
    <div>
        <!-- Navbar -->
        <nav class="custom navbar navbar-expand-lg navbar-light p-2">
            <div class="container">
                <a class="navbar-brand" href="#">
                    <h3 class="color-white">HACKTIV8 MOVIE</h3>
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse"
                    data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavDropdown">
                    <ul class="navbar-nav ms-auto">
                        <li class="nav-item">
                            <router-link class="nav-link" to="/"><b class="color-white">Home</b></router-link>
                        </li>
                        <li class="nav-item" v-if="isLogin === true">
                            <router-link class="nav-link" to="/favorites"><b class="color-white">Favorite</b>
                            </router-link>
                        </li>
                        <li class="nav-item" v-if="isLogin === true" @click.prevent="logout">
                            <a href="" class="nav-link"><b class="color-white">Logout</b></a>
                        </li>
                        <li class="nav-item" v-if="isLogin === false">
                            <router-link class="nav-link" to="/login"><b class="color-white">Login</b></router-link>
                        </li>
                        <li class="nav-item" v-if="isLogin === false">
                            <router-link class="nav-link" to="/register"><b class="color-white">Register</b>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    </div>
</template>
<style>
.custom {
    background-color: #0D6EFC;
    color: white;
}

.color-white {
    color: white;
}
</style>