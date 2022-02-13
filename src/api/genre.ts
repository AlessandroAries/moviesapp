import { apiGetRequest } from "./api";

const BASE_URL = "/genre";

export async function getMovieGenres() {
    const endpoint = "/movie/list";
    return apiGetRequest({ url: `${BASE_URL}${endpoint}` });
}
