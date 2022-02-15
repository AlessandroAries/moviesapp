import dayjs from "dayjs";
import { action, computed, makeObservable, observable } from "mobx";
import { getMovieGenres } from "../api/genre";
import { getUpcomingMovies, APIMovie } from "../api/movie";
import { Genre, Movie } from "../types";

export class MoviesStore {
    @observable
    upcomingMoviesState: "loading" | "failed" | "done" = "loading";

    @observable
    private upcomingMovies: Movie[] = [];

    @observable
    private movieGenres: Genre[] = [];

    @observable
    private upcomingMoviesCurrentPage: number = 0;

    @observable
    private upcomingMoviesTotalPages: number = 0;

    @observable
    private upcomingMoviesNameFilter?: string;

    constructor() {
        makeObservable(this);

        this.refreshUpcomingMovies().catch((error) => {
            console.error(
                "Error while refreshing upcoming movies in moviesStore constructor",
                JSON.stringify(error)
            );
        });
    }

    // Actions
    @action
    async refreshUpcomingMovies() {
        this.setUpcomingMoviesState("loading");
        this.setUpcomingMoviesCurrentPage(1);
        const [upcomingMoviesResponse, genresResponse] = await Promise.all([
            getUpcomingMovies(this.upcomingMoviesCurrentPage),
            getMovieGenres(),
        ]);
        if (upcomingMoviesResponse.status === "ok") {
            this.setUpcomingMovies(this.mapApiMoviesToMovies(upcomingMoviesResponse.results));
            this.setUpcomingMoviesTotalPages(upcomingMoviesResponse.total_pages);
            this.setUpcomingMoviesState("done");
        } else {
            this.setUpcomingMoviesState("failed");
        }
        if (genresResponse.status === "ok") {
            this.setMovieGenres(genresResponse.genres);
        } else {
            // Try to fetch genres a second time
            const secondMovieGenresResponse = await getMovieGenres();
            if (secondMovieGenresResponse.status === "ok") {
                this.setMovieGenres(secondMovieGenresResponse.genres);
            }
            // If this also fails, the user can refresh the movies and therefor also the movies by manually refreshing
        }
    }

    @action
    async loadNextPageUpcomingMovies(): Promise<boolean> {
        if (this.upcomingMoviesState === "loading" || this.upcomingMoviesState === "failed") {
            throw new Error("Upcoming movies is loading or failed while loading next page");
        }
        if (this.upcomingMoviesCurrentPage === 1 && this.upcomingMoviesTotalPages === 0) {
            // First refresh went wrong
            await this.refreshUpcomingMovies();
            return false;
        }
        if (this.upcomingMoviesCurrentPage === this.upcomingMoviesTotalPages) {
            return true;
        }

        const response = await getUpcomingMovies(this.upcomingMoviesCurrentPage + 1);
        if (response.status !== "ok") {
            // This will not set current page so the next time this page will be fetched
            return false;
        }
        this.setUpcomingMoviesCurrentPage(this.upcomingMoviesCurrentPage + 1);
        this.setUpcomingMovies([
            ...this.upcomingMovies,
            ...this.mapApiMoviesToMovies(response.results),
        ]);
        return this.upcomingMoviesCurrentPage === this.upcomingMoviesTotalPages;
    }

    @action
    setUpcomingMovies(upcomingMovies: Movie[]) {
        this.upcomingMovies = upcomingMovies;
    }

    @action
    setUpcomingMoviesState(state: "loading" | "failed" | "done") {
        this.upcomingMoviesState = state;
    }

    @action
    setUpcomingMoviesNameFilter(filter: string) {
        this.upcomingMoviesNameFilter = filter;
    }

    @action
    setUpcomingMoviesCurrentPage(page: number) {
        this.upcomingMoviesCurrentPage = page;
    }

    @action
    setUpcomingMoviesTotalPages(totalPages: number) {
        this.upcomingMoviesTotalPages = totalPages;
    }

    @action
    setMovieGenres(genres: Genre[]) {
        this.movieGenres = genres;
    }

    getGenresOfMovie(movie: APIMovie) {
        return this.movieGenres.filter((genre) => movie.genre_ids.includes(genre.id));
    }

    mapApiMoviesToMovies(apiMovies: APIMovie[]) {
        return apiMovies.map((apiMovie) =>
            mapAPIMovieToMovie(apiMovie, this.getGenresOfMovie(apiMovie))
        );
    }

    // Computed values
    @computed
    get filteredUpcomingMovies(): Movie[] {
        const nameFilter = this.upcomingMoviesNameFilter;
        if (
            this.upcomingMoviesState === "failed" ||
            this.upcomingMoviesState === "loading" ||
            !nameFilter
        ) {
            return this.upcomingMovies;
        }

        return this.upcomingMovies.filter((upcomingMovie) =>
            upcomingMovie.title.toLowerCase().includes(nameFilter.toLowerCase())
        );
    }
}

function mapAPIMovieToMovie(apiMovie: APIMovie, genres: Genre[]): Movie {
    return {
        title: apiMovie.title,
        genres,
        imagePath: apiMovie.poster_path || apiMovie.backdrop_path,
        releaseDate: dayjs(apiMovie.release_date).valueOf(),
        overview: apiMovie.overview,
    };
}
