import { MOVIE_IMAGE_BASE_URL } from "./api/api";
import { Movie, MovieWithGenres } from "./types";

export function formatMovieGenresText(movie: MovieWithGenres) {
    return movie.genres.reduce(
        (acc, value, index) => `${acc}${index !== 0 ? ", " : ""}${value.name}`,
        ""
    );
}

export function formatMovieImageUrl(movie: Movie) {
    return `${MOVIE_IMAGE_BASE_URL}${movie.imagePath}`;
}
