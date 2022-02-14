import { Genre } from "../types";
import { apiGetRequest, StatusErrorResponse, StatusOKResponse } from "./api";

const BASE_URL = "/genre";

export type APIGenresOKResponse = {
    genres: Genre[];
};
export async function getMovieGenres() {
    const endpoint = "/movie/list";
    return apiGetRequest<APIGenresOKResponse>({ url: `${BASE_URL}${endpoint}` });
}
