<script>
import EntityItem from '@/components/EntityItem.vue';
import { mapActions, mapState } from 'pinia';
import { useMovieStore } from '@/stores/useMovieStore';

export default {
    props: ["title", "genreId"],
    components: {
        EntityItem
    },
    computed: {
        ...mapState(useMovieStore, ['movies', 'loading'])
    },
    methods: {
        ...mapActions(useMovieStore, ["readAllMovie"]),
        pageNumber() {
            let number = []
            for (let i = 0; i <= this.movies.totalPages; i++) {
                number.push(i)
            }
            return number
        },
        pagination(page) {
            let obj = {
                page,
                size: 8
            }

            if (this.title !== '') {
                obj.title = this.title
            }

            if (+this.genreId !== 0) {
                obj.genre = this.genreId
            } else {
                delete obj['genre']
            }

            this.readAllMovie(obj)
            this.$router.push({
                path: "/",
                query: obj
            })
        }
    },
    created() {
        this.readAllMovie()
    }
}
</script>
<template>
    <div v-if="loading">
        <div class="d-flex justify-content-center mt-5">
            <div class="spinner-border text-primary" style="width: 3rem; height: 3rem;" role="status">
                <span class="visually-hidden">Loading...</span>
            </div>
        </div>
    </div>
    <div v-else>
        <div v-if="movies.movies.length === 0" class="text-center mt-5">
            <h3>Data Not Found</h3>
        </div>
        <div v-else>
            <div class="row mb-3">
                <EntityItem v-for="(movie, idx) in movies.movies" :key="idx" :movie="movie" />
            </div>
            <nav aria-label="Page navigation example">
                <ul class="pagination justify-content-center mt-5">
                    <li class="page-item">
                        <a v-if="movies.currentPage === 0" class="page-link disabled" href="#" aria-label="Previous">
                            <span aria-hidden="true">Previous</span>
                        </a>
                        <a v-else class="page-link" href="#" aria-label="Previous"
                            @click.prevent="pagination((this.movies.currentPage - 1) + 1)">
                            <span aria-hidden="true">Previous</span>
                        </a>
                    </li>
                    <li class="page-item" v-for="page in pageNumber()" :key="page">
                        <a class="page-link page" href="#" @click.prevent="pagination(page + 1)">
                            {{ page + 1 }}
                        </a>
                    </li>
                    <li class="page-item">
                        <a v-if="movies.currentPage === movies.totalPages" class="page-link disabled" href="#"
                            aria-label="Next">
                            <span aria-hidden="true">Next</span>
                        </a>
                        <a v-else class="page-link" href="#" aria-label="Next"
                            @click.prevent="pagination(this.movies.currentPage + 2)">
                            <span aria-hidden="true">Next</span>
                        </a>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
</template>