import { defineStore } from 'pinia'
import instance from "../api/axiosInstance"
import Swal from 'sweetalert2'
import axios from 'axios'

export const useMovieStore = defineStore({
    id: 'useMovieStore',
    state: () => {
        return {
            movies: [],
            movie: {},
            qrcode: {},
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
        async readAllMovie(obj) {
            try {
                this.loading = true
                const { data } = await instance({
                    method: "GET",
                    url: '/movies',
                    params: obj
                })

                this.movies = data.data
            } catch (error) {
                this.alertError(error)
            } finally {
                this.loading = false
            }
        },
        async movieById(movieId) {
            try {
                this.loading = true
                const { data } = await instance({
                    method: "GET",
                    url: `/movies/${movieId}`
                })

                this.movie = data.movie
            } catch (error) {
                this.alertError(error)
            } finally {
                this.loading = false
            }
        },
        async qrCode(movieById) {
            try {
                // const apikey = "640747ChOVLrlcHglcoKZ0NOwANx0G1kGRPxbZr1xkQT9VqTsIFarpwj"
                // const { data } = await axios({
                //     method: "GET",
                //     url: "https://api.happi.dev/v1/qrcode",
                //     params: {
                //         data: "https://p2-challenge3-moviee.web.app/movies/" + movieById,
                //         apikey
                //     }
                // })

                const { data } = await axios({
                    method: "GET",
                    url: "https://qr-code-generator20.p.rapidapi.com/generatebasicimage",
                    params: {
                        data: "https://p2-challenge3-moviee.web.app/movies/" + movieById,
                        size: 500
                    },
                    headers: {
                        'x-rapidapi-key': '6900a2d093msh55f63874ea2b476p1e090fjsne05402a33918',
                        'x-rapidapi-host': 'qr-code-generator20.p.rapidapi.com'
                    }
                })

                this.qrcode = data.split('"')[1]
            } catch (error) {
                this.alertError(error)
            }
        },
        async addFavorite(movieId) {
            try {
                const { data } = await instance({
                    method: "POST",
                    url: `/favorites/${movieId}`,
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    }
                })

                this.router.push({ name: "favorites" })
                this.alertSuccess(data)
            } catch (error) {
                this.alertError(error)
            }
        },
        async readFavorite() {
            try {
                this.loading = true
                const { data } = await instance({
                    method: "GET",
                    url: '/favorites',
                    headers: {
                        access_token: localStorage.getItem("access_token")
                    }
                })

                this.movies = data.favorites
            } catch (error) {
                this.alertError(error)
            } finally {
                this.loading = false
            }
        }
    }
})

