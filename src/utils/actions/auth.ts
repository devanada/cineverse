"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

import {
  createSessionID,
  getDetailAccount,
  getRequestToken,
  postLogin,
} from "@/utils/apis/auth";

export async function onSubmitLogin(prevState: any, formData: FormData) {
  try {
    const { request_token } = await getRequestToken();
    const rawFormData = {
      username: formData.get("username"),
      password: formData.get("password"),
      request_token: request_token,
    };

    const result = await postLogin(rawFormData);
    const getSessionID = await createSessionID(result.request_token);
    const getUserID = await getDetailAccount(getSessionID);

    cookies().set("userID", String(getUserID), { secure: true });
    cookies().set("sessionID", getSessionID, { secure: true });
  } catch (error) {
    return { message: (error as Error).message };
  }

  revalidatePath("/");
  redirect("/");
}
