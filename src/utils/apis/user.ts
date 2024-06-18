import { cookies } from "next/headers";

import { IFailed, IMessage, IParams, IResponse } from "@/utils/types/api";
import { IMovie } from "@/utils/types/movies";
import Fetch from "@/utils/apis/fetch";

export async function getFavoriteMovies(params: IParams) {
  const cookieStore = cookies();
  const userID = cookieStore.get("userID");

  try {
    const response = await Fetch.get<IResponse<IMovie[]>>(
      `/account/${userID}/favorite/movies`,
      {
        query: {
          language: "en-US",
          ...params,
        },
      }
    );

    return response;
  } catch (error) {
    const { status_message } = error as IFailed;

    throw new Error(status_message);
  }
}

export async function getFavoriteTv(params: IParams) {
  const cookieStore = cookies();
  const userID = cookieStore.get("userID");

  try {
    const response = await Fetch.get<IResponse<IMovie[]>>(
      `/account/${userID}/favorite/tv`,
      {
        query: {
          language: "en-US",
          ...params,
        },
      }
    );

    return response;
  } catch (error) {
    const { status_message } = error as IFailed;

    throw new Error(status_message);
  }
}

export async function getWatchlistMovies(params: IParams) {
  const cookieStore = cookies();
  const userID = cookieStore.get("userID");

  try {
    const response = await Fetch.get<IResponse<IMovie[]>>(
      `/account/${userID}/watchlist/movies`,
      {
        query: {
          language: "en-US",
          ...params,
        },
      }
    );

    return response;
  } catch (error) {
    const { status_message } = error as IFailed;

    throw new Error(status_message);
  }
}

export async function getWatchlistTv(params: IParams) {
  const cookieStore = cookies();
  const userID = cookieStore.get("userID");

  try {
    const response = await Fetch.get<IResponse<IMovie[]>>(
      `/account/${userID}/watchlist/tv`,
      {
        query: {
          language: "en-US",
          ...params,
        },
      }
    );

    return response;
  } catch (error) {
    const { status_message } = error as IFailed;

    throw new Error(status_message);
  }
}

export async function postFavoriteMovie(payload: PostFavorite) {
  const cookieStore = cookies();
  const userID = cookieStore.get("userID");

  try {
    const response = await Fetch.create<IMessage>(
      `/account/${userID}/favorite`,
      {
        body: JSON.stringify(payload),
      }
    );

    return response;
  } catch (error) {
    const { status_message } = error as IFailed;

    throw new Error(status_message);
  }
}

export async function postWatchlistMovie(payload: PostWatchlist) {
  const cookieStore = cookies();
  const userID = cookieStore.get("userID");

  try {
    const response = await Fetch.create<IMessage>(
      `/account/${userID}/watchlist`,
      {
        body: JSON.stringify(payload),
      }
    );

    return response;
  } catch (error) {
    const { status_message } = error as IFailed;

    throw new Error(status_message);
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
