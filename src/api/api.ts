const API_KEY = "1f54bd990f1cdfb230adb312546d765d";
const API_BASE_URL = "https://api.themoviedb.org/3";
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

export type GenericErrorResponse<T> = StatusWithMessageResponse<T>;

export type StatusWithMessageResponse<T> = {
    status: T;
    message?: string;
};

export type StatusErrorResponse = GenericErrorResponse<GenericErrorStatus>;
export type StatusOKResponse<Data> = { status: "ok" } & Data;

export type APIResponse<Response extends StatusErrorResponse> = Promise<Response>;

async function apiRequest<Response extends StatusErrorResponse>({
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
    const data = await response.json();
    if (response.status === 200) {
        return { status: "ok", ...data };
    }
    // TODO: implement other statuses
    throw new Error("Error");
}

export function apiGetRequest<Response extends StatusErrorResponse>(
    params: ApiRequestBaseParameters
) {
    return apiRequest<Response>({ method: "GET", ...params });
}

export function apiPutRequest<Response extends StatusErrorResponse>(
    params: ApiRequestBaseParameters
) {
    return apiRequest<Response>({ method: "POST", ...params });
}

export function apiPostRequest<Response extends StatusErrorResponse>(
    params: ApiRequestBaseParameters
) {
    return apiRequest<Response>({ method: "PUT", ...params });
}
