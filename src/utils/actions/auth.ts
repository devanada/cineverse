"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function onSubmitLogin(prevState: any, formData: FormData) {
  "use server";

  const rawFormData = {
    password: formData.get("password"),
    request_token: await getRequestToken(),
    username: formData.get("username"),
  };

  try {
    const result = await postLogin(rawFormData);
    const getSessionID = await createSessionID(result.request_token);
    const getUserID = await getDetailAccount(getSessionID);

    cookies().set("userID", String(getUserID), { secure: true });
    cookies().set("sessionID", getSessionID, { secure: true });
  } catch (error) {
    const response = await (error as Response).json();

    return { message: response.status_message };
  }

  revalidatePath("/");
  redirect("/");
}

export async function postLogin(body: any) {
  "use server";

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/authentication/token/validate_with_login",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTY3ZDAyNWNhMGI3NzE2NTcwOTg0MTcwOTY5ZTg4ZiIsInN1YiI6IjYyY2UzMDFjNGRjMzRhMDA0ZTM5NDMyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GFxoj8wdfWn0QHVYxVfcn47_4-QJ2BjC2bQ7U0wR-BI",
        },
        body: JSON.stringify(body),
      }
    );

    if (response.ok) {
      const result: ILogin = await response.json();

      return result;
    }

    return Promise.reject(response);
  } catch (error) {
    throw Error("Failed to post login");
  }
}

export async function getRequestToken() {
  "use server";

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/authentication/token/new",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTY3ZDAyNWNhMGI3NzE2NTcwOTg0MTcwOTY5ZTg4ZiIsInN1YiI6IjYyY2UzMDFjNGRjMzRhMDA0ZTM5NDMyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GFxoj8wdfWn0QHVYxVfcn47_4-QJ2BjC2bQ7U0wR-BI",
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      const { request_token } = result;

      return request_token;
    }

    return Promise.reject(response);
  } catch (error) {
    throw Error("Failed to get request token");
  }
}

export async function createSessionID(request_token: string) {
  "use server";

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/authentication/session/new",
      {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTY3ZDAyNWNhMGI3NzE2NTcwOTg0MTcwOTY5ZTg4ZiIsInN1YiI6IjYyY2UzMDFjNGRjMzRhMDA0ZTM5NDMyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GFxoj8wdfWn0QHVYxVfcn47_4-QJ2BjC2bQ7U0wR-BI",
        },
        body: JSON.stringify({ request_token }),
      }
    );

    if (response.ok) {
      const result = await response.json();
      const { session_id } = result as ISession;

      return session_id;
    }

    return Promise.reject(response);
  } catch (error) {
    throw Error("Failed to get session id");
  }
}

export async function getDetailAccount(session_id: string) {
  "use server";

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/account?session_id=${session_id}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyYTY3ZDAyNWNhMGI3NzE2NTcwOTg0MTcwOTY5ZTg4ZiIsInN1YiI6IjYyY2UzMDFjNGRjMzRhMDA0ZTM5NDMyMCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.GFxoj8wdfWn0QHVYxVfcn47_4-QJ2BjC2bQ7U0wR-BI",
        },
      }
    );

    if (response.ok) {
      const result = await response.json();
      const { id } = result as IDetailAccount;

      return id;
    }

    return Promise.reject(response);
  } catch (error) {
    throw Error("Failed to get detail account");
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
