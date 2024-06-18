"use server";

import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import { postWatchlistMovie, postFavoriteMovie } from "@/utils/apis/user";
import { FormActionResult } from "@/utils/hooks/use-form-action";

export async function handleAddFavorite(
  prevState: FormActionResult,
  formData: FormData
): Promise<FormActionResult> {
  const cookieStore = cookies();
  const userID = cookieStore.get("userID");

  if (!userID) {
    redirect("/login");
  }

  try {
    const media_id = +(formData.get("media_id") ?? 0);
    const payload = {
      media_type: "movie",
      media_id: media_id,
      favorite: true,
    };

    await postFavoriteMovie(payload);

    revalidateTag(`movie-${media_id}`);
    return {
      success: true,
      status_message: "Success added to favorite",
    };
  } catch (error) {
    return {
      success: false,
      status_message: "Failed to add to favorite",
    };
  }
}

export async function handleAddWatchlist(
  prevState: FormActionResult,
  formData: FormData
): Promise<FormActionResult> {
  const cookieStore = cookies();
  const userID = cookieStore.get("userID");

  if (!userID) {
    redirect("/login");
  }

  try {
    const media_id = +(formData.get("media_id") ?? 0);
    const payload = {
      media_type: "movie",
      media_id: media_id,
      watchlist: true,
    };

    await postWatchlistMovie(payload);

    revalidateTag(`movie-${media_id}`);
    return {
      success: true,
      status_message: "Success added to watchlist",
    };
  } catch (error) {
    return {
      success: false,
      status_message: "Failed to add to watchlist",
    };
  }
}

export async function handleRemoveFavorite(
  prevState: FormActionResult,
  formData: FormData
): Promise<FormActionResult> {
  try {
    const media_id = +(formData.get("media_id") ?? 0);
    const payload = {
      media_type: "movie",
      media_id: media_id,
      favorite: false,
    };

    await postFavoriteMovie(payload);

    revalidateTag(`movie-${media_id}`);
    return {
      success: true,
      status_message: "Success removed from favorite",
    };
  } catch (error) {
    return {
      success: false,
      status_message: "Failed to remove from favorite",
    };
  }
}

export async function handleRemoveWatchlist(
  prevState: FormActionResult,
  formData: FormData
): Promise<FormActionResult> {
  try {
    const media_id = +(formData.get("media_id") ?? 0);
    const payload = {
      media_type: "movie",
      media_id: media_id,
      watchlist: false,
    };

    await postWatchlistMovie(payload);

    revalidateTag(`movie-${media_id}`);
    return {
      success: true,
      status_message: "Success removed from watchlist",
    };
  } catch (error) {
    return {
      success: false,
      status_message: "Failed to remove from watchlist",
    };
  }
}
