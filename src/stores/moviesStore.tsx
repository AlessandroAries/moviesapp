import { action, computed, makeObservable, observable } from "mobx";
import { getUpcomingMovies, Movie } from "../api/movie";

export class MoviesStore {
    @observable
    private upcomingMovies: Movie[] = [];

    @observable
    private upcomingMoviesCurrentPage: number = 1;

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
        const response = await getUpcomingMovies(1);
        if (response.status !== "ok") {
            // TODO
            console.warn("no status ok");
            return;
        }
        this.setUpcomingMovies(response.results);
        this.setUpcomingMoviesTotalPages(response.total_pages);
    }

    @action
    async loadNextPageUpcomingMovies(): Promise<boolean> {
        if (this.upcomingMoviesCurrentPage === this.upcomingMoviesTotalPages) {
            return true;
        }

        this.setUpcomingMoviesCurrentPage(this.upcomingMoviesCurrentPage + 1);
        const response = await getUpcomingMovies(this.upcomingMoviesCurrentPage);
        if (response.status !== "ok") {
            // TODO
            return false;
        }
        this.setUpcomingMovies([...this.upcomingMovies, ...response.results]);
        return this.upcomingMoviesCurrentPage === this.upcomingMoviesTotalPages;
    }

    @action
    setUpcomingMovies(upcomingMovies: Movie[]) {
        this.upcomingMovies = upcomingMovies;
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

    // Computed values
    @computed
    get filteredUpcomingMovies() {
        const nameFilter = this.upcomingMoviesNameFilter;
        if (!nameFilter) {
            return this.upcomingMovies;
        }

        return this.upcomingMovies.filter((upcomingMovie) =>
            upcomingMovie.title.toLowerCase().includes(nameFilter.toLowerCase())
        );
    }
}
