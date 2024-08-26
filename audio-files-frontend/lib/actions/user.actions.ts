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
    const backendCookie = response.headers["set-cookie"];
    console.log(`backendCookie: ${backendCookie}`);
    // if (backendCookie && backendCookie.length > 0) {
    //   const [cookieNameValue, ...cookieAttributes] =
    //     backendCookie[0].split("; ");
    //   const [cookieName, cookieValue] = cookieNameValue.split("=");
    // }
    // console.log(response.data);

    const setCookieHeader = response.headers["set-cookie"];
    console.log(setCookieHeader);

    let cookiesString = "";

    if (setCookieHeader) {
      cookiesString = setCookieHeader
        .map((cookie: string) => cookie.split(";")[0])
        .join("; ");
      setCookieHeader.forEach((cookieString: string) => {
        const [cookieNameValue, ...cookieAttributes] = cookieString.split("; ");
        const [cookieName, cookieValue] = cookieNameValue.split("=");
        cookies().set("connect.sid", cookieValue, {
          path: "/",
          ...Object.fromEntries(
            cookieAttributes.map((attr) => attr.split("="))
          ),
        });
      });
    }

    console.log(`cookiesString: ${cookiesString}`);
    // console.log(`cookiesString: ${cookiesString}`);

    // Use the cookies in another Axios call
    // const anotherResponse = await axios.get(
    //   "http://localhost:3000/auth/status",
    //   {
    //     withCredentials: true,
    //     headers: {
    //       Cookie: cookiesString,
    //     },
    //   }
    // );
  } catch (error) {
    console.error(error);
  }
}

export async function getCurrentUser() {
  console.log("getCurrentUser");
  const backendCookie = `connect.sid=${cookies().get("connect.sid")?.value}`;
  console.log(`backendCookie: ${backendCookie}; `);
  console.log(cookies().getAll());

  try {
    const anotherResponse = await axios.get(
      "http://localhost:3000/auth/status",
      {
        withCredentials: true,
        headers: {
          Cookie: backendCookie,
        },
      }
    );
    console.log(anotherResponse.data);
    return anotherResponse.data;
  } catch (error) {
    console.error(error);
    return null;
  }
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
