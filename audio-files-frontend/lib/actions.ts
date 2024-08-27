"use server";

import axios from "axios";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

axios.defaults.baseURL = "http://localhost:3000";

export async function login(username: string, password: string) {
  try {
    const response = await axios.post(
      "/auth/login",
      {
        username,
        password,
      },
      {
        withCredentials: true,
      }
    );
    const setCookieHeader = response.headers["set-cookie"];
    console.log(setCookieHeader);
    if (setCookieHeader) {
      setCookieHeader.forEach((cookieString: string) => {
        const [cookieName, ...cookieValue] = cookieString.split("=");
        console.log(cookieValue.join("="));
        cookies().set(cookieName, cookieValue.join("="));
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export async function logout() {
  const cookie = `connect.sid=${cookies().get("connect.sid")?.value}`;
  try {
    await axios.post(
      "/auth/logout",
      {},
      {
        headers: {
          Cookie: cookie,
        },
      }
    );
  } catch (error) {
    // console.error(error);
    console.log("Failed to logout");
  }
}

export async function getCurrentUser() {
  const cookie = `connect.sid=${cookies().get("connect.sid")?.value}`;
  try {
    const response = await axios.get("/auth/status", {
      headers: {
        Cookie: cookie,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error(error);
    console.log("Failed to retrieve current user");
    return null;
  }
}

export async function getAllUsers(): Promise<User[] | null> {
  const cookie = `connect.sid=${cookies().get("connect.sid")?.value}`;
  try {
    const response = await axios.get("/users", {
      headers: {
        Cookie: cookie,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error(error);
    console.log("Failed to retrieve users");
    return null;
  }
}

export async function deleteUser(userId: string) {
  const cookie = `connect.sid=${cookies().get("connect.sid")?.value}`;
  try {
    await axios.delete(`/users/${userId}`, {
      headers: {
        Cookie: cookie,
      },
    });
    revalidatePath("/");
  } catch (error) {
    // console.error(error);
    console.log("Failed to delete user");
  }
}

export async function getUserAudio() {
  const cookie = `connect.sid=${cookies().get("connect.sid")?.value}`;
  try {
    const response = await axios.get("/audio", {
      headers: {
        Cookie: cookie,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error(error);
    console.log("Failed to get user audio");
    return null;
  }
}
