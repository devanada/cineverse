"use server";

import { IFailed } from "@/utils/types/api";
import Fetch from "@/utils/apis/fetch";

export async function postLogin(body: any) {
  try {
    const response = await Fetch.create<ILogin>(
      "/authentication/token/validate_with_login",
      { body: JSON.stringify(body) }
    );

    return response;
  } catch (error) {
    const { status_message } = error as IFailed;

    throw new Error(status_message);
  }
}

export async function getRequestToken() {
  try {
    const response = await Fetch.get<ILogin>("/authentication/token/new");

    return response;
  } catch (error) {
    const { status_message } = error as IFailed;

    throw new Error(status_message);
  }
}

export async function createSessionID(request_token: string) {
  try {
    const response = await Fetch.create<ISession>(
      "/authentication/session/new",
      {
        body: JSON.stringify({ request_token }),
      }
    );
    const { session_id } = response;

    return session_id;
  } catch (error) {
    const { status_message } = error as IFailed;

    throw new Error(status_message);
  }
}

export async function getDetailAccount(session_id: string) {
  try {
    const response = await Fetch.get<IDetailAccount>("/account", {
      query: {
        session_id: session_id,
      },
    });
    const { id } = response;

    return id;
  } catch (error) {
    const { status_message } = error as IFailed;

    throw new Error(status_message);
  }
}

type ILogin = {
  success: boolean;
  expires_at: string;
  request_token: string;
};

interface ISession {
  success: boolean;
  session_id: string;
}

interface IDetailAccount {
  avatar: {
    gravatar: { hash: string };
    tmdb: { avatar_path: string | null };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}
