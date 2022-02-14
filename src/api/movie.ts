import { apiGetRequest, StatusErrorResponse, StatusOKResponse } from "./api";

const BASE_URL = "/movie";

export type APIMovie = {
    poster_path?: string;
    adult: boolean;
    overview: string;
    release_date: string;
    genre_ids: number[];
    id: number;
    original_title: string;
    original_language: string;
    title: string;
    backdrop_path?: string;
    popularity: number;
    vote_count: number;
    video: boolean;
    vote_average: number;
    dates: {
        maximum: string;
        minimum: string;
    };
};

export type UpcomingMoviesOKResponse = {
    page: number;
    results: APIMovie[];
    total_pages: number;
    total_result: number;
};
export async function getUpcomingMovies(page?: number) {
    const endpoint = "/upcoming";
    return apiGetRequest<UpcomingMoviesOKResponse>({
        url: `${BASE_URL}${endpoint}`,
        queryParameters: page ? [{ name: "page", value: page }] : undefined,
    });
}
