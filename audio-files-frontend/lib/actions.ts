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
    if (setCookieHeader) {
      setCookieHeader.forEach((cookieString: string) => {
        const [cookieNameValue, ...cookieAttributes] = cookieString.split("; ");
        const [cookieName, cookieValue] = cookieNameValue.split("=");
        cookies().set(cookieName, cookieValue, {
          path: "/",
          ...Object.fromEntries(
            cookieAttributes.map((attr) => attr.split("="))
          ),
        });
      });
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getCurrentUser() {
  const backendCookie = `connect.sid=${cookies().get("connect.sid")?.value}`;
  try {
    const response = await axios.get("http://localhost:3000/auth/status", {
      withCredentials: true,
      headers: {
        Cookie: backendCookie,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function getUserAudio() {
  const backendCookie = `connect.sid=${cookies().get("connect.sid")?.value}`;
  try {
    const response = await axios.get("http://localhost:3000/audio", {
      withCredentials: true,
      headers: {
        Cookie: backendCookie,
      },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
