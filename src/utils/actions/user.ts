import { cookies } from "next/headers";

import { IParams, IResponse } from "@/utils/types/api";
import { IMovie } from "@/utils/types/movies";
import { buildQueryString } from "@/utils/formatter";

export async function getFavoriteMovies(params: IParams) {
  const cookieStore = cookies();
  const userID = cookieStore.get("userID");

  try {
    const query = buildQueryString(params);
    const url = query
      ? `https://api.themoviedb.org/3/account/${userID}/favorite/movies${query}&language=en-US`
      : `https://api.themoviedb.org/3/account/${userID}/favorite/movies?language=en-US`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTY3ZDAyNWNhMGI3NzE2NTcwOTg0MTcwOTY5ZTg4ZiIsInN1YiI6IjYyY2UzMDFjNGRjMzRhMDA0ZTM5NDMyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GFxoj8wdfWn0QHVYxVfcn47_4-QJ2BjC2bQ7U0wR-BI",
      },
    });

    const result = await response.json();

    return result as IResponse<IMovie[]>;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export async function getFavoriteTv(params: IParams) {
  const cookieStore = cookies();
  const userID = cookieStore.get("userID");

  try {
    const query = buildQueryString(params);
    const url = query
      ? `https://api.themoviedb.org/3/account/${userID}/favorite/tv${query}&language=en-US`
      : `https://api.themoviedb.org/3/account/${userID}/favorite/tv?language=en-US`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTY3ZDAyNWNhMGI3NzE2NTcwOTg0MTcwOTY5ZTg4ZiIsInN1YiI6IjYyY2UzMDFjNGRjMzRhMDA0ZTM5NDMyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GFxoj8wdfWn0QHVYxVfcn47_4-QJ2BjC2bQ7U0wR-BI",
      },
    });

    const result = await response.json();

    return result as IResponse<IMovie[]>;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export async function getWatchlistMovies(params: IParams) {
  const cookieStore = cookies();
  const userID = cookieStore.get("userID");

  try {
    const query = buildQueryString(params);
    const url = query
      ? `https://api.themoviedb.org/3/account/${userID}/watchlist/movies${query}&language=en-US`
      : `https://api.themoviedb.org/3/account/${userID}/watchlist/movies?language=en-US`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTY3ZDAyNWNhMGI3NzE2NTcwOTg0MTcwOTY5ZTg4ZiIsInN1YiI6IjYyY2UzMDFjNGRjMzRhMDA0ZTM5NDMyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GFxoj8wdfWn0QHVYxVfcn47_4-QJ2BjC2bQ7U0wR-BI",
      },
    });

    const result = await response.json();

    return result as IResponse<IMovie[]>;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export async function getWatchlistTv(params: IParams) {
  const cookieStore = cookies();
  const userID = cookieStore.get("userID");

  try {
    const query = buildQueryString(params);
    const url = query
      ? `https://api.themoviedb.org/3/account/${userID}/watchlist/tv${query}&language=en-US`
      : `https://api.themoviedb.org/3/account/${userID}/watchlist/tv?language=en-US`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTY3ZDAyNWNhMGI3NzE2NTcwOTg0MTcwOTY5ZTg4ZiIsInN1YiI6IjYyY2UzMDFjNGRjMzRhMDA0ZTM5NDMyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GFxoj8wdfWn0QHVYxVfcn47_4-QJ2BjC2bQ7U0wR-BI",
      },
    });

    const result = await response.json();

    return result as IResponse<IMovie[]>;
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export async function postWatchlistMovie(payload: PostWatchlist) {
  const cookieStore = cookies();
  const userID = cookieStore.get("userID");

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/account/${userID}/watchlist`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTY3ZDAyNWNhMGI3NzE2NTcwOTg0MTcwOTY5ZTg4ZiIsInN1YiI6IjYyY2UzMDFjNGRjMzRhMDA0ZTM5NDMyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GFxoj8wdfWn0QHVYxVfcn47_4-QJ2BjC2bQ7U0wR-BI",
        },
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) {
      const result = await response.json();

      return result;
    }

    return Promise.reject(response);
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

export async function postFavoriteMovie(payload: PostFavorite) {
  const cookieStore = cookies();
  const userID = cookieStore.get("userID");

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/account/${userID}/favorite`,
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTY3ZDAyNWNhMGI3NzE2NTcwOTg0MTcwOTY5ZTg4ZiIsInN1YiI6IjYyY2UzMDFjNGRjMzRhMDA0ZTM5NDMyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GFxoj8wdfWn0QHVYxVfcn47_4-QJ2BjC2bQ7U0wR-BI",
        },
        body: JSON.stringify(payload),
      }
    );

    if (response.ok) {
      const result = await response.json();

      return result;
    }

    return Promise.reject(response);
  } catch (error) {
    throw new Error("Failed to fetch data");
  }
}

interface PostPayload {
  media_type: string;
  media_id: number;
}

interface PostWatchlist extends PostPayload {
  watchlist: boolean;
}

interface PostFavorite extends PostPayload {
  favorite: boolean;
}
