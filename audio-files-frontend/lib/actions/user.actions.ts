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
    console.log(response.data);
    console.log(response.headers["set-cookie"]);

    const setCookieHeader = response.headers["set-cookie"];
    let cookiesString = "";

    if (setCookieHeader) {
      cookiesString = setCookieHeader
        .map((cookie: string) => cookie.split(";")[0])
        .join("; ");
      setCookieHeader.forEach((cookieString: string) => {
        const [cookieNameValue, ...cookieAttributes] = cookieString.split("; ");
        const [cookieName, cookieValue] = cookieNameValue.split("=");
        cookies().set("backend.connect.sid", cookieValue, {
          path: "/",
          ...Object.fromEntries(
            cookieAttributes.map((attr) => attr.split("="))
          ),
        });
      });
    }
    console.log(setCookieHeader);

    // Use the cookies in another Axios call
    const anotherResponse = await axios.get(
      "http://localhost:3000/auth/status",
      {
        withCredentials: true,
        headers: {
          Cookie: cookiesString,
        },
      }
    );
    console.log(`Login cookiesString: ${cookiesString}`);
    console.log(anotherResponse.data);
  } catch (error) {
    console.error(error);
  }
}

export async function getCurrentUser() {
  const backendCookie = `connect.sid=${
    cookies().get("backend.connect.sid")?.value
  }`;
  console.log(`backendCookie: ${backendCookie}; `);

  const anotherResponse = await axios.get("http://localhost:3000/auth/status", {
    withCredentials: true,
    headers: {
      Cookie: backendCookie,
    },
  });
  console.log(anotherResponse.data);
}

export async function getLoggedInUser() {
  try {
    const response = await axios.get("http://localhost:3000/auth/status", {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    return null;
  }
}
