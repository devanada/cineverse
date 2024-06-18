import { IFailed, IParams, IResponse } from "@/utils/types/api";
import { IAccountStates, IMovie, IReview } from "@/utils/types/movies";
import Fetch from "@/utils/apis/fetch";

export async function getPopularMovies() {
  try {
    const response = await Fetch.get<IResponse<IMovie[]>>("/movie/popular", {
      query: {
        language: "en-US",
        page: "1",
      },
    });

    return response;
  } catch (error) {
    const { status_message } = error as IFailed;

    throw new Error(status_message);
  }
}

export async function getNowPlaying() {
  try {
    const response = await Fetch.get<IResponse<IMovie[]>>(
      "/movie/now_playing",
      {
        query: {
          language: "en-US",
          page: "1",
        },
      }
    );

    return response;
  } catch (error) {
    const { status_message } = error as IFailed;

    throw new Error(status_message);
  }
}

export async function getTopRated() {
  try {
    const response = await Fetch.get<IResponse<IMovie[]>>("/movie/top_rated", {
      query: {
        language: "en-US",
        page: "1",
      },
    });

    return response;
  } catch (error) {
    const { status_message } = error as IFailed;

    throw new Error(status_message);
  }
}

export async function getUpcoming() {
  try {
    const response = await Fetch.get<IResponse<IMovie[]>>("/movie/upcoming", {
      query: {
        language: "en-US",
        page: "1",
      },
    });

    return response;
  } catch (error) {
    const { status_message } = error as IFailed;

    throw new Error(status_message);
  }
}

export async function getDiscoverMovie(params: IParams) {
  try {
    const response = await Fetch.get<IResponse<IMovie[]>>("/discover/movie", {
      query: {
        language: "en-US",
        ...params,
      },
    });

    return response;
  } catch (error) {
    const { status_message } = error as IFailed;

    throw new Error(status_message);
  }
}

export async function getDetailMovie(movie_id: string) {
  try {
    const response = await Fetch.get<IMovie>(`/movie/${movie_id}`, {
      next: {
        tags: [`movie-${movie_id}`],
      },
      query: {
        language: "en-US",
        append_to_response: "videos,reviews,credits,similar,account_states",
      },
    });

    return response;
  } catch (error) {
    const { status_message } = error as IFailed;

    throw new Error(status_message);
  }
}

export async function getAccountStates(movie_id: string) {
  try {
    const response = await Fetch.get<IAccountStates>(
      `/movie/${movie_id}/account_states`
    );

    return response;
  } catch (error) {
    const { status_message } = error as IFailed;

    throw new Error(status_message);
  }
}

export async function getMovieReviews(movie_id: string, params: IParams) {
  try {
    const response = await Fetch.get<IResponse<IReview[]>>(
      `/movie/${movie_id}/reviews`,
      {
        query: {
          language: "en-US",
        },
      }
    );

    return response;
  } catch (error) {
    const { status_message } = error as IFailed;

    throw new Error(status_message);
  }
}
