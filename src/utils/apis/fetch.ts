import { cookies } from "next/headers";

import { IParams, IFailed } from "@/utils/types/api";

const BASE_URL = "https://api.themoviedb.org/3";

interface RequestOptions extends RequestInit {
  query?: IParams;
}

async function request<TResponse>(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  requestOptions?: RequestOptions
) {
  try {
    const options: RequestInit = {
      ...requestOptions,
      method,
    };
    const headers = new Headers(options.headers);
    const urlQuery = url + constructQueryParams(requestOptions?.query);

    if (requestOptions?.body && !(requestOptions.body instanceof FormData)) {
      headers.set("content-type", "application/json");
      headers.set("accept", "application/json");
      options.headers = headers;
    }

    const response = await fetch(BASE_URL + urlQuery, options);
    console.log(BASE_URL + urlQuery);

    if (response.ok) {
      return (await response.json()) as TResponse;
    }

    return Promise.reject((await response.json()) as IFailed);
  } catch (error) {
    throw error;
  }
}

function constructQueryParams(query?: IParams) {
  const cookieStore = cookies();
  const sessionID = cookieStore.get("sessionID")?.value;
  const params = new URLSearchParams({
    api_key: process.env.API_KEY ?? "",
    session_id: sessionID ?? "",
  });

  if (query) {
    for (const [key, value] of Object.entries(query)) {
      // Ensure valid values before adding to URLSearchParams
      if (value !== undefined) {
        params.append(key, value.toString());
      }
    }
  }

  return `?${params.toString()}`;
}

export default {
  get: <TResponse>(url: string, params?: RequestOptions) =>
    request<TResponse>(url, "GET", params),
  create: <TResponse>(url: string, params?: RequestOptions) =>
    request<TResponse>(url, "POST", params),
  update: <TResponse>(url: string, params?: RequestOptions) =>
    request<TResponse>(url, "PUT", params),
  remove: <TResponse>(url: string, params?: RequestOptions) =>
    request<TResponse>(url, "DELETE", params),
};
