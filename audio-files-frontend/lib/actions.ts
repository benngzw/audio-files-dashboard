"use server";

import axios from "axios";
import { cookies } from "next/headers";

export async function login(username: string, password: string) {
  try {
    const response = await axios.post(
      "http://localhost:3000/auth/login",
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
      "http://localhost:3000/auth/logout",
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
    const response = await axios.get("http://localhost:3000/auth/status", {
      headers: {
        Cookie: cookie,
      },
    });
    // console.log(response.data);
    return response.data;
  } catch (error) {
    // console.error(error);
    console.log("Failed to get current user");
    return null;
  }
}

export async function getUserAudio() {
  const cookie = `connect.sid=${cookies().get("connect.sid")?.value}`;
  try {
    const response = await axios.get("http://localhost:3000/audio", {
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
