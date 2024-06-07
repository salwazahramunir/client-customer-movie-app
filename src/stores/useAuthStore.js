import { defineStore } from 'pinia'
import instance from "../api/axiosInstance"
import Swal from 'sweetalert2'

export const useAuthStore = defineStore({
    id: 'useAuthStore',
    state: () => {
        return {
            isLogin: false,
            loading: false
        }
    },
    getters: {

    },
    actions: {
        alertSuccess(res) {
            Swal.fire({
                title: 'Success!',
                text: res.message,
                icon: 'success',
                confirmButtonText: 'OK'
            })
        },
        alertError(err) {
            Swal.fire({
                title: 'Error!',
                text: err.response.data.message,
                icon: 'error',
                confirmButtonText: 'OK'
            })
        },
        async loginHandle(obj) {
            try {
                this.loading = true
                const { data } = await instance({
                    method: "POST",
                    url: '/login',
                    data: {
                        email: obj.email,
                        password: obj.password
                    }
                })

                localStorage.setItem("access_token", data.access_token);
                this.router.push({ name: "home" })
                this.alertSuccess(data)
                obj = {}
                this.isLogin = true
                console.log(this.isLogin, "lgin");
            } catch (error) {
                console.log(error);
                this.alertError(error)
            } finally {
                this.loading = false
            }
        },
        async handleRegister(obj) {
            try {
                this.loading = true
                const { data } = await instance({
                    method: "POST",
                    url: '/register',
                    data: {
                        username: obj.username,
                        email: obj.email,
                        password: obj.password
                    }
                })

                this.router.push({ name: "login" })
                this.alertSuccess(data)
                obj = {}
            } catch (error) {
                this.alertError(error)
            } finally {
                this.loading = false
            }
        },
        async handleCredentialResponse(response) {
            try {
                const { data } = await instance({
                    method: "POST",
                    url: '/login-google',
                    headers: {
                        google_token: response.credential
                    }
                })

                localStorage.setItem("access_token", data.access_token)

                this.isLogin = true

                this.router.push({ name: "home" })
                this.alertSuccess(data)
            } catch (error) {
                this.alertError(error)
            }
        },
        handleLogout() {
            Swal.fire({
                title: 'Logout?',
                icon: 'question',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Yes'
            }).then((result) => {
                if (result.isConfirmed) {
                    localStorage.clear()
                    this.isLogin = false
                    this.router.push({ name: "home" })
                }
            })
        }
    }
})
