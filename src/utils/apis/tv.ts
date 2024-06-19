import { IFailed, IParams, IResponse } from "@/utils/types/api";
import { IReview, ITV, ITVDetail } from "@/utils/types/tv";
import Fetch from "@/utils/apis/fetch";

export async function getAiringTodayTV() {
  try {
    const response = await Fetch.get<IResponse<ITV[]>>("/tv/airing_today", {
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

export async function getOnTheAirTV() {
  try {
    const response = await Fetch.get<IResponse<ITV[]>>("/tv/on_the_air", {
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

export async function getPopularTV() {
  try {
    const response = await Fetch.get<IResponse<ITV[]>>("/tv/popular", {
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

export async function getTopRatedTV() {
  try {
    const response = await Fetch.get<IResponse<ITV[]>>("/tv/top_rated", {
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

export async function getDiscoverTV(params: IParams) {
  try {
    const response = await Fetch.get<IResponse<ITV[]>>("/discover/tv", {
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

export async function getDetailTV(series_id: string) {
  try {
    const response = await Fetch.get<ITVDetail>(`/tv/${series_id}`, {
      next: {
        tags: [`tv-${series_id}`],
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

export async function getTVReviews(series_id: string, params: IParams) {
  try {
    const response = await Fetch.get<IResponse<IReview[]>>(
      `/tv/${series_id}/reviews`,
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
