const API_KEY = "1f54bd990f1cdfb230adb312546d765d";
const API_BASE_URL = "https://api.themoviedb.org/3";
export const MOVIE_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original";
const API_HEADERS = {
    Accept: "application/json",
    "Content-Type": "application/json",
};
type Method = "GET" | "POST" | "PUT";

type QueryParameter = {
    name: string;
    value: string | number;
};

function createQueryStringFromQueryParameters(queryParameters: QueryParameter[]) {
    return queryParameters.reduce(
        (acc, queryParameter, index) =>
            acc +
            `${queryParameter.name}=${queryParameter.value}${
                index !== queryParameters.length - 1 ? "&" : ""
            }`,
        "?"
    );
}

type ApiRequestBaseParameters = {
    url: string;
    body?: BodyInit_;
    queryParameters?: QueryParameter[];
};
type ApiRequestParameters = ApiRequestBaseParameters & { method: Method };

type GenericErrorStatus = "error" | "network-error";

type StatusWithMessageResponse<T> = {
    status: T;
    message?: string;
};

export type StatusErrorResponse = StatusWithMessageResponse<GenericErrorStatus>;
export type StatusOKResponse<Data> = { status: "ok" } & Data;

export type APIResponse<OKResponse> = Promise<StatusErrorResponse | StatusOKResponse<OKResponse>>;

async function apiRequest<Response>({
    url,
    method,
    body,
    queryParameters,
}: ApiRequestParameters): APIResponse<Response> {
    queryParameters = queryParameters || [];
    queryParameters.push({ name: "api_key", value: API_KEY });
    const queryString = createQueryStringFromQueryParameters(queryParameters);
    const response = await fetch(`${API_BASE_URL}${url}${queryString}`, {
        method,
        headers: API_HEADERS,
        body,
    });
    const status = response.status.toString();
    // NOTE: Normally we would cover all kinds of statuses, but for simplicity we only have "ok" or "error"
    if (status.startsWith("2")) {
        const data = await response.json();
        return { status: "ok", ...data };
    } else {
        return { status: "error" };
    }
}

export function apiGetRequest<Response>(params: ApiRequestBaseParameters) {
    return apiRequest<Response>({ method: "GET", ...params });
}

export function apiPutRequest<Response>(params: ApiRequestBaseParameters) {
    return apiRequest<Response>({ method: "POST", ...params });
}

export function apiPostRequest<Response>(params: ApiRequestBaseParameters) {
    return apiRequest<Response>({ method: "PUT", ...params });
}
